import { useMemo, useState } from 'react'
import type { GeneratedLanguage } from '../lib/languageTypes'
import { translateText } from '../lib/translator'

interface Props { language: GeneratedLanguage }

export function LanguageTools({ language }: Props) {
  const [query, setQuery] = useState('')
  const [source, setSource] = useState('We live in a beautiful world.')
  const [reverse, setReverse] = useState(false)
  const matches = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    if (!search) return language.dictionary.slice(0, 60)
    return language.dictionary.filter((entry) => entry.english.includes(search) || entry.native.toLocaleLowerCase().includes(search)).slice(0, 60)
  }, [language, query])

  return (
    <div className="language-tools">
      <section className="translator-box">
        <div className="subheading"><span>05</span><h3>Basic translator</h3></div>
        <div className="translation-direction">
          <b>{reverse ? language.name : 'English'}</b>
          <button type="button" onClick={() => setReverse(!reverse)} aria-label="Reverse translation">⇄</button>
          <b>{reverse ? 'English' : language.name}</b>
        </div>
        <textarea value={source} onChange={(event) => setSource(event.target.value)} placeholder="Type a sentence…" />
        <div className="translated-output">{translateText(source, language, reverse) || 'Translation appears here.'}</div>
        <small>This word-for-word translator preserves punctuation. Unknown words stay unchanged.</small>
      </section>

      <section className="dictionary-box">
        <div className="subheading"><span>06</span><h3>Dictionary</h3></div>
        <p className="dictionary-count">{language.dictionary.length} everyday words and forms</p>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search English or generated words…" />
        <div className="dictionary-list">
          {matches.map((entry) => <div className="dictionary-entry" key={`${entry.english}-${entry.native}`}><span><b>{entry.english}</b><small>{entry.category}{entry.gender ? ` · class ${entry.gender}` : ''}</small></span><strong>{entry.native}</strong></div>)}
        </div>
        {matches.length === 0 && <p className="no-results">No matching word yet.</p>}
      </section>
    </div>
  )
}
