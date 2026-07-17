import type { GeneratedLanguage } from './languageTypes'

const escapePattern = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function translateText(text: string, language: GeneratedLanguage, reverse: boolean) {
  const entries = language.dictionary.map((entry) => reverse
    ? [entry.native.toLocaleLowerCase(), entry.english] as const
    : [entry.english.toLocaleLowerCase(), entry.native] as const)
  const dictionary = new Map(entries)
  const terms = [...dictionary.keys()].sort((first, second) => second.length - first.length)
  if (!terms.length) return text

  const alternatives = terms.map(escapePattern).join('|')
  const pattern = new RegExp(`(?<![\\p{L}\\p{M}])(?:${alternatives})(?![\\p{L}\\p{M}])`, 'giu')

  return text.replace(pattern, (match) => {
    const translated = dictionary.get(match.toLocaleLowerCase())
    if (!translated) return match
    const capitalized = match[0] === match[0]?.toLocaleUpperCase()
    return capitalized ? translated.charAt(0).toLocaleUpperCase() + translated.slice(1) : translated
  })
}
