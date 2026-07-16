import type { GeneratedLanguage } from './languageTypes'
import { spellingFor } from './phonemes'

export const persons = ['I', 'you', 'he / she', 'we', 'you (plural)', 'they'] as const
export const tenses = ['Past', 'Present', 'Future'] as const

export function conjugatePlay(language: GeneratedLanguage) {
  const root = language.dictionary.find((word) => word.english === 'play')?.native ?? 'play'
  const hasConjugation = (language.settings.conjugationSystem ?? 'Tense + person') !== 'None'
  const vowels = language.vowels.map(spellingFor)
  const consonants = language.consonants.map(spellingFor)

  return persons.map((person, personIndex) => ({
    person,
    forms: tenses.map((_tense, tenseIndex) => {
      if (!hasConjugation) return root
      const vowel = vowels[(personIndex + tenseIndex) % vowels.length] ?? 'a'
      const consonant = consonants[(personIndex * 2 + tenseIndex) % consonants.length] ?? ''
      return `${root}${vowel}${consonant}`
    }),
  }))
}

export function unconjugatedExample(language: GeneratedLanguage) {
  const find = (english: string) => language.dictionary.find((word) => word.english === english)?.native
    ?? language.vocabulary.find((word) => word.english === english)?.native ?? english
  return `${find('I')} ${find('play')} ${find('now')}`
}
