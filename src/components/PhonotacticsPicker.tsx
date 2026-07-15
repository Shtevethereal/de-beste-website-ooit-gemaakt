interface Props {
  consonants: string[]
  initials: string[]
  finals: string[]
  onInitials: (sounds: string[]) => void
  onFinals: (sounds: string[]) => void
}

const toggle = (items: string[], sound: string) => items.includes(sound)
  ? items.filter((item) => item !== sound) : [...items, sound]

export function PhonotacticsPicker({ consonants, initials, finals, onInitials, onFinals }: Props) {
  return (
    <fieldset className="phonotactics">
      <legend>Phonotactics</legend>
      <p className="field-help">Phonotactics are rules about where sounds may appear. Select which consonants can begin or end a syllable.</p>
      <div className="position-rule">
        <div><h4>Allowed at the beginning</h4><small>Onsets · Germanic languages, for example, do not begin native words with /ŋ/.</small></div>
        <div className="sound-toggles">{consonants.map((sound) => <button type="button" key={sound} className={initials.includes(sound) ? 'sound-toggle active' : 'sound-toggle'} onClick={() => onInitials(toggle(initials, sound))}>/{sound}/</button>)}</div>
      </div>
      <div className="position-rule">
        <div><h4>Allowed at the end</h4><small>Codas · Some languages permit many final sounds; others allow only a few.</small></div>
        <div className="sound-toggles">{consonants.map((sound) => <button type="button" key={sound} className={finals.includes(sound) ? 'sound-toggle active' : 'sound-toggle'} onClick={() => onFinals(toggle(finals, sound))}>/{sound}/</button>)}</div>
      </div>
    </fieldset>
  )
}
