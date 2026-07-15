import type { GrammaticalCase } from '../lib/languageTypes'

interface Props {
  selected: GrammaticalCase[]
  onChange: (cases: GrammaticalCase[]) => void
}

const cases: Array<{ name: GrammaticalCase; explanation: string }> = [
  { name: 'Nominative', explanation: 'The subject doing the action: “the child runs.”' },
  { name: 'Accusative', explanation: 'The direct object receiving the action: “I see the child.”' },
  { name: 'Genitive', explanation: 'Possession, belonging, or origin: “the child’s book.”' },
  { name: 'Dative', explanation: 'The recipient or indirect object: “give it to the child.”' },
  { name: 'Instrumental', explanation: 'The tool or means used: “write with a pen.”' },
  { name: 'Locative', explanation: 'A general location or topic: “at home” or “about music.”' },
  { name: 'Ablative', explanation: 'Movement away from a place: “from the house.”' },
  { name: 'Allative', explanation: 'Movement toward or onto a place: “to the house.”' },
  { name: 'Elative', explanation: 'Movement out from inside something: “out of the house.”' },
  { name: 'Illative', explanation: 'Movement into something: “into the house.”' },
  { name: 'Adessive', explanation: 'Being on, at, or near something: “on the table.”' },
  { name: 'Inessive', explanation: 'Being inside something: “in the house.”' },
  { name: 'Essive', explanation: 'A temporary state or role: “as a teacher.”' },
  { name: 'Translative', explanation: 'A change into a new state: “become a teacher.”' },
  { name: 'Vocative', explanation: 'Directly addressing someone: “O friend!”' },
  { name: 'Comitative', explanation: 'Accompaniment or togetherness: “with a friend.”' },
]

export function CasePicker({ selected, onChange }: Props) {
  const toggle = (grammaticalCase: GrammaticalCase) => {
    const next = selected.includes(grammaticalCase)
      ? selected.filter((item) => item !== grammaticalCase)
      : [...selected, grammaticalCase]
    onChange(next)
  }

  return (
    <fieldset>
      <legend>Grammatical cases <span className="count">{selected.length} selected</span></legend>
      <p className="field-help">Cases show a noun's role in a sentence. Select none for a language without noun cases.</p>
      <div className="choice-grid">
        {cases.map(({ name, explanation }) => (
          <button
            className={selected.includes(name) ? 'choice case-choice active' : 'choice case-choice'}
            key={name}
            type="button"
            onClick={() => toggle(name)}
          >
            <strong>{name}</strong>
            <small>{explanation}</small>
          </button>
        ))}
      </div>
      <small>{selected.length === 0 ? 'No case marking.' : selected.join(' · ')}</small>
    </fieldset>
  )
}
