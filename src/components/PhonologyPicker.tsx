import { consonantGroups, vowels } from '../lib/phonemes'

interface Props { consonants: string[]; selectedVowels: string[]; onConsonants: (value: string[]) => void; onVowels: (value: string[]) => void }

const toggle = (items: string[], item: string) =>
  items.includes(item) ? items.filter((value) => value !== item) : [...items, item]

export function PhonologyPicker({ consonants, selectedVowels, onConsonants, onVowels }: Props) {
  return (
    <div className="phonology-picker">
      <fieldset>
        <legend>Vowels <span className="count">{selectedVowels.length} selected</span></legend>
        <p className="field-help">The chart moves from sounds made at the front of your mouth to the back.</p>
        <div className="vowel-chart">
          {vowels.map((sound) => <button type="button" key={sound.symbol} title={`/${sound.symbol}/, as in ${sound.example} · ${sound.position}`} className={selectedVowels.includes(sound.symbol) ? 'phoneme active' : 'phoneme'} onClick={() => onVowels(toggle(selectedVowels, sound.symbol))}><b>/{sound.symbol}/</b><small>as in {sound.example}</small></button>)}
        </div>
      </fieldset>
      <fieldset>
        <legend>Consonants <span className="count">{consonants.length} selected</span></legend>
        <p className="field-help"><b>Voiced</b> means your throat vibrates. A <b>plosive</b> briefly blocks the air; a <b>fricative</b> squeezes it.</p>
        {consonantGroups.map((group) => <div className="sound-group" key={group.name}><div><h4>{group.name}</h4><p>{group.description}</p></div><div className="phoneme-row">{group.sounds.map((sound) => <button type="button" key={sound.symbol} title={`/${sound.symbol}/, as in ${sound.example}`} className={consonants.includes(sound.symbol) ? 'phoneme active' : 'phoneme'} onClick={() => onConsonants(toggle(consonants, sound.symbol))}><b>/{sound.symbol}/</b><small>{sound.example}</small></button>)}</div></div>)}
      </fieldset>
    </div>
  )
}
