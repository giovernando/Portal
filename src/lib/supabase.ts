import { createClient } from "@supabase/supabase-js";

// Make sure to add ini ke file .env.local Anda
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL") {
  throw new Error("VITE_SUPABASE_URL is missing. Please check your .env.local file.");
}

if (!supabaseAnonKey || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  throw new Error("VITE_SUPABASE_ANON_KEY is missing. Please check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
