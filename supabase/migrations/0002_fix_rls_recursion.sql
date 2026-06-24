-- Fixes "infinite recursion detected in policy for relation courses".
-- The courses SELECT policy checked collaborators, and the collaborators
-- policy checked back into courses, so Postgres recursed evaluating RLS.
-- SECURITY DEFINER helper functions break the cycle: they run with the
-- function owner's privileges, which bypasses RLS on the table they query.

create or replace function public.is_course_owner(p_course_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from courses co where co.id = p_course_id and co.created_by = auth.uid()
  );
$$;

create or replace function public.is_active_collaborator(p_course_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from collaborators c
    where c.course_id = p_course_id and c.invitee_id = auth.uid() and c.status = 'active'
  );
$$;

drop policy if exists "Courses readable by owner or collaborator" on courses;
create policy "Courses readable by owner or collaborator" on courses
  for select using (
    auth.uid() = created_by or public.is_active_collaborator(courses.id)
  );

drop policy if exists "Modules follow course access" on modules;
create policy "Modules follow course access" on modules
  for select using (
    public.is_course_owner(modules.course_id) or public.is_active_collaborator(modules.course_id)
  );

drop policy if exists "Modules writable by course owner" on modules;
create policy "Modules writable by course owner" on modules
  for all using (public.is_course_owner(modules.course_id))
  with check (public.is_course_owner(modules.course_id));

drop policy if exists "Lessons follow module/course access" on lessons;
create policy "Lessons follow module/course access" on lessons
  for select using (
    exists (
      select 1 from modules m
      where m.id = lessons.module_id
        and (public.is_course_owner(m.course_id) or public.is_active_collaborator(m.course_id))
    )
  );

drop policy if exists "Lessons writable by course owner" on lessons;
create policy "Lessons writable by course owner" on lessons
  for all using (
    exists (select 1 from modules m where m.id = lessons.module_id and public.is_course_owner(m.course_id))
  ) with check (
    exists (select 1 from modules m where m.id = lessons.module_id and public.is_course_owner(m.course_id))
  );

drop policy if exists "Collaborators readable by course owner or self" on collaborators;
create policy "Collaborators readable by course owner or self" on collaborators
  for select using (
    invitee_id = auth.uid() or public.is_course_owner(collaborators.course_id)
  );

drop policy if exists "Collaborators writable by course owner" on collaborators;
create policy "Collaborators writable by course owner" on collaborators
  for all using (public.is_course_owner(collaborators.course_id))
  with check (public.is_course_owner(collaborators.course_id));
