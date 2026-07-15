import type { GeneratedLanguage } from './languageTypes'

const clean = (word: string) => word.toLocaleLowerCase().replace(/[^a-zāēōäöüăâåœḫžščðþṭḍṇḷṣ']/giu, '')

export function translateText(text: string, language: GeneratedLanguage, reverse: boolean) {
  const entries = language.dictionary.map((entry) => reverse
    ? [clean(entry.native), entry.english] as const
    : [entry.english.toLowerCase(), entry.native] as const)
  const dictionary = new Map(entries)
  return text.split(/(\s+|[.,!?;:]+)/).map((token) => {
    const translated = dictionary.get(clean(token))
    if (!translated) return token
    const capitalized = token[0] === token[0]?.toUpperCase()
    return capitalized ? translated.charAt(0).toUpperCase() + translated.slice(1) : translated
  }).join('')
}
