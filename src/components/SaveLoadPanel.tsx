import { useCallback, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { GeneratedLanguage } from '../lib/languageTypes'
import { deleteSavedLanguage, listSavedLanguages, saveLanguage, type SavedLanguage } from '../lib/savedLanguages'
import { supabase } from '../lib/supabase'
import { Auth } from './Auth'

interface Props { language: GeneratedLanguage; onLoad: (language: GeneratedLanguage) => void }

export function SaveLoadPanel({ language, onLoad }: Props) {
  const [session, setSession] = useState<Session | null>(null)
  const [saved, setSaved] = useState<SavedLanguage[]>([])
  const [name, setName] = useState(language.name)
  const [message, setMessage] = useState('')

  const refresh = useCallback(async () => {
    try { setSaved(await listSavedLanguages()) }
    catch { setMessage('Could not load saved languages.') }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => { if (session) void refresh(); else setSaved([]) }, [session, refresh])
  useEffect(() => setName(language.name), [language])

  const save = async () => {
    try { await saveLanguage(name.trim() || language.name, language); setMessage('Language saved.'); await refresh() }
    catch { setMessage('Could not save this language.') }
  }

  const remove = async (id: string) => {
    try { await deleteSavedLanguage(id); await refresh() }
    catch { setMessage('Could not delete that save.') }
  }

  return (
    <section className="save-load-box">
      <div className="subheading"><span>06</span><h3>Save and load</h3></div>
      {!session ? <Auth /> : <>
        <div className="save-row">
          <input value={name} maxLength={80} onChange={(event) => setName(event.target.value)} aria-label="Saved language name" />
          <button type="button" onClick={save}>Save current</button>
        </div>
        {message && <small>{message}</small>}
        <div className="saved-list">
          {saved.map((item) => <div key={item.id}><button type="button" onClick={() => onLoad(item.language)}><b>{item.name}</b><small>{new Date(item.created_at).toLocaleDateString()}</small></button><button type="button" aria-label={`Delete ${item.name}`} onClick={() => remove(item.id)}>×</button></div>)}
          {saved.length === 0 && <p>No saved languages yet.</p>}
        </div>
        <button className="text-button" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </>}
    </section>
  )
}
