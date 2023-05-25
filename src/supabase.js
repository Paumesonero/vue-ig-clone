import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://suqeynrwubzivsrsaeyz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cWV5bnJ3dWJ6aXZzcnNhZXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NjQ1MDcsImV4cCI6MjAwMDM0MDUwN30.3R506fVoAqsSA2tJjGz1ykAI7KMWdD44PfeP56nGX9M'

export const supabase = createClient(supabaseUrl, supabaseKey)