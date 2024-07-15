import { createClient } from '@supabase/supabase-js';

const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
const apiKey = process.env.NEXT_PUBLIC_API_Key;

if (!projectUrl || !apiKey) {
  throw new Error('Missing environment variables');
}

// Create a single supabase client for interacting with your database
const supabase = createClient(projectUrl, apiKey);

export default supabase;
