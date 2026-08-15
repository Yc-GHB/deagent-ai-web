import type { Locale } from '../locales'
import { en } from './en'
import { zhCN } from './zh-CN'
import { zhTW } from './zh-TW'
import { ko } from './ko'
import { ru } from './ru'
import type { LocaleMessages, Messages } from './types'

export type { LocaleMessages, Messages }
export { en, zhCN, zhTW, ko, ru }

/** 运行时按 locale 取字典 */
export const messagesByLocale: Record<Locale, LocaleMessages> = {
  en: en as LocaleMessages,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ko,
  ru,
}
