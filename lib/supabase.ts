import { createClient } from '@supabase/supabase-js';

// Server-side privileged client: Keeps answers protected inside Vercel API routes
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.com/dashboard/project/spvdvsrkqmognrqfphaf',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_lHAAnYBiWztQK5GUIMg6wA_Uo2f9E-o'
);