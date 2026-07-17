import { FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import { askLinguisticsAssistant, type AssistantMode, type LinguisticsMessage } from '../lib/linguisticsAssistant'
import { MarkdownText } from './MarkdownText'
import { assistantCopy } from '../lib/assistantCopy'
import type { UiLanguage } from '../lib/i18n'

export function LinguisticsAssistant({ language }: { language: UiLanguage }) {
  const copy = assistantCopy[language]
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<LinguisticsMessage[]>([{ role: 'assistant', text: assistantCopy.en.modes.friendly.greeting }])
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<AssistantMode>('friendly')

  useEffect(() => {
    setMessages([{ role: 'assistant', text: assistantCopy[language].modes[mode].greeting }])
    setQuestion('')
    setError('')
  }, [language, mode])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const text = question.trim()
    if (!text || isLoading) return

    const conversation = [...messages, { role: 'user' as const, text }]
    setMessages(conversation)
    setQuestion('')
    setError('')
    setIsLoading(true)

    try {
      const answer = await askLinguisticsAssistant(conversation, mode, language)
      setMessages((current) => [...current, { role: 'assistant', text: answer }])
    } catch {
      setError(copy.error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitWithEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  const changeMode = (nextMode: AssistantMode) => {
    if (nextMode === mode) return
    setMode(nextMode)
  }

  return <aside className="linguistics-assistant" aria-label="Linguistics assistant">
    {isOpen && <section className="assistant-panel">
      <header className="assistant-header">
        <div><strong>{copy.title}</strong><small>{copy.subtitle}</small></div>
        <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.close}>×</button>
      </header>
      <div className="assistant-modes" aria-label={copy.style}>
        {(['friendly', 'direct', 'summary', 'drLingua'] as AssistantMode[]).map((item) => <button className={mode === item ? 'active' : ''} type="button" onClick={() => changeMode(item)} key={item}>
          {copy.modes[item].name}<small>{copy.modes[item].note}</small>
        </button>)}
      </div>
      <div className="assistant-messages" aria-live="polite">
        {messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>
          {message.role === 'assistant' ? <MarkdownText text={message.text} /> : message.text}
        </div>)}
        {isLoading && <p className="assistant-message assistant thinking">{copy.thinking}</p>}
      </div>
      {error && <p className="assistant-error" role="alert">{error}</p>}
      <form className="assistant-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="linguistics-question">{copy.label}</label>
        <textarea id="linguistics-question" value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={submitWithEnter} placeholder={copy.placeholder} rows={2} />
        <button type="submit" disabled={!question.trim() || isLoading}>{copy.send}</button>
      </form>
    </section>}
    <button className="assistant-toggle" type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
      <span aria-hidden="true">✦</span> {copy.toggle}
    </button>
  </aside>
}
