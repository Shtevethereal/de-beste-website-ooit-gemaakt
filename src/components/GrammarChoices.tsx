import type { LanguageSettings } from '../lib/languageTypes'

export type GrammarKey = 'morphology' | 'syllable' | 'wordOrder' | 'genderSystem' | 'articleSystem' | 'conjugationSystem' | 'clusterPattern' | 'vowelSequences' | 'vowelHarmony'

const options = {
  morphology: ['Analytic', 'Agglutinative', 'Fusional', 'Polysynthetic', 'Isolating', 'Introflexive', 'Oligosynthetic'],
  syllable: ['CV', 'CVC', 'CVCC', 'CCV', 'CVV', 'CCVC'], wordOrder: ['SOV', 'SVO', 'VSO', 'VOS', 'OVS'],
  genderSystem: ['None', '2 genders', '3 genders', '4 genders', '5+ classes'], articleSystem: ['None', 'One', 'Gendered', 'One + plural', 'Gendered + plural'],
  conjugationSystem: ['Tense + person', 'None'],
  clusterPattern: ['No clusters', 'Rising sonority', 'Falling sonority', 'Unrestricted'], vowelSequences: ['No sequences', 'Long vowels', 'Diphthongs', 'Hiatus', 'Harmony-bound'],
  vowelHarmony: ['None', 'Front / back', 'Front / back + neutral', 'Rounding', 'Front / back + rounding', 'Height', 'Advanced tongue root (ATR)'],
} as const

const labels: Record<GrammarKey, string> = {
  morphology: 'Language type', syllable: 'Syllable structure', wordOrder: 'Word order', genderSystem: 'Grammatical gender / noun classes',
  articleSystem: 'Articles', conjugationSystem: 'Verb conjugation', clusterPattern: 'Consonant clusters', vowelSequences: 'Vowel sequences', vowelHarmony: 'Vowel harmony',
}

const help: Partial<Record<GrammarKey, Record<string, string>>> = {
  morphology: { Analytic: 'Grammar mostly uses separate helper words.', Isolating: 'Words rarely change their form.', Agglutinative: 'Clear pieces stack onto a word, one meaning each.', Fusional: 'One ending can carry several meanings.', Polysynthetic: 'A whole sentence can fit inside one long word.', Introflexive: 'Grammar changes vowels inside a word.', Oligosynthetic: 'A tiny stock of roots combines into many ideas.' },
  syllable: { CV: 'Consonant + vowel. Simple and open.', CVC: 'Consonant + vowel + consonant, as in cat.', CVCC: 'One opening consonant and two at the end.', CCV: 'Two opening consonants + vowel.', CVV: 'A long vowel or diphthong.', CCVC: 'Two opening consonants and one final consonant.' },
  genderSystem: { None: 'Nouns have no grammatical gender.', '2 genders': 'Two agreement groups.', '3 genders': 'Often masculine, feminine, and neuter.', '4 genders': 'Four noun agreement groups.', '5+ classes': 'A larger noun-class system.' },
  articleSystem: { None: 'The language does not use articles.', One: 'One article is used for every noun.', Gendered: 'Articles agree with noun gender.', 'One + plural': 'Separate singular and plural articles.', 'Gendered + plural': 'Articles agree with gender and number.' },
  conjugationSystem: { 'Tense + person': 'The verb changes for who acts and when.', None: 'The verb never changes; separate words show person and time, like Indonesian.' },
  clusterPattern: { 'No clusters': 'Only one consonant at a syllable edge.', 'Rising sonority': 'Clusters open toward the vowel, as in play.', 'Falling sonority': 'Clusters create sharper syllable edges.', Unrestricted: 'Consonants may combine freely.' },
  vowelSequences: { 'No sequences': 'Vowels do not occur side by side.', 'Long vowels': 'Doubled vowels create longer sounds.', Diphthongs: 'Two vowels glide together.', Hiatus: 'Adjacent vowels form separate syllables.', 'Harmony-bound': 'Sequences stay inside one harmony group.' },
  vowelHarmony: { None: 'Any selected vowels may appear together.', 'Front / back': 'Words keep front or back vowels together.', 'Front / back + neutral': 'Central vowels may join either group.', Rounding: 'Vowels agree in lip rounding.', 'Front / back + rounding': 'Vowels match position and rounding.', Height: 'Vowels keep a similar tongue height.', 'Advanced tongue root (ATR)': 'Vowels agree in tongue-root position.' },
}

interface Props { keys: GrammarKey[]; settings: LanguageSettings; onChange: (settings: LanguageSettings) => void }

export function GrammarChoices({ keys, settings, onChange }: Props) {
  return <>{keys.map((key) => <fieldset key={key}>
    <legend>{labels[key]}</legend>
    <div className="choice-grid">{options[key].map((option) => <button className={settings[key] === option ? 'choice active' : 'choice'} key={option} type="button" onClick={() => {
      if (key === 'vowelHarmony') {
        const vowelHarmony = option as Exclude<LanguageSettings['vowelHarmony'], ''>
        onChange({ ...settings, mood: 'None', vowelHarmony, vowelSequences: vowelHarmony === 'None' ? settings.vowelSequences : 'Harmony-bound' })
      } else onChange({ ...settings, mood: 'None', [key]: option })
    }}>{option}</button>)}</div>
    {settings[key] && help[key]?.[settings[key] as string] && <small>{help[key]?.[settings[key] as string]}</small>}
    {key === 'wordOrder' && <small>S = subject · V = verb · O = object</small>}
  </fieldset>)}</>
}
