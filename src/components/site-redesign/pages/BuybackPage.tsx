'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Flame } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { useAiaPriceChart } from '@/hooks/use-aia-price-chart'
import type { AiaChartPeriod } from '@/types/aia-price-chart'
import { buildAiaChartSeries, formatUsdPrice } from '@/utils/aia-price-chart'
import AiaPriceTrendChart from '@/components/pages/buyback/AiaPriceTrendChart'
import LightRays from '../components/LightRays'
import './BuybackPage.css'

const FLYWHEEL_POSITIONS = ['top', 'right', 'bottom', 'left'] as const
const CHART_PERIODS: AiaChartPeriod[] = ['7D', '30D', '90D', 'ALL']
const BURN_MARKER_TIMESTAMPS: number[] = [
  Date.UTC(2026, 6, 22, 5, 7, 28),
  Date.UTC(2026, 3, 13, 7, 58, 58),
]

/** 字典里的 hash 预览 → 完整链上 hash，用于复制 */
const FULL_BURN_HASHES: Record<string, string> = {
  '8G2MPM3s...Z1Nycr': '8G2MPM3sK7zEqax715HqLqAPzTvw6JV5yDUHepZ1Nycr',
  'HBmTxfJy...NPyFpf': 'HBmTxfJymoymJTFSB5qtn4cV2pfd2SYS6PaGd5NPyFpf',
}

