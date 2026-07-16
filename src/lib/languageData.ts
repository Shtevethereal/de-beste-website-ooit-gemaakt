import type { GrammaticalCase, LanguageSettings, SoundMood } from './languageTypes'

type LanguageFamily = Exclude<SoundMood, 'None'>

export const soundSets: Record<LanguageFamily, { consonants: string[]; vowels: string[] }> = {
  Germanic: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'm', 'n', 'ŋ', 'l', 'r', 'h', 'j'], vowels: ['i', 'ɪ', 'e', 'ɛ', 'æ', 'a', 'ə', 'y', 'u', 'ʊ', 'o', 'ɔ'] },
  Austronesian: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ', 's', 'l', 'r', 'h', 'j', 'ʔ'], vowels: ['i', 'e', 'ə', 'a', 'o', 'u'] },
  Semitic: { consonants: ['b', 't', 'd', 'k', 'q', 'f', 'θ', 'ð', 's', 'z', 'ʃ', 'x', 'ħ', 'ʕ', 'm', 'n', 'r', 'h', 'ʔ'], vowels: ['i', 'e', 'a', 'u', 'o'] },
  Turkic: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'q', 's', 'z', 'ʃ', 'tʃ', 'x', 'm', 'n', 'ŋ', 'l', 'r', 'j'], vowels: ['i', 'y', 'e', 'ø', 'a', 'ɨ', 'ɯ', 'u', 'o'] },
  Slavic: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 's', 'z', 'ʃ', 'ʒ', 'tʃ', 'x', 'm', 'n', 'l', 'r', 'j'], vowels: ['i', 'e', 'ɛ', 'a', 'ɨ', 'u', 'o'] },
  Japonic: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 's', 'z', 'ʃ', 'tʃ', 'm', 'n', 'r', 'h', 'j', 'ʔ'], vowels: ['i', 'e', 'a', 'o', 'ɯ'] },
  Romance: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 's', 'z', 'ʃ', 'ʒ', 'm', 'n', 'l', 'r', 'j'], vowels: ['i', 'e', 'ɛ', 'a', 'u', 'o', 'ɔ'] },
  Indic: { consonants: ['p', 'b', 't', 'd', 'ʈ', 'ɖ', 'k', 'g', 'tʃ', 'm', 'n', 'ɳ', 'ŋ', 's', 'ʃ', 'ʂ', 'h', 'l', 'ɭ', 'r', 'j'], vowels: ['i', 'ɪ', 'e', 'ɛ', 'a', 'ə', 'u', 'ʊ', 'o', 'ɔ'] },
  Koreanic: { consonants: ['p', 'pʰ', 'pʼ', 't', 'tʰ', 'tʼ', 'k', 'kʰ', 'kʼ', 'tɕ', 'tɕʰ', 'tɕʼ', 's', 'sʼ', 'm', 'n', 'ŋ', 'l', 'h'], vowels: ['i', 'e', 'ɛ', 'ɯ', 'ʌ', 'a', 'u', 'o'] },
  Xoo: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'q', 'ʔ', 's', 'x', 'χ', 'h', 'm', 'n', 'ǀ', 'ǃ', 'ǁ', 'ǂ', 'ŋǃ', 'ǃʰ'], vowels: ['i', 'e', 'a', 'o', 'u'] },
  'Niger-Congo': { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'k͡p', 'g͡b', 'ɓ', 'ɗ', 'f', 's', 'ʃ', 'm', 'n', 'ɲ', 'ŋ', 'l', 'r', 'j', 'w'], vowels: ['i', 'ɪ', 'e', 'ɛ', 'a', 'ɔ', 'o', 'ʊ', 'u'] },
  Uralic: { consonants: ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 's', 'ʃ', 'h', 'm', 'n', 'ŋ', 'l', 'r', 'j'], vowels: ['i', 'e', 'æ', 'y', 'ø', 'ɑ', 'u', 'o'] },
  Athabaskan: { consonants: ['t', 'tʼ', 'k', 'kʼ', 'q', 'qʼ', 'ts', 'tsʼ', 'tʃ', 'tʃʼ', 'tɬ', 'tɬʼ', 's', 'ʃ', 'ɬ', 'x', 'ɣ', 'm', 'n', 'j', 'w'], vowels: ['i', 'ɪ', 'e', 'ɛ', 'a', 'ɑ', 'o'] },
}

