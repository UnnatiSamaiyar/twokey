import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dxqrkmzagreeiyncplzx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cXJrbXphZ3JlZWl5bmNwbHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NTA1NjYsImV4cCI6MjAxMzAyNjU2Nn0.bm1vIQirid87ckoCNcJDkyBT_D2ZchdTnr-OSrdIfQA";
export const supabase = createClient(supabaseUrl, supabaseKey);