function formatShortHash(hash: string): string {
  if (hash.length <= 16) return hash
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

/**
 * Buyback & Burn 追踪页：文案走 i18n，价格图接入真实 AIA 数据。
 */
export default function BuybackPage() {
  const { messages } = useI18n()
  const buyback = messages.buyback
  const {
    hero,
    burnProgress,
    burnHistory,
    mechanism,
    priceTrend,
    value,
    flywheel,
    outcome,
  } = buyback
  const [period, setPeriod] = useState<AiaChartPeriod>('90D')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const { data: priceData, isLoading: isPriceLoading, isError: isPriceError } = useAiaPriceChart(period)
  const chartSeries = useMemo(() => {
    if (!priceData?.prices?.length) return null
    return buildAiaChartSeries(priceData.prices, BURN_MARKER_TIMESTAMPS)
  }, [priceData])

  const handleCopyHash = useCallback(async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopiedHash(hash)
    } catch {
      setCopiedHash('unavailable')
    }
  }, [])

  useEffect(() => {
    if (!copiedHash) return undefined
    const timer = window.setTimeout(() => setCopiedHash(null), 1200)
    return () => window.clearTimeout(timer)
  }, [copiedHash])

  const currentPriceLabel = chartSeries?.currentPrice
    ?? (priceData?.currentPrice != null ? formatUsdPrice(priceData.currentPrice) : null)
    ?? (isPriceLoading ? '...' : '--')

  return (
    <main className="buyback-page" id="top">
      <div className="buyback-main">
        <section className="buyback-intro" aria-labelledby="buyback-title">
          <div className="buyback-rays" aria-hidden="true"><LightRays /></div>
          <header className="buyback-hero buyback-container">
            <h1 id="buyback-title">{hero.title}</h1>
            <p>{hero.copy}</p>
          </header>
          <div className="buyback-metrics buyback-container" aria-label={hero.metricsAria}>
            {hero.metrics.map((metric) => (
              <article className={`buyback-metric ${'accent' in metric && metric.accent ? 'buyback-metric--accent' : ''}`} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                {'note' in metric && metric.note ? <small>{metric.note}</small> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="buyback-progress-wrap buyback-container" id="burn-progress" aria-labelledby="burn-progress-title">
          <article className="buyback-panel buyback-progress-card">
            <header>
              <h2 id="burn-progress-title">{burnProgress.title}</h2>
              <span className="buyback-live"><i /> {burnProgress.live}</span>
            </header>
            <div className="buyback-burn-stats">
              {burnProgress.stats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
            <div className="buyback-progress-track" aria-label={burnProgress.trackAria}><i /></div>
            <div className="buyback-progress-labels">
              {burnProgress.progressLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <aside>
              <strong>{burnProgress.noteStrong}</strong>
              <span>{burnProgress.note}</span>
            </aside>
          </article>
        </section>

        <section className="buyback-history-wrap buyback-container" id="burn-history" aria-labelledby="burn-history-title">
          <article className="buyback-panel buyback-history-card">
            <h2 id="burn-history-title">{burnHistory.title}</h2>
            <div className="buyback-table-wrap">
              <table>
                <thead>
                  <tr>
                    {burnHistory.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {burnHistory.rows.map((row) => {
                    const fullHash = FULL_BURN_HASHES[row.hashPreview] ?? row.hashPreview
                    return (
                      <tr key={row.hashPreview}>
                        <td>{row.date}</td>
                        <td>{row.amount}</td>
                        <td>
                          <span className="buyback-status">
                            <Flame size={14} />
                            {burnHistory.statusConfirmed}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="buyback-hash" onClick={() => { void handleCopyHash(fullHash) }}>
                            {formatShortHash(fullHash)}
                            <ArrowUpRight size={14} />
                            {copiedHash === fullHash ? <em>copied</em> : null}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="buyback-mechanism buyback-container" aria-labelledby="mechanism-title">
          <h2 id="mechanism-title">{mechanism.title}</h2>
          <div className="buyback-mechanism-grid">
            {mechanism.steps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
                {index < mechanism.steps.length - 1 && <ArrowRight className="buyback-step-arrow" size={18} />}
              </article>
            ))}
          </div>
        </section>

        <section className="buyback-chart-wrap buyback-container" aria-labelledby="price-trend-title">
          <article className="buyback-panel buyback-chart-card">
            <header>
              <h2 id="price-trend-title">{priceTrend.title}</h2>
              <div role="group" aria-label={priceTrend.periodAria}>
                {CHART_PERIODS.map((item) => (
                  <button
                    type="button"
                    className={period === item ? 'is-active' : ''}
                    aria-pressed={period === item}
                    onClick={() => setPeriod(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </header>
            <div className="buyback-chart-live">
              {isPriceLoading && <div className="buyback-chart-state">Loading price data...</div>}
              {isPriceError && !isPriceLoading && (
                <div className="buyback-chart-state buyback-chart-state--error">Failed to load price data</div>
              )}
              {chartSeries && !isPriceLoading && (
                <AiaPriceTrendChart points={chartSeries.points} />
              )}
            </div>
            <footer>
              <span><i className="buyback-price-key" /> {priceTrend.legendPrice}</span>
              <span><i className="buyback-event-key" /> {priceTrend.legendBurn}</span>
              <strong>{currentPriceLabel}</strong>
            </footer>
          </article>
        </section>

        <section className="buyback-value buyback-container" aria-labelledby="value-title">
          <header>
            <h2 id="value-title">{value.title}</h2>
            <p>{value.intro}</p>
          </header>
          <div className="buyback-value-grid">
            {value.cards.map((card, index) => (
              <article key={card.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{card.title}</h3>
                <p>{card.lineOne}</p>
                {card.lineTwo ? <p>{card.lineTwo}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="buyback-flywheel-wrap buyback-container" aria-labelledby="flywheel-title">
          <article className="buyback-panel buyback-flywheel-card">
            <h2 id="flywheel-title">{flywheel.title}</h2>
            <div className="buyback-flywheel-visual">
              <div className="buyback-flywheel-ring" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="buyback-flywheel-center">
                <strong>{flywheel.center.token}</strong>
                <span>{flywheel.center.label}</span>
              </div>
              {flywheel.steps.map((step, index) => (
                <article
                  className={`buyback-flywheel-step buyback-flywheel-step--${FLYWHEEL_POSITIONS[index]}`}
                  key={step.number}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="buyback-outcome buyback-container" aria-labelledby="outcome-title">
          <div>
            <span>{outcome.eyebrow}</span>
            <h2 id="outcome-title">{outcome.title}</h2>
          </div>
          <div>
            <p>{outcome.copy}</p>
            <strong>{outcome.strong}</strong>
          </div>
        </section>
      </div>
    </main>
  )
}
