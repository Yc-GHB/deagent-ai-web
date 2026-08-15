'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  DEFAULT_LOCALE,
  matchBrowserLocale,
  readStoredLocale,
  writeStoredLocale,
  type Locale,
} from './locales'
import { messagesByLocale, type Messages } from './messages'

interface I18nContextValue {
  readonly locale: Locale
  readonly messages: Messages
  readonly setLocale: (locale: Locale) => void
  readonly t: (path: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

/**
 * 按点路径读取嵌套消息；找不到则返回 undefined。
 */
function readPath(root: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    return (current as Record<string, unknown>)[segment]
  }, root)
}

/**
 * 将消息值规范为可展示字符串。
 */
function toDisplayString(value: unknown, path: string): string {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return path
}

/**
 * 解析首屏 locale：优先 localStorage，其次浏览器语言，默认英文。
 */
function resolveInitialLocale(): Locale {
  const stored = readStoredLocale()
  if (stored) {
    return stored
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return matchBrowserLocale(navigator.language)
  }
  return DEFAULT_LOCALE
}

/**
 * 全站站内多语言 Provider：不改 URL，语言持久化到 localStorage。
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const next = resolveInitialLocale()
    setLocaleState(next)
    document.documentElement.lang = next
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    writeStoredLocale(next)
    document.documentElement.lang = next
  }, [])

  const messages = (messagesByLocale[locale] ?? messagesByLocale[DEFAULT_LOCALE]) as Messages

  const t = useCallback((path: string): string => {
    const primary = readPath(messages, path)
    if (primary !== undefined) {
      return toDisplayString(primary, path)
    }
    const fallback = readPath(messagesByLocale[DEFAULT_LOCALE], path)
    return toDisplayString(fallback, path)
  }, [messages])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    messages,
    setLocale,
    t,
  }), [locale, messages, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/**
 * 读取多语言上下文。
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n 必须在 I18nProvider 内使用')
  }
  return context
}

export type { Messages }
