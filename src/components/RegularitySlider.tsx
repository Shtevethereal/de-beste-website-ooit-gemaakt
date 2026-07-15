interface Props {
  value: number
  onChange: (value: number) => void
}

const describeRegularity = (value: number) => {
  if (value <= 20) return 'Highly irregular'
  if (value <= 40) return 'Mostly irregular'
  if (value <= 60) return 'Mixed'
  if (value <= 80) return 'Mostly regular'
  return 'Highly regular'
}

export function RegularitySlider({ value, onChange }: Props) {
  return (
    <fieldset className="regularity-picker">
      <legend>Morphological regularity</legend>
      <p className="field-help">Controls how consistently nouns and verbs follow their usual patterns.</p>
      <div className="slider-heading">
        <span>Highly irregular</span>
        <strong>{describeRegularity(value)}</strong>
        <span>Highly regular</span>
      </div>
      <input
        aria-label="Morphological regularity"
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </fieldset>
  )
}
