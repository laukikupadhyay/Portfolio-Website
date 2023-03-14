import { createClient } from "@supabase/supabase-js";

const url = "https://soqmlrodsqlvbpmdhesr.supabase.co";
const public_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvcW1scm9kc3FsdmJwbWRoZXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3NjgxNjksImV4cCI6MTk5NDM0NDE2OX0.ZfSNEZ_hsbtdl_UPCpjV7Vjnut-kTgV9hhOLVaWGPX4";

const supabase = createClient(url, public_key);

export default supabase;
