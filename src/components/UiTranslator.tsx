import { useEffect } from 'react'
import { translateUi, type UiLanguage } from '../lib/i18n'

interface Props { language: UiLanguage }
const originalText = new WeakMap<Text, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()
const attributes = ['placeholder', 'title', 'aria-label']

export function UiTranslator({ language }: Props) {
  useEffect(() => {
    document.documentElement.lang = language
    const translate = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      let node = walker.nextNode() as Text | null
      while (node) {
        if (node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
          if (!originalText.has(node)) originalText.set(node, node.data)
          node.data = translateUi(originalText.get(node) ?? node.data, language)
        }
        node = walker.nextNode() as Text | null
      }
      const elements = root instanceof Element ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')]
      elements.forEach((element) => attributes.forEach((attribute) => {
        const value = element.getAttribute(attribute)
        if (!value) return
        if (!originalAttributes.has(element)) originalAttributes.set(element, new Map())
        const originals = originalAttributes.get(element)!
        if (!originals.has(attribute)) originals.set(attribute, value)
        element.setAttribute(attribute, translateUi(originals.get(attribute)!, language))
      }))
    }
    translate(document.body)
    const observer = new MutationObserver((records) => records.forEach((record) => {
      if (record.type === 'characterData' && record.target instanceof Text) {
        const node = record.target
        const previous = originalText.get(node)
        if (!previous || node.data !== translateUi(previous, language)) originalText.set(node, node.data)
        const translated = translateUi(originalText.get(node)!, language)
        if (node.data !== translated) node.data = translated
      }
      record.addedNodes.forEach((node) => {
        if (node instanceof Text) {
          if (!originalText.has(node)) originalText.set(node, node.data)
          node.data = translateUi(originalText.get(node)!, language)
        } else if (node instanceof Element) translate(node)
      })
    }))
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [language])
  return null
}
