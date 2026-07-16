import type { VocabularyFamily } from './languageTypes'

export const basicConcepts = [
  'I', 'you', 'he', 'she', 'we', 'they', 'this', 'that', 'who', 'what',
  'person', 'man', 'woman', 'child', 'mother', 'father', 'friend', 'name', 'dog', 'cat',
  'water', 'fire', 'earth', 'air', 'sun', 'sky', 'rain', 'wind', 'tree', 'flower',
  'house', 'home', 'food', 'bread', 'meat', 'fish', 'mountain', 'river', 'sea', 'world',
  'head', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'hair', 'hand', 'foot', 'heart',
  'eat', 'drink', 'sleep', 'see', 'hear', 'know', 'think', 'speak', 'go', 'come',
  'give', 'take', 'make', 'do', 'have', 'live', 'die', 'love', 'want', 'need',
  'good', 'bad', 'big', 'small', 'long', 'short', 'new', 'old', 'hot', 'cold',
  'red', 'blue', 'green', 'black', 'white', 'day', 'night', 'year', 'time', 'country',
  'city', 'road', 'book', 'word', 'language', 'work', 'play', 'life', 'death', 'peace',
] as const

type BasicConcept = typeof basicConcepts[number]

export const familyVocabulary: Record<VocabularyFamily, Partial<Record<BasicConcept, string[]>>> = {
  Germanic: {
    I: ['ik', 'ich', 'i'], dog: ['hond', 'hund'], water: ['water', 'watar'],
    father: ['fader', 'vater'], house: ['hus', 'haus'], name: ['nam', 'name'],
  },
  Austronesian: {
    I: ['aku', 'ako'], dog: ['asu', 'aso'], water: ['wai', 'air'],
    father: ['ama', 'apa'], house: ['ruma', 'balai'], name: ['nama', 'ngaran'],
  },
  Semitic: {
    I: ['ana'], dog: ['kalb', 'keleb'], water: ['ma', 'may'],
    father: ['ab', 'aba'], house: ['bayt', 'bet'], name: ['ism', 'shem'],
  },
  Turkic: {
    I: ['ben', 'men'], dog: ['it', 'kopak'], water: ['su'],
    father: ['ata', 'baba'], house: ['ev', 'uy'], name: ['ad', 'at'],
  },
  Slavic: {
    I: ['ya', 'ja'], dog: ['pes', 'sobaka'], water: ['voda'],
    father: ['otec', 'otac'], house: ['dom'], name: ['imya', 'ime'],
  },
  Japonic: {
    I: ['ware', 'watashi'], dog: ['inu'], water: ['mizu'],
    father: ['chichi'], house: ['ie', 'uchi'], name: ['namae'],
  },
  Romance: {
    I: ['yo', 'io', 'eu'], dog: ['can', 'cane'], water: ['agua', 'aqua'],
    father: ['padre', 'pare'], house: ['casa'], name: ['nome', 'nom'],
  },
  Indic: {
    I: ['aham', 'mai'], dog: ['shvan', 'kutta'], water: ['jal', 'pani'],
    father: ['pita'], house: ['ghar', 'griha'], name: ['nam'],
  },
  Koreanic: { I: ['na', 'jeo'], dog: ['gae'], water: ['mul'], father: ['abeoji'], house: ['jip'], name: ['ireum'] },
  Xoo: { I: ['n'], water: ['qhaa'], father: ['taa'], house: ['nǁaa'], name: ['ǃaa'] },
  'Niger-Congo': { I: ['mi', 'nze'], dog: ['mbwa'], water: ['maji'], father: ['baba'], house: ['nyumba'], name: ['jina'] },
  Uralic: { I: ['mina', 'mon'], dog: ['koira'], water: ['vesi'], father: ['isa'], house: ['koti'], name: ['nimi'] },
  Athabaskan: { I: ['shi'], dog: ['leechaai'], water: ['to'], father: ['azhee'], house: ['hooghan'], name: ['yilye'] },
}

