import { createClient } from '@supabase/supabase-js';

// Ключи берутся из .env.local (локально) и из Vercel → Settings → Environment Variables (на проде).
const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Понятная ошибка вместо «белого экрана», если ключи забыли вставить.
if (!rawUrl || !anonKey) {
  throw new Error(
    'Нет ключей Supabase. Скопируй .env.example → .env.local и вставь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.',
  );
}

const url = new URL(rawUrl).origin;

export const supabase = createClient(url, anonKey);

export function signInWithGoogle(redirectTo: string) {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: { apikey: anonKey as string },
    },
  })
}
