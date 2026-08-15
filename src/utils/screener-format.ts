import type { Locale } from '@/i18n/locales'
import type { ScreenerLocale, ScreenerStrategy, ScreenerThresholds } from '@/types/screener'

export const SCREENER_STRATEGIES: readonly ScreenerStrategy[] = [
  'funding_arb',
  'low_turnover',
  'volume_surge',
  'premium_disloc',
] as const

export const STRATEGY_DEFAULTS: Record<ScreenerStrategy, ScreenerThresholds> = {
  funding_arb: { vol: 3, fund: 1.5, chg: 0 },
  low_turnover: { vol: 3, fund: 0, chg: 0 },
  volume_surge: { vol: 5, fund: 0, chg: 2 },
  premium_disloc: { vol: 3, fund: 0, chg: 0 },
}

export const SLIDER_MAX = {
  vol: 50,
  fund: 20,
  chg: 20,
} as const

/**
 * 站点 locale 映射到 screener 接口支持的 zh / en。
 */
export function toScreenerLocale(locale: Locale): ScreenerLocale {
  return locale === 'zh-CN' || locale === 'zh-TW' ? 'zh' : 'en'
}

/**
 * 市场唯一键：dex + symbol。
 */
export function buildMarketKey(dex: string, symbol: string): string {
  return `${dex}:${symbol}`
}

/**
 * 格式化百分数字段；接口值已是百分数，不再乘 100。
 */
export function formatSignedPercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * 将百万美元格式化为 $M / $B。
 */
export function formatMillionsUsd(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`
  return `$${value.toFixed(1)}M`
}

export function formatVolumeLabel(vol: number): string {
  return `$${vol}M`
}

export function formatFundLabel(fund: number): string {
  return `≥ ${fund}%`
}

export function formatChangeLabel(chg: number): string {
  return `${chg}%`
}
