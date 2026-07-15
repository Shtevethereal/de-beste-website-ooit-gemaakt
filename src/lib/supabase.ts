import { createClient } from '@supabase/supabase-js';

// Ключи берутся из .env.local (локально) и из Vercel → Settings → Environment Variables (на проде).
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Понятная ошибка вместо «белого экрана», если ключи забыли вставить.
if (!url || !anonKey) {
  throw new Error(
    'Нет ключей Supabase. Скопируй .env.example → .env.local и вставь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.',
  );
}

export const supabase = createClient(url, anonKey);

export function getGoogleOAuthUrl(redirectTo: string) {
  const oauthUrl = new URL('/auth/v1/authorize', url as string)
  oauthUrl.searchParams.set('provider', 'google')
  oauthUrl.searchParams.set('redirect_to', redirectTo)
  oauthUrl.searchParams.set('apikey', anonKey as string)
  return oauthUrl.toString()
}
