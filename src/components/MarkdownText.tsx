import { Fragment, type ReactNode } from 'react'

function formatInline(text: string): ReactNode[] {
  const readableText = text
    .replace(/\$?\\rightarrow\$?/g, '→')
    .replace(/\$?\\leftarrow\$?/g, '←')
    .replace(/\$?\\leftrightarrow\$?/gi, '↔')
    .replace(/\$?\\Rightarrow\$?/g, '⇒')
    .replace(/\$?\\Leftarrow\$?/g, '⇐')
  const parts = readableText.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}

export function MarkdownText({ text }: { text: string }) {
  return <div className="markdown-text">
    {text.split('\n').map((line, index) => {
      const heading = /^(#{1,3})\s+(.+)$/.exec(line)
      if (heading) {
        const content = formatInline(heading[2])
        if (heading[1].length === 1) return <h2 key={index}>{content}</h2>
        if (heading[1].length === 2) return <h3 key={index}>{content}</h3>
        return <h4 key={index}>{content}</h4>
      }
      return line ? <p key={index}>{formatInline(line)}</p> : <br key={index} />
    })}
  </div>
}
