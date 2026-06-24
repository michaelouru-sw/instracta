import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

if (!supabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Instracta] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Auth and data persistence are disabled until you create a Supabase " +
      "project and add a .env file (see .env.example)."
  );
}

export const supabase = supabaseConfigured
  ? createClient(url, anonKey)
  : null;
