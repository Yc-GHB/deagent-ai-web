/** 站点支持的语言标识 */
export const LOCALES = ['en', 'zh-CN', 'zh-TW', 'ko', 'ru'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** localStorage 持久化键 */
export const LOCALE_STORAGE_KEY = 'deagent-locale'

export interface LocaleMeta {
  readonly code: Locale
  readonly label: string
  readonly short: string
}

/** 语言切换器展示信息 */
export const LOCALE_META: readonly LocaleMeta[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-CN', label: '简体中文', short: '简' },
  { code: 'zh-TW', label: '繁體中文', short: '繁' },
  { code: 'ko', label: '한국어', short: '한' },
  { code: 'ru', label: 'Русский', short: 'RU' },
]

/**
 * 判断字符串是否为受支持的 locale。
 */
export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value))
}

/**
 * 将浏览器语言映射到站点 locale。
 */
export function matchBrowserLocale(language: string): Locale {
  const normalized = language.toLowerCase()
  if (normalized.startsWith('zh')) {
    if (normalized.includes('tw') || normalized.includes('hk') || normalized.includes('hant')) return 'zh-TW'
    return 'zh-CN'
  }
  if (normalized.startsWith('ko')) return 'ko'
  if (normalized.startsWith('ru')) return 'ru'
  return DEFAULT_LOCALE
}

/**
 * 读取已持久化的 locale；无效则返回 null。
 */
export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

/**
 * 持久化 locale。
 */
export function writeStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // 隐私模式等场景下忽略写入失败
  }
}
