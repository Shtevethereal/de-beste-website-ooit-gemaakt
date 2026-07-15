import type { LanguageSettings, SoundMood } from '../lib/languageTypes'
import { familyGrammar, forbiddenInitials, restrictedFinals, soundSets } from '../lib/languageData'
import { PhonologyPicker } from './PhonologyPicker'
import { PhonotacticsPicker } from './PhonotacticsPicker'
import { CasePicker } from './CasePicker'
import { RegularitySlider } from './RegularitySlider'
import { VocabularyInspirationPicker } from './VocabularyInspirationPicker'

interface Props {
  settings: LanguageSettings
  onChange: (settings: LanguageSettings) => void
  onGenerate: () => void
}

const options = {
  mood: ['None', 'Germanic', 'Austronesian', 'Semitic', 'Turkic', 'Slavic', 'Japonic', 'Romance', 'Indic'],
  morphology: ['Analytic', 'Agglutinative', 'Fusional', 'Polysynthetic', 'Isolating', 'Introflexive', 'Oligosynthetic'],
  syllable: ['CV', 'CVC', 'CVCC', 'CCV', 'CVV', 'CCVC'],
  wordOrder: ['SOV', 'SVO', 'VSO', 'VOS', 'OVS'],
  genderSystem: ['None', '2 genders', '3 genders', '4 genders', '5+ classes'],
  articleSystem: ['None', 'One', 'Gendered', 'One + plural', 'Gendered + plural'],
  clusterPattern: ['No clusters', 'Rising sonority', 'Falling sonority', 'Unrestricted'],
  vowelSequences: ['No sequences', 'Long vowels', 'Diphthongs', 'Hiatus', 'Harmony-bound'],
  vowelHarmony: ['None', 'Front / back', 'Front / back + neutral', 'Rounding', 'Front / back + rounding', 'Height', 'Advanced tongue root (ATR)'],
} as const

const labels = {
  mood: 'Language-family inspiration', morphology: 'Language type', syllable: 'Syllable structure',
  wordOrder: 'Word order', genderSystem: 'Grammatical gender / noun classes', articleSystem: 'Articles', clusterPattern: 'Consonant clusters', vowelSequences: 'Vowel sequences', vowelHarmony: 'Vowel harmony',
}

const morphologyHelp: Record<Exclude<LanguageSettings['morphology'], ''>, string> = {
  Analytic: 'Grammar mostly uses separate helper words.', Isolating: 'Words rarely change their form.',
  Agglutinative: 'Clear pieces stack onto a word, one meaning each.', Fusional: 'One ending can carry several meanings.',
  Polysynthetic: 'A whole sentence can fit inside one long word.', Introflexive: 'Grammar changes vowels inside a word.',
  Oligosynthetic: 'A tiny stock of roots combines into many ideas.',
}

const syllableHelp: Record<Exclude<LanguageSettings['syllable'], ''>, string> = {
  CV: 'Consonant + vowel, as in “me” or “go”. Simple and open.',
  CVC: 'Consonant + vowel + consonant, as in “cat”.',
  CVCC: 'One opening consonant and two at the end, as in “hand”.',
  CCV: 'Two opening consonants + vowel, as in “flee”.',
  CVV: 'Consonant + two vowels, creating a long vowel or diphthong, as in “day”.',
  CCVC: 'Two opening consonants, a vowel, and a final consonant, as in “stop”.',
}

const genderHelp = {
  None: 'Nouns do not belong to grammatical gender classes.',
  '2 genders': 'Every noun belongs to one of two agreement groups, often called masculine and feminine.',
  '3 genders': 'Three agreement groups, often masculine, feminine, and neuter.',
  '4 genders': 'Four noun groups; these may reflect meaning, shape, animacy, or arbitrary grammar.',
  '5+ classes': 'A larger noun-class system, which may group people, animals, objects, places, and more.',
} as const

const harmonyHelp = {
  None: 'Any selected vowels may appear together inside a word.',
  'Front / back': 'Each word chooses front vowels or back vowels and keeps them together.',
  'Front / back + neutral': 'Front and back vowels harmonize, while central vowels may appear in either group.',
  Rounding: 'Vowels in a word agree on whether the lips are rounded or unrounded.',
  'Front / back + rounding': 'Later vowels match both the tongue position and lip rounding of the first vowel.',
  Height: 'A word keeps its vowels in a similar high or low area of the mouth.',
  'Advanced tongue root (ATR)': 'Vowels agree in tongue-root position, creating tense and relaxed vowel groups.',
} as const

const articleHelp = {
  None: 'The language does not use articles.',
  One: 'One article is used for every noun.',
  Gendered: 'The article agrees with the noun\'s gender or class.',
  'One + plural': 'The language has separate singular and plural articles.',
  'Gendered + plural': 'Articles agree with both gender or class and number.',
} as const

const clusterHelp = {
  'No clusters': 'Only one consonant may occur at a syllable edge.',
  'Rising sonority': 'Clusters move toward more vowel-like sounds, as in English “play.”',
  'Falling sonority': 'Clusters move toward less vowel-like sounds, creating sharper edges.',
  Unrestricted: 'Consonants may combine freely, allowing dense clusters.',
} as const

