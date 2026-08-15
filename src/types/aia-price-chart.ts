/** AIA 价格图表周期 */
export type AiaChartPeriod = '7D' | '30D' | '90D' | 'ALL'

/** CoinGecko 价格点：[毫秒时间戳, USD 价格] */
export type AiaPricePoint = [number, number]

/** API 响应 */
export interface AiaPriceChartResponse {
  success: boolean
  data?: {
    prices: AiaPricePoint[]
    currentPrice: number
  }
  error?: string
}
