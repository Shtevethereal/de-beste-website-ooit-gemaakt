export type Morphology = 'Analytic' | 'Agglutinative' | 'Fusional' | 'Polysynthetic' | 'Isolating' | 'Introflexive' | 'Oligosynthetic'
export type Syllable = 'CV' | 'CVC' | 'CVCC' | 'CCV' | 'CVV' | 'CCVC'
export type WordOrder = 'SOV' | 'SVO' | 'VSO' | 'VOS' | 'OVS'
export type GenderSystem = 'None' | '2 genders' | '3 genders' | '4 genders' | '5+ classes'
export type ArticleSystem = 'None' | 'One' | 'Gendered' | 'One + plural' | 'Gendered + plural'
export type ConjugationSystem = 'Tense + person' | 'None'
export type VowelHarmony = 'None' | 'Front / back' | 'Front / back + neutral' | 'Rounding' | 'Front / back + rounding' | 'Height' | 'Advanced tongue root (ATR)'
export type GrammaticalCase = 'Nominative' | 'Accusative' | 'Genitive' | 'Dative' | 'Instrumental' | 'Locative' | 'Ablative' | 'Allative' | 'Elative' | 'Illative' | 'Adessive' | 'Inessive' | 'Essive' | 'Translative' | 'Vocative' | 'Comitative'
export type ClusterPattern = 'No clusters' | 'Rising sonority' | 'Falling sonority' | 'Unrestricted'
export type VowelSequences = 'No sequences' | 'Long vowels' | 'Diphthongs' | 'Hiatus' | 'Harmony-bound'
export type SoundMood = 'None' | 'Germanic' | 'Austronesian' | 'Semitic' | 'Turkic' | 'Slavic' | 'Japonic' | 'Romance' | 'Indic' | 'Koreanic' | 'Xoo' | 'Niger-Congo' | 'Uralic' | 'Athabaskan'
export type VocabularyFamily = Exclude<SoundMood, 'None'>

export interface LanguageSettings {
  mood: SoundMood
  vocabularyInspirations: VocabularyFamily[]
  morphology: Morphology | ''
  syllable: Syllable | ''
  wordOrder: WordOrder | ''
  genderSystem: GenderSystem | ''
  articleSystem: ArticleSystem | ''
  conjugationSystem: ConjugationSystem | ''
  cases: GrammaticalCase[]
  regularity: number
  clusterPattern: ClusterPattern | ''
  vowelSequences: VowelSequences | ''
  vowelHarmony: VowelHarmony | ''
  consonants: string[]
  vowels: string[]
  allowedInitials: string[]
  allowedFinals: string[]
}

export interface GeneratedLanguage {
  name: string
  nativeName: string
  settings: LanguageSettings
  consonants: string[]
  vowels: string[]
  vocabulary: Array<{ english: string; native: string; category: string }>
  dictionary: Array<{ english: string; native: string; category: string; gender?: string }>
  translation: string
}
