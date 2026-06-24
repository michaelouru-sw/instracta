-- Instracta core schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) after
-- creating a project. Pairs with src/lib/supabase.js.

create extension if not exists "uuid-ossp";

-- Profiles mirror auth.users with app-specific fields
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'user' check (role in ('user', 'admin')),
  persona text,
  use_case text,
  onboarded boolean default false,
  subscription text default 'free' check (subscription in ('free', 'pro', 'enterprise')),
  subscription_expires timestamptz,
  stripe_customer_id text,
  ai_provider text default 'default' check (ai_provider in ('default', 'openai', 'anthropic', 'gemini')),
  ai_api_key text,
  created_at timestamptz default now()
);

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  topic text,
  audience text,
  difficulty text default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer,
  status text default 'draft' check (status in ('draft', 'outline_ready', 'in_progress', 'published')),
  objectives jsonb default '[]'::jsonb,
  theme jsonb default '{}'::jsonb,
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  position integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references modules(id) on delete cascade not null,
  title text not null,
  type text default 'standard' check (type in ('standard', 'quiz', 'assignment', 'video', 'interactive')),
  position integer not null default 0,
  blocks jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists collaborators (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade not null,
  invitee_email text not null,
  invitee_id uuid references profiles(id) on delete set null,
  role text default 'viewer' check (role in ('editor', 'reviewer', 'viewer')),
  status text default 'pending' check (status in ('pending', 'active', 'removed')),
  created_at timestamptz default now()
);

create table if not exists export_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  course_id uuid references courses(id) on delete cascade not null,
  format text not null check (format in ('html', 'scorm')),
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table collaborators enable row level security;
alter table export_logs enable row level security;

create policy "Profiles are self-readable" on profiles
  for select using (auth.uid() = id);
create policy "Profiles are self-updatable" on profiles
  for update using (auth.uid() = id);
create policy "Profiles insertable by owner" on profiles
  for insert with check (auth.uid() = id);

create policy "Courses readable by owner or collaborator" on courses
  for select using (
    auth.uid() = created_by
    or exists (
      select 1 from collaborators c
      where c.course_id = courses.id and c.invitee_id = auth.uid() and c.status = 'active'
    )
  );
create policy "Courses writable by owner" on courses
  for all using (auth.uid() = created_by) with check (auth.uid() = created_by);

create policy "Modules follow course access" on modules
  for select using (
    exists (select 1 from courses co where co.id = modules.course_id and (
      co.created_by = auth.uid() or exists (
        select 1 from collaborators c where c.course_id = co.id and c.invitee_id = auth.uid() and c.status = 'active'
      )
    ))
  );
create policy "Modules writable by course owner" on modules
  for all using (
    exists (select 1 from courses co where co.id = modules.course_id and co.created_by = auth.uid())
  ) with check (
    exists (select 1 from courses co where co.id = modules.course_id and co.created_by = auth.uid())
  );

create policy "Lessons follow module/course access" on lessons
  for select using (
    exists (
      select 1 from modules m join courses co on co.id = m.course_id
      where m.id = lessons.module_id and (
        co.created_by = auth.uid() or exists (
          select 1 from collaborators c where c.course_id = co.id and c.invitee_id = auth.uid() and c.status = 'active'
        )
      )
    )
  );
create policy "Lessons writable by course owner" on lessons
  for all using (
    exists (
      select 1 from modules m join courses co on co.id = m.course_id
      where m.id = lessons.module_id and co.created_by = auth.uid()
    )
  ) with check (
    exists (
      select 1 from modules m join courses co on co.id = m.course_id
      where m.id = lessons.module_id and co.created_by = auth.uid()
    )
  );

create policy "Collaborators readable by course owner or self" on collaborators
  for select using (
    invitee_id = auth.uid()
    or exists (select 1 from courses co where co.id = collaborators.course_id and co.created_by = auth.uid())
  );
create policy "Collaborators writable by course owner" on collaborators
  for all using (
    exists (select 1 from courses co where co.id = collaborators.course_id and co.created_by = auth.uid())
  ) with check (
    exists (select 1 from courses co where co.id = collaborators.course_id and co.created_by = auth.uid())
  );

create policy "Export logs readable by owner" on export_logs
  for select using (auth.uid() = user_id);
create policy "Export logs insertable by owner" on export_logs
  for insert with check (auth.uid() = user_id);

-- Keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger courses_set_updated_at before update on courses
  for each row execute function set_updated_at();
create trigger lessons_set_updated_at before update on lessons
  for each row execute function set_updated_at();

-- Auto-create a profile row when a user signs up
create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