type FamilyGrammar = { morphology: Exclude<LanguageSettings['morphology'], ''>; syllable: Exclude<LanguageSettings['syllable'], ''>; wordOrder: Exclude<LanguageSettings['wordOrder'], ''>; genderSystem: Exclude<LanguageSettings['genderSystem'], ''>; articleSystem: Exclude<LanguageSettings['articleSystem'], ''>; cases: GrammaticalCase[]; regularity: number; clusterPattern: Exclude<LanguageSettings['clusterPattern'], ''>; vowelSequences: Exclude<LanguageSettings['vowelSequences'], ''>; vowelHarmony: Exclude<LanguageSettings['vowelHarmony'], ''> }

export const familyGrammar: Record<LanguageFamily, FamilyGrammar> = {
  Germanic: { morphology: 'Fusional', syllable: 'CVCC', wordOrder: 'SVO', genderSystem: '3 genders', articleSystem: 'Gendered + plural', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative'], regularity: 45, clusterPattern: 'Rising sonority', vowelSequences: 'Diphthongs', vowelHarmony: 'None' },
  Austronesian: { morphology: 'Agglutinative', syllable: 'CV', wordOrder: 'VSO', genderSystem: 'None', articleSystem: 'None', cases: [], regularity: 90, clusterPattern: 'No clusters', vowelSequences: 'Hiatus', vowelHarmony: 'None' },
  Semitic: { morphology: 'Introflexive', syllable: 'CVC', wordOrder: 'VSO', genderSystem: '2 genders', articleSystem: 'One', cases: ['Nominative', 'Accusative', 'Genitive'], regularity: 55, clusterPattern: 'Rising sonority', vowelSequences: 'No sequences', vowelHarmony: 'None' },
  Turkic: { morphology: 'Agglutinative', syllable: 'CVCC', wordOrder: 'SOV', genderSystem: 'None', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Locative', 'Ablative'], regularity: 95, clusterPattern: 'No clusters', vowelSequences: 'Harmony-bound', vowelHarmony: 'Front / back + rounding' },
  Slavic: { morphology: 'Fusional', syllable: 'CCVC', wordOrder: 'SOV', genderSystem: '3 genders', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Instrumental', 'Locative', 'Vocative'], regularity: 15, clusterPattern: 'Unrestricted', vowelSequences: 'No sequences', vowelHarmony: 'None' },
  Japonic: { morphology: 'Agglutinative', syllable: 'CV', wordOrder: 'SOV', genderSystem: 'None', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Locative', 'Allative', 'Ablative', 'Comitative'], regularity: 95, clusterPattern: 'No clusters', vowelSequences: 'Long vowels', vowelHarmony: 'None' },
  Romance: { morphology: 'Fusional', syllable: 'CVC', wordOrder: 'SVO', genderSystem: '2 genders', articleSystem: 'Gendered + plural', cases: [], regularity: 40, clusterPattern: 'Rising sonority', vowelSequences: 'Diphthongs', vowelHarmony: 'None' },
  Indic: { morphology: 'Fusional', syllable: 'CVC', wordOrder: 'SOV', genderSystem: '3 genders', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Instrumental', 'Locative', 'Ablative', 'Vocative'], regularity: 35, clusterPattern: 'Rising sonority', vowelSequences: 'Long vowels', vowelHarmony: 'None' },
  Koreanic: { morphology: 'Agglutinative', syllable: 'CVC', wordOrder: 'SOV', genderSystem: 'None', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Instrumental', 'Locative', 'Vocative'], regularity: 85, clusterPattern: 'No clusters', vowelSequences: 'No sequences', vowelHarmony: 'None' },
  Xoo: { morphology: 'Isolating', syllable: 'CV', wordOrder: 'SVO', genderSystem: 'None', articleSystem: 'None', cases: [], regularity: 70, clusterPattern: 'No clusters', vowelSequences: 'Long vowels', vowelHarmony: 'None' },
  'Niger-Congo': { morphology: 'Agglutinative', syllable: 'CV', wordOrder: 'SVO', genderSystem: '5+ classes', articleSystem: 'None', cases: [], regularity: 85, clusterPattern: 'No clusters', vowelSequences: 'Harmony-bound', vowelHarmony: 'Advanced tongue root (ATR)' },
  Uralic: { morphology: 'Agglutinative', syllable: 'CVC', wordOrder: 'SOV', genderSystem: 'None', articleSystem: 'None', cases: ['Nominative', 'Accusative', 'Genitive', 'Dative', 'Instrumental', 'Locative', 'Ablative', 'Allative', 'Elative', 'Illative', 'Adessive', 'Inessive', 'Essive', 'Translative'], regularity: 90, clusterPattern: 'Rising sonority', vowelSequences: 'Long vowels', vowelHarmony: 'Front / back' },
  Athabaskan: { morphology: 'Polysynthetic', syllable: 'CVCC', wordOrder: 'SOV', genderSystem: 'None', articleSystem: 'None', cases: [], regularity: 65, clusterPattern: 'Falling sonority', vowelSequences: 'Long vowels', vowelHarmony: 'None' },
}

export const forbiddenInitials: Record<LanguageFamily, string[]> = {
  Germanic: ['ŋ'],
  Austronesian: ['ŋ', 'ʔ'],
  Semitic: ['ŋ'],
  Turkic: ['ŋ', 'r'],
  Slavic: ['ŋ'],
  Japonic: ['ŋ', 'ʔ'],
  Romance: ['ŋ', 'ʃ', 'ʒ'],
  Indic: ['ŋ', 'ɳ', 'ɭ'],
  Koreanic: ['ŋ', 'l'],
  Xoo: ['ŋǃ'],
  'Niger-Congo': ['ŋ'],
  Uralic: ['ŋ'],
  Athabaskan: [],
}

export const restrictedFinals: Partial<Record<LanguageFamily, string[]>> = {
  Austronesian: ['m', 'n', 'ŋ', 'ʔ'],
  Japonic: ['n', 'ʔ'],
  Koreanic: ['k', 'n', 't', 'l', 'm', 'ŋ'],
  Xoo: ['m', 'n'],
  'Niger-Congo': ['m', 'n', 'ŋ'],
}

export const lexicon = [
  ['I', 'pronoun'], ['we', 'pronoun'], ['they', 'pronoun'], ['it', 'pronoun'], ['who', 'pronoun'], ['our', 'determiner'],
  ['and', 'conjunction'], ['but', 'conjunction'], ['that', 'conjunction'], ['so', 'conjunction'], ['because', 'conjunction'],
  ['the', 'article'], ['a', 'article'], ['here', 'adverb'], ['now', 'adverb'], ['never', 'adverb'], ['rather', 'adverb'],
  ['create', 'verb'], ['conceive', 'verb'], ['dedicate', 'verb'], ['remember', 'verb'], ['forget', 'verb'], ['fight', 'verb'], ['give', 'verb'], ['live', 'verb'], ['die', 'verb'], ['perish', 'verb'],
  ['father', 'noun'], ['nation', 'noun'], ['liberty', 'noun'], ['war', 'noun'], ['earth', 'noun'], ['people', 'noun'], ['government', 'noun'], ['world', 'noun'], ['work', 'noun'], ['field', 'noun'],
  ['equal', 'adjective'], ['great', 'adjective'], ['brave', 'adjective'], ['living', 'adjective'], ['dead', 'adjective'], ['final', 'adjective'], ['unfinished', 'adjective'],
] as const

export const addressPassages = [
  ['four-score', 'year', 'before', 'our', 'father', 'create', 'a', 'new', 'nation', 'conceive', 'in', 'liberty', 'and', 'dedicate', 'that', 'all', 'people', 'equal'],
  ['now', 'we', 'fight', 'a', 'great', 'war', 'test', 'whether', 'that', 'nation', 'can', 'live'],
  ['we', 'come', 'dedicate', 'a', 'field', 'for', 'they', 'who', 'give', 'life', 'that', 'nation', 'live'],
  ['but', 'we', 'cannot', 'dedicate', 'we', 'cannot', 'bless', 'this', 'earth'],
  ['the', 'brave', 'living', 'and', 'dead', 'who', 'fight', 'here', 'already', 'dedicate', 'it'],
  ['the', 'world', 'may', 'not', 'remember', 'what', 'we', 'say', 'here', 'but', 'never', 'forget', 'what', 'they', 'do', 'here'],
  ['rather', 'we', 'the', 'living', 'dedicate', 'to', 'the', 'unfinished', 'work', 'they', 'advance'],
  ['we', 'resolve', 'that', 'the', 'dead', 'not', 'die', 'in-vain', 'and', 'this', 'nation', 'have', 'new', 'liberty'],
  ['and', 'government', 'of', 'the', 'people', 'by', 'the', 'people', 'for', 'the', 'people', 'not', 'perish', 'from', 'the', 'earth'],
]

export function transliterate(word: string) {
  return word.replace(/kh/g, 'ḫ').replace(/zh/g, 'ž').replace(/sh/g, 'š').replace(/ch/g, 'č').replace(/dh/g, 'ð').replace(/th/g, 'þ').replace(/aa/g, 'ā').replace(/ee/g, 'ē').replace(/oo/g, 'ō')
}
