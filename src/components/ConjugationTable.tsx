import type { GeneratedLanguage } from '../lib/languageTypes'
import { conjugatePlay, tenses, unconjugatedExample } from '../lib/conjugation'

interface Props { language: GeneratedLanguage }

export function ConjugationTable({ language }: Props) {
  const hasConjugation = (language.settings.conjugationSystem ?? 'Tense + person') !== 'None'
  const rows = conjugatePlay(language)

  return <section className="conjugation-section">
    <div className="subheading"><span>02</span><h3>Verb conjugation</h3></div>
    <p className="conjugation-note">The verb <b>to play</b>{hasConjugation
      ? ' changes for tense and person.'
      : ' keeps one form; separate words provide time and context.'}</p>
    <div className="conjugation-scroll">
      <table>
        <thead><tr><th>Person</th>{tenses.map((tense) => <th key={tense}>{tense}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.person}>
          <th>{row.person}</th>{row.forms.map((form, index) => <td key={tenses[index]}>{form}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    {!hasConjugation && <p className="conjugation-example"><span>I play now</span>{unconjugatedExample(language)}</p>}
  </section>
}
