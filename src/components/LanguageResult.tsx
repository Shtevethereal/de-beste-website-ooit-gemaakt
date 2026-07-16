import type { GeneratedLanguage } from '../lib/languageTypes'
import { LanguageTools } from './LanguageTools'
import { SaveLoadPanel } from './SaveLoadPanel'
import type { BuilderStep } from './LanguageForm'
import { ConjugationTable } from './ConjugationTable'

interface Props { language: GeneratedLanguage | null; onRegenerate: () => void; onLoad: (language: GeneratedLanguage) => void; onEdit: (step: BuilderStep) => void }

export function LanguageResult({ language, onRegenerate, onLoad, onEdit }: Props) {
  if (!language) return <section className="result-card result-empty"><span>✦</span><h2>Your language will appear here</h2><p>Choose an inspiration, build its sound inventory, and set its grammar to begin.</p></section>

  return (
    <section className="result-card" aria-live="polite">
      <div className="result-title">
        <div>
          <p className="eyebrow">Your language is called</p>
          <h2>{language.name}</h2>
          <p className="native-name">{language.nativeName}</p>
        </div>
        <div className="overview-actions">
          <select aria-label="Modify language settings" defaultValue="" onChange={(event) => {
            if (event.target.value) onEdit(event.target.value as BuilderStep)
            event.target.value = ''
          }}>
            <option value="" disabled>Modify…</option>
            <option value="inspiration">Inspiration</option>
            <option value="sounds">Sounds</option>
            <option value="sound-rules">Sound rules</option>
            <option value="grammar">Grammar</option>
            <option value="review">Review all</option>
          </select>
          <button className="icon-button" onClick={onRegenerate} aria-label="Generate again">↻</button>
        </div>
      </div>

      <SaveLoadPanel language={language} onLoad={onLoad} />

      <div className="language-meta">
        <span>{language.settings.morphology}</span><span>{language.settings.wordOrder}</span>
        <span>{language.settings.syllable}</span><span>Latin · diacritics</span>
        <span>{language.settings.genderSystem === 'None' ? 'No gender' : language.settings.genderSystem}</span>
        <span>{language.settings.articleSystem === 'None' ? 'No articles' : `${language.settings.articleSystem} articles`}</span>
        <span>{(language.settings.conjugationSystem ?? 'Tense + person') === 'None' ? 'No conjugation' : 'Tense + person conjugation'}</span>
        <span>{language.settings.cases.length === 0 ? 'No cases' : `${language.settings.cases.length} cases`}</span>
        <span>{language.settings.regularity}% regular</span>
        <span>{language.settings.clusterPattern}</span>
        <span>{language.settings.vowelSequences}</span>
        <span>{language.settings.vocabularyInspirations.length === 0 ? 'Original vocabulary' : `${language.settings.vocabularyInspirations.join(' + ')} roots`}</span>
        <span>{language.settings.vowelHarmony === 'None' ? 'No vowel harmony' : language.settings.vowelHarmony}</span>
      </div>

      <div className="sound-inventory">
        <div><h3>Consonants</h3><p>{language.consonants.join(' · ')}</p></div>
        <div><h3>Vowels</h3><p>{language.vowels.join(' · ')}</p></div>
      </div>
      <p className="phonotactic-summary"><b>Word edges:</b> starts with {language.settings.allowedInitials.join(', ')} · ends with {language.settings.allowedFinals.join(', ') || 'vowels only'}</p>

      <ConjugationTable language={language} />

      <div className="vocabulary">
        <div className="subheading"><span>03</span><h3>A working vocabulary</h3></div>
        <div className="word-list">
          {language.vocabulary.map((word) => (
            <div className="word" key={word.english}>
              <strong>{word.native}</strong><span><i>{word.category}</i>{word.english}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="address">
        <div className="subheading"><span>04</span><h3>Universal Declaration of Human Rights</h3></div>
        <p className="translation">{language.translation}</p>
        <p className="translation-note">Article 1 · All human beings are born free and equal in dignity and rights</p>
      </div>
      <LanguageTools language={language} />
    </section>
  )
}
