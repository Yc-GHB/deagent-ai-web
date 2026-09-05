/** Token Hub 页展示用的用量 KPI。 */
export interface TokenHubUsageKpis {
  readonly requestsLabel: string
  readonly tokensLabel: string
  readonly tokensUnit: string
  readonly requestDeltaPercent: number | null
  readonly tokenDeltaPercent: number | null
}

/** 柱状图单日柱。 */
export interface TokenHubChartBar {
  readonly day: string
  readonly heightPercent: number
}

/** Token Hub 用量快照：累计 KPI + 近 15 日柱状图。 */
export interface TokenHubUsageSnapshot {
  readonly kpis: TokenHubUsageKpis
  readonly chart: {
    readonly bars: readonly TokenHubChartBar[]
    readonly axis: readonly string[]
    readonly peakValue: string
  }
}
