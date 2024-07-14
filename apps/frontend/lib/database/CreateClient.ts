import { createClient } from '@supabase/supabase-js';

const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL || '';
const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

if (!projectUrl || !apiKey) {
  throw new Error('Supabase project URL and API key must be provided');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(projectUrl, apiKey);
