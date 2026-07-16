import type { VocabularyFamily } from '../lib/languageTypes'

interface Props {
  selected: VocabularyFamily[]
  onChange: (families: VocabularyFamily[]) => void
}

const families: VocabularyFamily[] = ['Germanic', 'Austronesian', 'Semitic', 'Turkic', 'Slavic', 'Japonic', 'Romance', 'Indic', 'Koreanic', 'Xoo', 'Niger-Congo', 'Uralic', 'Athabaskan']

export function VocabularyInspirationPicker({ selected, onChange }: Props) {
  const toggle = (family: VocabularyFamily) => onChange(selected.includes(family)
    ? selected.filter((item) => item !== family) : [...selected, family])

  return (
    <fieldset className="vocabulary-inspiration">
      <legend>Vocabulary inspiration <span className="count">{selected.length || 'none'} selected</span></legend>
      <p className="field-help">Choose any number of families. This only inspires a few core roots; sounds and grammar stay independent.</p>
      <div className="choice-grid">
        {families.map((family) => <button className={selected.includes(family) ? 'choice active' : 'choice'} key={family} type="button" onClick={() => toggle(family)}>{family}</button>)}
      </div>
      {selected.length > 0 && <button className="text-button" type="button" onClick={() => onChange([])}>Clear vocabulary inspiration</button>}
    </fieldset>
  )
}
