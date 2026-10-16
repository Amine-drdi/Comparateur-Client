import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL manquant dans .env.local');
}
if (!supabaseSecretKey) {
  throw new Error('SUPABASE_SECRET_KEY manquant dans .env.local');
}

/**
 * Client Supabase admin (bypass RLS).
 * ⚠️ À utiliser UNIQUEMENT côté serveur (API Routes, Server Actions, etc.)
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});