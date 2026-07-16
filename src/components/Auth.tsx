import { useState } from 'react'
import { signInWithGoogle, supabase } from '../lib/supabase'

type Mode = 'login' | 'signup'

export function Auth() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const submitEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    const { error } = mode === 'signup'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setMessage(error.message)
    else if (mode === 'signup') setMessage('Check your email to confirm your account, then log in.')
  }

  const continueWithGoogle = async () => {
    setBusy(true)
    setMessage('')
    const { error } = await signInWithGoogle(window.location.origin)
    if (error) {
      setMessage(error.message)
      setBusy(false)
    }
  }

  return (
    <div className="auth-panel">
      <div className="auth-tabs">
        <button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => setMode('login')}>Log in</button>
        <button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => setMode('signup')}>Sign up</button>
      </div>
      <button className="google-button" type="button" onClick={continueWithGoogle} disabled={busy}>
        <span aria-hidden="true">G</span> Continue with Google
      </button>
      <div className="auth-divider"><span>or use email</span></div>
      <form onSubmit={submitEmail}>
        <input type="email" autoComplete="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="Password (6+ characters)" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
        <button className="primary-button" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  )
}
