import { useState } from 'react'
import { LanguageForm, type BuilderStep } from './components/LanguageForm'
import { LanguageResult } from './components/LanguageResult'
import { defaultSettings, generateLanguage } from './lib/languageGenerator'
import type { LanguageSettings } from './lib/languageTypes'
import { AccountMenu } from './components/AccountMenu'
import { LanguageSelect } from './components/LanguageSelect'
import { UiTranslator } from './components/UiTranslator'
import type { UiLanguage } from './lib/i18n'
import { LinguisticsAssistant } from './components/LinguisticsAssistant'

export default function App() {
  const [settings, setSettings] = useState<LanguageSettings>(defaultSettings)
  const [language, setLanguage] = useState<ReturnType<typeof generateLanguage> | null>(null)
  const [page, setPage] = useState<'builder' | 'overview'>('builder')
  const [step, setStep] = useState<BuilderStep>('inspiration')
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>('en')

  const generate = () => {
    const validFinals = !settings.syllable.endsWith('C') || settings.allowedFinals.length >= 1
    if (settings.vowels.length >= 1 && settings.consonants.length >= 3 && settings.allowedInitials.length >= 1 && validFinals && settings.morphology && settings.syllable && settings.wordOrder && settings.genderSystem && settings.articleSystem && settings.clusterPattern && settings.vowelSequences && settings.vowelHarmony) {
      setLanguage(generateLanguage(settings))
      setPage('overview')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const loadLanguage = (saved: ReturnType<typeof generateLanguage>) => {
    const conjugationSystem = saved.settings.conjugationSystem ?? 'Tense + person'
    const normalized = { ...saved, settings: { ...saved.settings, conjugationSystem } }
    setSettings(normalized.settings)
    setLanguage(normalized)
    setPage('overview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const edit = (nextStep: BuilderStep) => {
    setStep(nextStep)
    setPage('builder')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeStep = (nextStep: BuilderStep) => {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <UiTranslator language={uiLanguage} />
      <header className="site-header">
        <div className="brand-account"><a className="brand" href="#top" aria-label="Glossopoem home" onClick={() => setPage('builder')}><span className="brand-mark">G</span><span>Glossopoem</span></a><AccountMenu onLoad={loadLanguage} /></div>
        <div className="header-actions"><span className="header-note">A small language laboratory</span><LanguageSelect language={uiLanguage} onChange={setUiLanguage} /></div>
      </header>

      {page === 'builder' ? <><section className="hero" id="top">
        <p className="eyebrow">Constructed language generator</p>
        <h1>Give a new language<br /><em>its first words.</em></h1>
        <p className="hero-copy">
          Choose its sounds and grammar. We’ll build a vocabulary and let it speak
          Article 1 of the Universal Declaration of Human Rights for the first time.
        </p>
      </section>

      <div className="builder-workspace">
        <LanguageForm settings={settings} step={step} onStep={changeStep} onChange={setSettings} onGenerate={generate} />
      </div></> : <div className="overview-page" id="top">
        <LanguageResult language={language} onRegenerate={generate} onLoad={loadLanguage} onEdit={edit} />
      </div>}

      <footer>Made for curious linguists · Every generation is unique</footer>
      <LinguisticsAssistant language={uiLanguage} />
    </main>
  )
}
