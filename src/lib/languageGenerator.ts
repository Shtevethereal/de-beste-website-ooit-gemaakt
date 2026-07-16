import { addressPassages, lexicon, transliterate } from './languageData'
import type { GeneratedLanguage, LanguageSettings } from './languageTypes'
import { spellingFor, vowels as vowelInventory } from './phonemes'
import { b1Vocabulary } from './b1Vocabulary'
import { inspiredCandidates, isInspiredConcept } from './familyVocabulary'

export const defaultSettings: LanguageSettings = {
  mood: 'None', vocabularyInspirations: [], morphology: '', syllable: '', wordOrder: '', genderSystem: '', articleSystem: '', conjugationSystem: 'Tense + person', cases: [], regularity: 50, clusterPattern: '', vowelSequences: '', vowelHarmony: '', consonants: [], vowels: [], allowedInitials: [], allowedFinals: [],
}

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

const xooVowels: Record<string, string[]> = {
  a: ['á', 'à', 'ã', 'a̰'], e: ['é', 'è', 'ẽ', 'ḛ'], i: ['í', 'ì', 'ĩ', 'ḭ'],
  o: ['ó', 'ò', 'õ', 'o̰'], u: ['ú', 'ù', 'ũ', 'ṵ'],
}

function finishWord(word: string, settings: LanguageSettings) {
  const written = transliterate(word)
  const usesXooOrthography = settings.mood === 'Xoo'
    || settings.consonants.some((sound) => ['ʘ', 'ǀ', 'ǃ', 'ǁ', 'ǂ'].includes(sound))
  if (!usesXooOrthography) return written
  const seed = [...written].reduce((total, character) => total + character.charCodeAt(0), 0)
  let vowelIndex = 0
  return written.replace(/[aeiou]/g, (vowel) => {
    const value = seed + vowelIndex * 17
    vowelIndex += 1
    return value % 20 < 11 ? xooVowels[vowel][value % xooVowels[vowel].length] : vowel
  })
}

const sonority = (sound: string) => {
  if (/^[jw]/.test(sound)) return 4
  if (/^[lr]/.test(sound)) return 3
  if (/^[mn]/.test(sound)) return 2
  if (/^(?:f|v|s|z|sh|zh|th|dh|kh|h)/.test(sound)) return 1
  return 0
}

function makeWord(settings: LanguageSettings, short = false, exactSyllables?: number) {
  const consonants = settings.consonants.map(spellingFor)
  const initials = (settings.allowedInitials.length ? settings.allowedInitials : settings.consonants).map(spellingFor)
  const finals = (settings.allowedFinals.length ? settings.allowedFinals : settings.consonants).map(spellingFor)
  const anchor = pick(settings.vowels)
  const positionOf = (vowel: string) => vowelInventory.find((item) => item.symbol === vowel)?.position ?? ''
  const isCentral = (vowel: string) => positionOf(vowel).includes('Central') || positionOf(vowel).includes('central')
  const isHigh = (vowel: string) => /^(Close|Near-close)/.test(positionOf(vowel))
  const isAdvancedTongueRoot = (vowel: string) => /^(Close|Close-mid|Central)/.test(positionOf(vowel))
  const front = new Set(['i', 'ɪ', 'e', 'ɛ', 'æ', 'y', 'ø', 'œ'])
  const rounded = new Set(['y', 'ø', 'œ', 'u', 'ʊ', 'o', 'ɔ', 'ɒ'])
  const matchesHarmony = (vowel: string) => {
    const sameFrontness = front.has(vowel) === front.has(anchor)
    const sameRounding = rounded.has(vowel) === rounded.has(anchor)
    if (settings.vowelHarmony === 'Front / back') return sameFrontness
    if (settings.vowelHarmony === 'Front / back + neutral') return isCentral(vowel) || isCentral(anchor) || sameFrontness
    if (settings.vowelHarmony === 'Rounding') return sameRounding
    if (settings.vowelHarmony === 'Front / back + rounding') return sameFrontness && sameRounding
    if (settings.vowelHarmony === 'Height') return isHigh(vowel) === isHigh(anchor)
    if (settings.vowelHarmony === 'Advanced tongue root (ATR)') return isAdvancedTongueRoot(vowel) === isAdvancedTongueRoot(anchor)
    return true
  }
  const harmonious = settings.vowels.filter(matchesHarmony)
  const vowels = (harmonious.length ? harmonious : settings.vowels).map(spellingFor)
  const count = exactSyllables ?? (short ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2))
  let word = ''
  for (let i = 0; i < count; i += 1) {
    const c = pick(initials)
    const v = pick(vowels)
    const clusterCandidates = consonants.filter((sound) => {
      if (settings.clusterPattern === 'Rising sonority') return sonority(sound) < sonority(c)
      if (settings.clusterPattern === 'Falling sonority') return sonority(sound) > sonority(c)
      return true
    })
    const extraC = settings.syllable.startsWith('CC') && settings.clusterPattern !== 'No clusters'
      ? pick(clusterCandidates.length ? clusterCandidates : consonants) : ''
    const differentVowels = vowels.filter((sound) => sound !== v)
    const extraV = !settings.syllable.includes('VV') || settings.vowelSequences === 'No sequences' ? ''
      : settings.vowelSequences === 'Long vowels' ? v
      : settings.vowelSequences === 'Diphthongs' ? pick(differentVowels.length ? differentVowels : vowels)
      : pick(vowels)
    const ending = settings.syllable.endsWith('CC')
      ? `${pick(finals)}${pick(finals)}`
      : settings.syllable.endsWith('C') ? pick(finals) : ''
    word += `${extraC}${c}${v}${extraV}${ending}`
  }
  return word
}

