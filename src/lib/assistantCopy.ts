import type { AssistantMode } from './linguisticsAssistant'
import type { UiLanguage } from './i18n'

type AssistantCopy = {
  title: string
  subtitle: string
  style: string
  close: string
  thinking: string
  error: string
  label: string
  placeholder: string
  send: string
  toggle: string
  modes: Record<AssistantMode, { name: string; note: string; greeting: string }>
}

export const assistantCopy: Record<UiLanguage, AssistantCopy> = {
  en: {
    title: 'Linguistics assistant', subtitle: 'Ask about language', style: 'Answer style', close: 'Close assistant',
    thinking: 'Thinking…', error: 'I could not connect to Gemini. Please try again in a moment.',
    label: 'Your linguistics question', placeholder: 'Why do languages change over time?', send: 'Send', toggle: 'Ask a linguist',
    modes: {
      friendly: { name: 'Friendly', note: 'Warm and explanatory', greeting: 'Hello! Ask me anything about linguistics—from phonetics and grammar to language history and writing systems.' },
      direct: { name: 'Direct', note: 'Concise and focused', greeting: 'Ask a linguistics question. I’ll give you a clear, direct answer.' },
      summary: { name: 'Summary', note: 'Friendly and brief', greeting: 'Hi! Ask a linguistics question and I’ll give you a short, friendly summary.' },
      drLingua: { name: 'Dr. Lingua', note: 'Diagnosis with contempt', greeting: 'Ask the question. I’ll identify the linguistic problem and, regrettably, explain it to you.' },
    },
  },
  ru: {
    title: 'Лингвистический помощник', subtitle: 'Спросите о языке', style: 'Стиль ответа', close: 'Закрыть помощника',
    thinking: 'Думаю…', error: 'Не удалось подключиться к Gemini. Попробуйте ещё раз через минуту.',
    label: 'Ваш вопрос по лингвистике', placeholder: 'Почему языки меняются со временем?', send: 'Отправить', toggle: 'Спросить лингвиста',
    modes: {
      friendly: { name: 'Дружеский', note: 'Тёплый и подробный', greeting: 'Здравствуйте! Спросите меня о лингвистике: фонетике, грамматике, истории языков или письменности.' },
      direct: { name: 'По существу', note: 'Краткий и точный', greeting: 'Задайте вопрос по лингвистике. Я отвечу ясно и по существу.' },
      summary: { name: 'Резюме', note: 'Дружелюбно и сжато', greeting: 'Здравствуйте! Задайте вопрос по лингвистике, и я дам короткое и понятное объяснение.' },
      drLingua: { name: 'Доктор Лингва', note: 'Диагноз с презрением', greeting: 'Задавайте вопрос. Я определю лингвистическую проблему и, к сожалению, объясню её вам.' },
    },
  },
}
