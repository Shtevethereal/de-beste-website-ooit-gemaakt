import type { UiLanguage } from '../lib/i18n'

interface Props { language: UiLanguage; onChange: (language: UiLanguage) => void }

export function LanguageSelect({ language, onChange }: Props) {
  return <label className="language-select">
    <span className="sr-only">Interface language</span>
    <select value={language} onChange={(event) => onChange(event.target.value as UiLanguage)} aria-label="Interface language">
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  </label>
}