function adaptInspiredRoot(root: string, settings: LanguageSettings) {
  const vowels = settings.vowels.map(spellingFor)
  const consonants = settings.consonants.map(spellingFor).filter((sound) => /^[a-z]+$/i.test(sound))
  const adapted = [...root.toLowerCase()].map((letter) => {
    if ('aeiouy'.includes(letter) && Math.random() < 0.14) return pick(vowels)
    if (/[a-z]/.test(letter) && !'aeiouy'.includes(letter) && Math.random() < 0.06) return pick(consonants)
    return letter
  }).join('')
  return finishWord(adapted, settings)
}

export function generateLanguage(settings: LanguageSettings): GeneratedLanguage {
  const categories = new Map<string, string>(lexicon.map(([word, category]) => [word, category]))
  const shortCategories = new Set(['pronoun', 'determiner', 'conjunction', 'article', 'adverb'])
  const allConcepts = new Set([...categories.keys(), ...addressPassages.flat()])
  const inspiredRoots = new Map<string, string>()
  for (const concept of allConcepts) {
    if (!isInspiredConcept(concept) || settings.vocabularyInspirations.length === 0) continue
    const candidates = inspiredCandidates(concept, settings.vocabularyInspirations)
    inspiredRoots.set(concept, adaptInspiredRoot(pick(candidates), settings))
  }
  const roots = new Map([...allConcepts].map((concept) => [concept, inspiredRoots.get(concept)
    ?? makeWord(settings, shortCategories.has(categories.get(concept) ?? ''))]))
  const endings = settings.morphology === 'Agglutinative' ? {
    noun: makeWord(settings, true, 1),
    verb: makeWord(settings, true, 1),
    adjective: makeWord(settings, true, 1),
  } : null
  const render = (concept: string) => {
    const category = categories.get(concept)
    const ending = category && endings && category in endings
      ? endings[category as keyof typeof endings] : ''
    return finishWord(`${roots.get(concept)}${ending}`, settings)
  }
  const vocabulary = lexicon.map(([english, category]) => ({ english, category, native: render(english) }))
  const genderLabels = settings.genderSystem === '2 genders' ? ['I', 'II']
    : settings.genderSystem === '3 genders' ? ['I', 'II', 'III']
    : settings.genderSystem === '4 genders' ? ['I', 'II', 'III', 'IV']
    : settings.genderSystem === '5+ classes' ? ['I', 'II', 'III', 'IV', 'V', 'VI'] : []
  const dictionary = b1Vocabulary.map(({ english, category }) => {
    let inspired = inspiredRoots.get(english)
    if (!inspired && isInspiredConcept(english) && settings.vocabularyInspirations.length > 0) {
      const candidates = inspiredCandidates(english, settings.vocabularyInspirations)
      inspired = adaptInspiredRoot(pick(candidates), settings)
      inspiredRoots.set(english, inspired)
    }
    const native = inspired ?? finishWord(makeWord(settings, category === 'function'), settings)
    const gender = category === 'noun' && genderLabels.length ? pick(genderLabels) : undefined
    return { english, category, native, gender }
  })
  const translation = addressPassages.map((passage) => passage.map(render).join(' ') + '.').join('\n\n')
  const nameRoot = makeWord(settings)
  return {
    name: nameRoot.charAt(0).toUpperCase() + nameRoot.slice(1),
    nativeName: finishWord(nameRoot, settings), settings,
    consonants: settings.consonants, vowels: settings.vowels,
    vocabulary, dictionary, translation,
  }
}
