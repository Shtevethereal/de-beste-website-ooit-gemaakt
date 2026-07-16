import type { LanguageSettings, SoundMood } from '../lib/languageTypes'
import { familyGrammar, forbiddenInitials, restrictedFinals, soundSets } from '../lib/languageData'
import { CasePicker } from './CasePicker'
import { GrammarChoices, type GrammarKey } from './GrammarChoices'
import { PhonologyPicker } from './PhonologyPicker'
import { PhonotacticsPicker } from './PhonotacticsPicker'
import { RegularitySlider } from './RegularitySlider'
import { VocabularyInspirationPicker } from './VocabularyInspirationPicker'

export type BuilderStep = 'inspiration' | 'sounds' | 'sound-rules' | 'grammar' | 'review'
export const builderSteps: BuilderStep[] = ['inspiration', 'sounds', 'sound-rules', 'grammar', 'review']
const stepNames: Record<BuilderStep, string> = { inspiration: 'Inspiration', sounds: 'Sounds', 'sound-rules': 'Sound rules', grammar: 'Grammar', review: 'Review' }
const families: SoundMood[] = ['None', 'Germanic', 'Austronesian', 'Semitic', 'Turkic', 'Slavic', 'Japonic', 'Romance', 'Indic', 'Koreanic', 'Xoo', 'Niger-Congo', 'Uralic', 'Athabaskan']
const soundRuleKeys: GrammarKey[] = ['syllable', 'clusterPattern', 'vowelSequences', 'vowelHarmony']
const grammarKeys: GrammarKey[] = ['morphology', 'wordOrder', 'genderSystem', 'articleSystem', 'conjugationSystem']

interface Props { settings: LanguageSettings; step: BuilderStep; onStep: (step: BuilderStep) => void; onChange: (settings: LanguageSettings) => void; onGenerate: () => void }

export function LanguageForm({ settings, step, onStep, onChange, onGenerate }: Props) {
  const index = builderSteps.indexOf(step)
  const isReady = settings.vowels.length >= 1 && settings.consonants.length >= 3 && settings.allowedInitials.length >= 1
    && (!settings.syllable.endsWith('C') || settings.allowedFinals.length >= 1)
    && Boolean(settings.morphology && settings.syllable && settings.wordOrder && settings.genderSystem && settings.articleSystem && settings.clusterPattern && settings.vowelSequences && settings.vowelHarmony)

  const selectFamily = (mood: SoundMood) => {
    if (mood === 'None') return onChange({ ...settings, mood })
    const sounds = soundSets[mood]
    onChange({ ...settings, mood, ...sounds, ...familyGrammar[mood],
      allowedInitials: sounds.consonants.filter((sound) => !forbiddenInitials[mood].includes(sound)),
      allowedFinals: restrictedFinals[mood] ?? sounds.consonants })
  }

  return <section className="builder-card wizard-card">
    <nav className="wizard-progress" aria-label="Builder steps">{builderSteps.map((item, itemIndex) => <button className={item === step ? 'active' : itemIndex < index ? 'complete' : ''} key={item} type="button" onClick={() => onStep(item)}><span>{itemIndex + 1}</span>{stepNames[item]}</button>)}</nav>
    <div className="slide-heading"><p className="eyebrow">Step {index + 1} of {builderSteps.length}</p><h2>{stepNames[step]}</h2></div>

    {step === 'inspiration' && <><fieldset className="family-first"><legend>Language-family inspiration</legend><p className="field-help">Sets a coordinated starting point for sounds and grammar.</p><div className="choice-grid">{families.map((family) => <button className={settings.mood === family ? 'choice active' : 'choice'} key={family} type="button" onClick={() => selectFamily(family)}>{family === 'Xoo' ? 'ǃXóõ' : family}</button>)}</div></fieldset><VocabularyInspirationPicker selected={settings.vocabularyInspirations} onChange={(vocabularyInspirations) => onChange({ ...settings, vocabularyInspirations })} /></>}
    {step === 'sounds' && <PhonologyPicker consonants={settings.consonants} selectedVowels={settings.vowels} onConsonants={(consonants) => onChange({ ...settings, mood: 'None', consonants, allowedInitials: consonants, allowedFinals: consonants })} onVowels={(vowels) => onChange({ ...settings, mood: 'None', vowels })} />}
    {step === 'sound-rules' && <>{settings.consonants.length > 0 && <PhonotacticsPicker consonants={settings.consonants} initials={settings.allowedInitials} finals={settings.allowedFinals} onInitials={(allowedInitials) => onChange({ ...settings, mood: 'None', allowedInitials })} onFinals={(allowedFinals) => onChange({ ...settings, mood: 'None', allowedFinals })} />}<GrammarChoices keys={soundRuleKeys} settings={settings} onChange={onChange} /></>}
    {step === 'grammar' && <><GrammarChoices keys={grammarKeys} settings={settings} onChange={onChange} /><CasePicker selected={settings.cases} onChange={(cases) => onChange({ ...settings, mood: 'None', cases })} /><RegularitySlider value={settings.regularity} onChange={(regularity) => onChange({ ...settings, mood: 'None', regularity })} /></>}
    {step === 'review' && <div className="review-slide"><h3>Ready to meet your language?</h3><p>All choices remain editable from the overview page.</p>{!isReady && <p className="requirements">Complete the missing sound and grammar choices before generating.</p>}<button className="generate-button" type="button" onClick={onGenerate} disabled={!isReady}>Generate my language <span>→</span></button></div>}

    <div className="wizard-actions"><button type="button" disabled={index === 0} onClick={() => onStep(builderSteps[index - 1])}>← Back</button>{index < builderSteps.length - 1 && <button className="next-button" type="button" onClick={() => onStep(builderSteps[index + 1])}>Continue →</button>}</div>
  </section>
}
