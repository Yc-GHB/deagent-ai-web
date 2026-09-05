import type { TokenHubChartBar, TokenHubUsageKpis, TokenHubUsageSnapshot } from '@/types/platform-usage'

const TOTAL_PATH = '/v1/platform-usage/total'
const DAILY_PATH = '/v1/platform-usage/daily'
const SUMMARY_PATH = '/v1/admin/platform-usage/summary'
const CHART_DAYS = 15
const WINDOW_MS = 24 * 60 * 60 * 1000 - 1000
const CACHE_TTL_MS = 5 * 60 * 1000
const TRILLION = 1_000_000_000_000
const BILLION = 1_000_000_000
const MILLION = 1_000_000

const usageBaseUrl = (process.env.SCREENER_INTERNAL_BASE_URL || 'https://api-v1.deagent.ai').replace(/\/$/, '')

interface UsageCounts {
  readonly requestCount: number
  readonly tokenCount: number
}

interface UsageDay extends UsageCounts {
  readonly day: string
}

interface UsageDailyResponse {
  readonly days: readonly UsageDay[]
}

interface UsageErrorPayload {
  readonly error?: { readonly message?: string }
}

let cachedSnapshot: { readonly expiresAt: number; readonly value: TokenHubUsageSnapshot } | null = null

function toUtcIso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z')
}

function readSummaryUrl(startTime: Date, endTime: Date): string {
  const params = new URLSearchParams({
    startTime: toUtcIso(startTime),
    endTime: toUtcIso(endTime),
  })
  return `${usageBaseUrl}${SUMMARY_PATH}?${params.toString()}`
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  })
  const payload = (await response.json()) as T & UsageErrorPayload
  if (!response.ok) {
    throw new Error(payload.error?.message || 'Failed to load platform usage')
  }
  return payload
}

function formatCompactCount(value: number): { readonly value: string; readonly unit: string } {
  if (value >= TRILLION) {
    return { value: (value / TRILLION).toFixed(2), unit: 'T' }
  }
  if (value >= BILLION) {
    return { value: (value / BILLION).toFixed(2), unit: 'B' }
  }
  if (value >= MILLION) {
    return { value: (value / MILLION).toFixed(2), unit: 'M' }
  }
  return { value: Math.round(value).toLocaleString('en-US'), unit: '' }
}

function formatPeakValue(tokenCount: number): string {
  const compact = formatCompactCount(tokenCount)
  return compact.unit ? `${compact.value}${compact.unit}` : compact.value
}

function formatAxisDay(day: string): string {
  const parts = day.split('-')
  if (parts.length !== 3) return day
  return `${parts[1]}/${parts[2]}`
}

function readDeltaPercent(current: number, previous: number): number | null {
  if (previous <= 0) return null
  return ((current - previous) / previous) * 100
}

function readChartDays(days: readonly UsageDay[]): readonly UsageDay[] {
  if (days.length <= CHART_DAYS) return days
  return days.slice(days.length - CHART_DAYS)
}

function readChartBars(days: readonly UsageDay[]): readonly TokenHubChartBar[] {
  const peak = days.reduce((max, day) => Math.max(max, day.tokenCount), 0)
  if (peak <= 0) {
    return days.map(day => ({ day: day.day, heightPercent: 0 }))
  }
  return days.map(day => ({
    day: day.day,
    heightPercent: Math.max(4, Math.round((day.tokenCount / peak) * 100)),
  }))
}

function readChartAxis(days: readonly UsageDay[]): readonly string[] {
  if (days.length === 0) return []
  if (days.length === 1) return [formatAxisDay(days[0].day)]
  const last = days.length - 1
  return [
    formatAxisDay(days[0].day),
    formatAxisDay(days[Math.floor(last / 3)].day),
    formatAxisDay(days[Math.floor((last * 2) / 3)].day),
    formatAxisDay(days[last].day),
  ]
}

function buildKpis(total: UsageCounts, previousDay: UsageDay | null, lastDay: UsageDay | null): TokenHubUsageKpis {
  const tokens = formatCompactCount(total.tokenCount)
  return {
    requestsLabel: total.requestCount.toLocaleString('en-US'),
    tokensLabel: tokens.value,
    tokensUnit: tokens.unit,
    requestDeltaPercent: previousDay && lastDay ? readDeltaPercent(lastDay.requestCount, previousDay.requestCount) : null,
    tokenDeltaPercent: previousDay && lastDay ? readDeltaPercent(lastDay.tokenCount, previousDay.tokenCount) : null,
  }
}

async function fetchLatestSummary(): Promise<UsageCounts | null> {
  const endTime = new Date()
  const startTime = new Date(Date.now() - WINDOW_MS)
  try {
    return await fetchJson<UsageCounts>(readSummaryUrl(startTime, endTime))
  } catch {
    return null
  }
}

/**
 * 总量用 /total（每日 00:10），柱状图用 /daily 近 15 天，summary 作环比兜底。
 */
export async function readTokenHubUsageKpis(): Promise<TokenHubUsageSnapshot> {
  const now = Date.now()
  if (cachedSnapshot && cachedSnapshot.expiresAt > now) return cachedSnapshot.value
  const [total, daily, summary] = await Promise.all([
    fetchJson<UsageCounts>(`${usageBaseUrl}${TOTAL_PATH}`),
    fetchJson<UsageDailyResponse>(`${usageBaseUrl}${DAILY_PATH}?days=${CHART_DAYS}`),
    fetchLatestSummary(),
  ])
  const chartDays = readChartDays(daily.days)
  const lastDay = chartDays.length > 0 ? chartDays[chartDays.length - 1] : null
  const previousDay = chartDays.length > 1 ? chartDays[chartDays.length - 2] : null
  const deltaLast = lastDay ?? (summary ? { day: '', ...summary } : null)
  const peakTokens = chartDays.reduce((max, day) => Math.max(max, day.tokenCount), 0)
  const value: TokenHubUsageSnapshot = {
    kpis: buildKpis(total, previousDay, deltaLast),
    chart: {
      bars: readChartBars(chartDays),
      axis: readChartAxis(chartDays),
      peakValue: formatPeakValue(peakTokens),
    },
  }
  cachedSnapshot = { expiresAt: now + CACHE_TTL_MS, value }
  return value
}