const patterns: Record<VocabularyFamily, { onsets: string[]; vowels: string[]; codas: string[] }> = {
  Germanic: { onsets: ['h', 'w', 'st', 'br', 'k', 'd', 'f', 'g'], vowels: ['i', 'e', 'a', 'o', 'u'], codas: ['nd', 'r', 'k', 't', 'n'] },
  Austronesian: { onsets: ['m', 'n', 'p', 't', 'k', 'l', 'r', 'ng'], vowels: ['a', 'i', 'u', 'e', 'o'], codas: ['', '', 'n', 'ng'] },
  Semitic: { onsets: ['b', 'd', 'k', 'm', 'n', 'q', 's', 'sh'], vowels: ['a', 'i', 'u'], codas: ['b', 'd', 'k', 'm', 'n', 'r'] },
  Turkic: { onsets: ['b', 'd', 'g', 'k', 't', 'y', 's', 'q'], vowels: ['a', 'e', 'i', 'o', 'u'], codas: ['k', 'n', 'r', 't', 'z', ''] },
  Slavic: { onsets: ['v', 'z', 'pr', 'st', 'kr', 'm', 'n', 'd'], vowels: ['a', 'e', 'i', 'o', 'u'], codas: ['v', 'k', 'n', 'r', 'st'] },
  Japonic: { onsets: ['k', 's', 't', 'n', 'h', 'm', 'y', 'r'], vowels: ['a', 'i', 'u', 'e', 'o'], codas: ['', '', '', 'n'] },
  Romance: { onsets: ['b', 'c', 'd', 'f', 'l', 'm', 'p', 'v'], vowels: ['a', 'e', 'i', 'o', 'u'], codas: ['', '', 'n', 'r', 's'] },
  Indic: { onsets: ['bh', 'd', 'g', 'k', 'm', 'n', 'p', 'sh'], vowels: ['a', 'i', 'u', 'e', 'o'], codas: ['', 'm', 'n', 'r', 't'] },
  Koreanic: { onsets: ['g', 'n', 'd', 'r', 'm', 'b', 's', 'j', 'ch', 'h'], vowels: ['a', 'eo', 'o', 'u', 'eu', 'i'], codas: ['', 'k', 'n', 't', 'l', 'm', 'ng'] },
  Xoo: { onsets: ['ʘ', 'ǀ', 'ǃ', 'ǁ', 'ǂ', 'q', 'qh', 't', 'n'], vowels: ['á', 'à', 'ã', 'a̰', 'é', 'ẽ', 'í', 'ĩ', 'ó', 'õ', 'ú', 'ũ'], codas: ['', '', 'm', 'n'] },
  'Niger-Congo': { onsets: ['b', 'd', 'k', 'm', 'n', 'ny', 'mb', 'ng', 'w'], vowels: ['i', 'e', 'ɛ', 'a', 'ɔ', 'o', 'u'], codas: ['', '', '', 'm', 'n'] },
  Uralic: { onsets: ['p', 't', 'k', 'm', 'n', 's', 'v', 'j', 'l', 'r'], vowels: ['i', 'e', 'ä', 'a', 'ö', 'o', 'u'], codas: ['', 'k', 'n', 'l', 'r', 's', 't'] },
  Athabaskan: { onsets: ['t', 'k', 'ts', 'ch', 'tl', 'sh', 'gh', 'ł', 'y'], vowels: ['i', 'e', 'a', 'o'], codas: ['', 'h', 'n', 's', 't', 'sh'] },
}

const hash = (value: string) => [...value].reduce((total, letter) => (total * 31 + letter.charCodeAt(0)) >>> 0, 7)

export function inspiredCandidates(word: BasicConcept, families: VocabularyFamily[]) {
  return families.flatMap((family) => {
    const curated = familyVocabulary[family][word]
    if (curated) return curated
    const pattern = patterns[family]
    const seed = hash(`${family}:${word}`)
    const syllable = (offset: number) => `${pattern.onsets[(seed + offset) % pattern.onsets.length]}${pattern.vowels[(seed >>> (offset + 1)) % pattern.vowels.length]}${pattern.codas[(seed >>> (offset + 2)) % pattern.codas.length]}`
    return [syllable(1), `${syllable(2)}${syllable(5)}`]
  })
}

export const isInspiredConcept = (word: string): word is BasicConcept =>
  (basicConcepts as readonly string[]).includes(word)
