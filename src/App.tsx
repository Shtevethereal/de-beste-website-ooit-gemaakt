import { useState } from 'react'
import { LanguageForm } from './components/LanguageForm'
import { LanguageResult } from './components/LanguageResult'
import { defaultSettings, generateLanguage } from './lib/languageGenerator'
import type { LanguageSettings } from './lib/languageTypes'

export default function App() {
  const [settings, setSettings] = useState<LanguageSettings>(defaultSettings)
  const [language, setLanguage] = useState<ReturnType<typeof generateLanguage> | null>(null)

  const generate = () => {
    const validFinals = !settings.syllable.endsWith('C') || settings.allowedFinals.length >= 1
    if (settings.vowels.length >= 1 && settings.consonants.length >= 3 && settings.allowedInitials.length >= 1 && validFinals && settings.morphology && settings.syllable && settings.wordOrder && settings.genderSystem && settings.articleSystem && settings.clusterPattern && settings.vowelSequences && settings.vowelHarmony) {
      setLanguage(generateLanguage(settings))
    }
  }

  const loadLanguage = (saved: ReturnType<typeof generateLanguage>) => {
    setSettings(saved.settings)
    setLanguage(saved)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Glossopoem home">
          <span className="brand-mark">G</span>
          <span>Glossopoem</span>
        </a>
        <span className="header-note">A small language laboratory</span>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Constructed language generator</p>
        <h1>Give a new language<br /><em>its first words.</em></h1>
        <p className="hero-copy">
          Choose its sounds and grammar. We’ll build a vocabulary and let it speak
          Lincoln’s Gettysburg Address for the first time.
        </p>
      </section>

      <div className="workspace">
        <LanguageForm settings={settings} onChange={setSettings} onGenerate={generate} />
        <LanguageResult language={language} onRegenerate={generate} onLoad={loadLanguage} />
      </div>

      <footer>Made for curious linguists · Every generation is unique</footer>
    </main>
  )
}
