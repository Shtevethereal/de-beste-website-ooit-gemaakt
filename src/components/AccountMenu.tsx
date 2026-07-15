import { useCallback, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { GeneratedLanguage } from '../lib/languageTypes'
import { listSavedLanguages, type SavedLanguage } from '../lib/savedLanguages'
import { supabase } from '../lib/supabase'
import { Auth } from './Auth'

interface Props { onLoad: (language: GeneratedLanguage) => void }

export function AccountMenu({ onLoad }: Props) {
  const [session, setSession] = useState<Session | null>(null)
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState<SavedLanguage[]>([])
  const [message, setMessage] = useState('')

  const refresh = useCallback(async () => {
    try { setSaved(await listSavedLanguages()); setMessage('') }
    catch { setMessage('Could not load saved languages.') }
  }, [])

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => { if (session) void refresh(); else setSaved([]) }, [session, refresh])
  useEffect(() => {
    const update = () => { if (session) void refresh() }
    window.addEventListener('saved-languages-changed', update)
    return () => window.removeEventListener('saved-languages-changed', update)
  }, [session, refresh])

  return <div className="account-menu">
    <button className="account-trigger" type="button" onClick={() => setOpen(!open)}>
      {session ? `Saved languages (${saved.length})` : 'Log in or sign up'}
    </button>
    {open && <div className="account-popover">
      {!session ? <Auth /> : <>
        <p className="account-email">Signed in as <b>{session.user.email}</b></p>
        <div className="header-saves">{saved.map((item) => <button key={item.id} type="button" onClick={() => { onLoad(item.language); setOpen(false) }}><b>{item.name}</b><small>{new Date(item.updated_at).toLocaleDateString()}</small></button>)}{saved.length === 0 && <p>No saved languages yet.</p>}</div>
        {message && <p className="auth-message">{message}</p>}
        <button className="text-button" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </>}
    </div>}
  </div>
}