const sequenceHelp = {
  'No sequences': 'Two vowels do not occur beside each other.',
  'Long vowels': 'A doubled vowel represents one longer sound.',
  Diphthongs: 'Two different vowels glide together inside one syllable.',
  Hiatus: 'Adjacent vowels are pronounced as separate syllables.',
  'Harmony-bound': 'Adjacent vowels are allowed only within the selected harmony group.',
} as const

export function LanguageForm({ settings, onChange, onGenerate }: Props) {
  const isReady = settings.vowels.length >= 1 && settings.consonants.length >= 3
    && settings.allowedInitials.length >= 1
    && (!settings.syllable.endsWith('C') || settings.allowedFinals.length >= 1)
    && Boolean(settings.morphology && settings.syllable && settings.wordOrder && settings.genderSystem && settings.articleSystem && settings.clusterPattern && settings.vowelSequences && settings.vowelHarmony)

  const selectFamily = (mood: SoundMood) => {
    if (mood === 'None') onChange({ ...settings, mood })
    else {
      const sounds = soundSets[mood]
      const allowedInitials = sounds.consonants.filter((sound) => !forbiddenInitials[mood].includes(sound))
      const allowedFinals = restrictedFinals[mood] ?? sounds.consonants
      onChange({ ...settings, mood, ...sounds, ...familyGrammar[mood], allowedInitials, allowedFinals })
    }
  }

  return (
    <aside className="builder-card">
      <div className="section-heading">
        <span>01</span>
        <div><h2>Shape your language</h2><p>Set the rules of its world.</p></div>
      </div>

      <fieldset className="family-first">
        <legend>{labels.mood}</legend>
        <p className="field-help">Start with a family-inspired bundle, or choose None to build completely from scratch.</p>
        <div className="choice-grid">
          {options.mood.map((mood) => <button className={settings.mood === mood ? 'choice active' : 'choice'} key={mood} type="button" onClick={() => selectFamily(mood)}>{mood}</button>)}
        </div>
      </fieldset>

      <VocabularyInspirationPicker selected={settings.vocabularyInspirations} onChange={(vocabularyInspirations) => onChange({ ...settings, vocabularyInspirations })} />

      <PhonologyPicker consonants={settings.consonants} selectedVowels={settings.vowels} onConsonants={(consonants) => onChange({ ...settings, mood: 'None', consonants, allowedInitials: consonants, allowedFinals: consonants })} onVowels={(vowels) => onChange({ ...settings, mood: 'None', vowels })} />

      {settings.consonants.length > 0 && <PhonotacticsPicker consonants={settings.consonants} initials={settings.allowedInitials} finals={settings.allowedFinals} onInitials={(allowedInitials) => onChange({ ...settings, mood: 'None', allowedInitials })} onFinals={(allowedFinals) => onChange({ ...settings, mood: 'None', allowedFinals })} />}

      <CasePicker selected={settings.cases} onChange={(cases) => onChange({ ...settings, mood: 'None', cases })} />

      <RegularitySlider value={settings.regularity} onChange={(regularity) => onChange({ ...settings, mood: 'None', regularity })} />

      {(Object.keys(options).filter((key) => key !== 'mood') as Array<Exclude<keyof typeof options, 'mood'>>).map((key) => (
        <fieldset key={key}>
          <legend>{labels[key]}</legend>
          <div className="choice-grid">
            {options[key].map((option) => (
              <button
                className={settings[key] === option ? 'choice active' : 'choice'}
                key={option}
                type="button"
                onClick={() => {
                  if (key === 'vowelHarmony') {
                    const vowelHarmony = option as Exclude<LanguageSettings['vowelHarmony'], ''>
                    onChange({ ...settings, vowelHarmony, vowelSequences: vowelHarmony === 'None' ? settings.vowelSequences : 'Harmony-bound' })
                  } else onChange({ ...settings, [key]: option })
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {key === 'morphology' && settings.morphology && <small>{morphologyHelp[settings.morphology]}</small>}
          {key === 'syllable' && settings.syllable && <small><b>C</b> = consonant · <b>V</b> = vowel. {syllableHelp[settings.syllable]}</small>}
          {key === 'genderSystem' && settings.genderSystem && <small>{genderHelp[settings.genderSystem]}</small>}
          {key === 'articleSystem' && settings.articleSystem && <small>{articleHelp[settings.articleSystem]}</small>}
          {key === 'clusterPattern' && settings.clusterPattern && <small>{clusterHelp[settings.clusterPattern]}</small>}
          {key === 'vowelSequences' && settings.vowelSequences && <small>{sequenceHelp[settings.vowelSequences]}</small>}
          {key === 'vowelHarmony' && settings.vowelHarmony && <small>{harmonyHelp[settings.vowelHarmony]}</small>}
          {key === 'wordOrder' && <small>S = subject · V = verb · O = object</small>}
        </fieldset>
      ))}

      {!isReady && <p className="requirements">Choose at least 1 vowel, 3 consonants, an allowed initial sound, and all grammar settings. Syllables ending in C also need an allowed final sound.</p>}
      <button className="generate-button" type="button" onClick={onGenerate} disabled={!isReady}>
        Generate my language <span aria-hidden="true">→</span>
      </button>
    </aside>
  )
}
