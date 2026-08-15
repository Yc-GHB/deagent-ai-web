export type ScreenerStrategy =
  | 'funding_arb'
  | 'low_turnover'
  | 'volume_surge'
  | 'premium_disloc'

export type ScreenerGroup = 'all' | 'crypto' | 'tradfi'

export type ScreenerLocale = 'zh' | 'en'

export interface ScreenerMarket {
  readonly symbol: string
  readonly dex: string
  readonly type: 1 | 2
  readonly fundingAPR: number
  readonly vol24h: number
  readonly openInterest: number
  readonly premium: number
  readonly change24h: number
  readonly maxLeverage: number
}

export interface MarketsResponse {
  readonly updatedAt: string
  readonly stale: boolean
  readonly ageSeconds: number
  readonly total: number
  readonly counts: { readonly crypto: number; readonly tradfi: number }
  readonly venuesQueried: readonly string[]
  readonly venuesUnavailable: readonly string[]
  readonly markets: readonly ScreenerMarket[]
}

export interface ScreenerThresholds {
  readonly vol: number
  readonly fund: number
  readonly chg: number
}

export interface RunQuery {
  readonly strategy: ScreenerStrategy
  readonly group: ScreenerGroup
  readonly vol: number
  readonly fund: number
  readonly chg: number
  readonly guard: boolean
  readonly limit: number
  readonly locale: ScreenerLocale
}

export interface ScreenedMarket extends ScreenerMarket {
  readonly reason: string
}

export interface RunResponse {
  readonly strategy: ScreenerStrategy
  readonly group: ScreenerGroup
  readonly thresholds: ScreenerThresholds
  readonly guard: boolean
  readonly matched: number
  readonly guardRemoved: number
  readonly truncated: boolean
  readonly total: number
  readonly updatedAt: string
  readonly stale: boolean
  readonly ageSeconds: number
  readonly results: readonly ScreenedMarket[]
}

export interface WaitlistRequest {
  readonly email: string
  readonly source: string
  readonly locale: ScreenerLocale
}

export interface WaitlistResponse {
  readonly ok: true
  readonly position: number
  readonly alreadyJoined: boolean
}

export class ScreenerApiError extends Error {
  readonly status: number
  readonly requestId: string | undefined
  readonly retryAfterSeconds: number | undefined

  constructor(input: {
    readonly status: number
    readonly message: string
    readonly requestId?: string
    readonly retryAfterSeconds?: number
  }) {
    super(input.message)
    this.name = 'ScreenerApiError'
    this.status = input.status
    this.requestId = input.requestId
    this.retryAfterSeconds = input.retryAfterSeconds
  }
}
