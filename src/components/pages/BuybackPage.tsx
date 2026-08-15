'use client'

import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useAiaPriceChart } from '@/hooks/use-aia-price-chart'
import type { AiaChartPeriod } from '@/types/aia-price-chart'
import { buildAiaChartSeries } from '@/utils/aia-price-chart'
import AiaPriceTrendChart from '@/components/pages/buyback/AiaPriceTrendChart'

interface BurnRecord {
  date: string
  amount: string
  hash: string
  confirmed: boolean
}

const TOTAL_BUYBACK_USD = '$5,000,127'
const TOTAL_AIA_ACQUIRED = '47.62M'
const AVG_BUYBACK_PRICE = '$0.1050'
const SUPPLY_REMOVED = '4.76%'
const TOTAL_BURNED = '11M'
const BURN_PROGRESS_PERCENT = 23.1
const REMAINING_SUPPLY = '36.62M'

const BURNS: BurnRecord[] = [
  {
    date: 'Jul 22, 2026',
    amount: '10.00M',
    hash: '8G2MPM3sK7zEqax715HqLqAPzTvw6JV5yDUHepZ1Nycr',
    confirmed: true,
  },
  {
    date: 'Apr 13, 2026',
    amount: '1.00M',
    hash: 'HBmTxfJymoymJTFSB5qtn4cV2pfd2SYS6PaGd5NPyFpf',
    confirmed: true,
  },
]

const BURN_MARKER_TIMESTAMPS: number[] = [
  Date.UTC(2026, 6, 22, 5, 7, 28),
  Date.UTC(2026, 3, 13, 7, 58, 58),
]

const CHART_PERIODS: AiaChartPeriod[] = ['7D', '30D', '90D', 'ALL']

function formatShortHash(hash: string): string {
  if (hash.length <= 16) {
    return hash
  }
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

const BuybackPage: FC = () => {
  const [activePeriod, setActivePeriod] = useState<AiaChartPeriod>('90D')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const { data: priceData, isLoading: isPriceLoading, isError: isPriceError } = useAiaPriceChart(activePeriod)
  const chartSeries = useMemo(() => {
    if (!priceData?.prices?.length) {
      return null
    }
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
    if (!copiedHash) return
    const timer = window.setTimeout(() => setCopiedHash(null), 1200)
    return () => window.clearTimeout(timer)
  }, [copiedHash])

  return (
    <div className="buyback-page">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/buyback/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-image"
        />
        <div className="hero-overlay" />
        <div className="hero-mask" />
        <div className="hero-copy">
          <h1 id="hero-title">AIA Buyback &amp; Burn Tracker</h1>
          <p>Transparent buybacks, verifiable burns, and sustainable token economics in real time.</p>
        </div>
      </section>

      <div className="tracker-shell" id="tracker">
        <section className="metrics-grid" aria-label="Key token metrics">
          <article className="metric-card">
            <span>Total spent</span>
            <strong>{TOTAL_BUYBACK_USD}</strong>
          </article>
          <article className="metric-card">
            <span>Total AIA acquired</span>
            <strong>{TOTAL_AIA_ACQUIRED}</strong>
          </article>
          <article className="metric-card">
            <span>Avg. buyback price</span>
            <strong>{AVG_BUYBACK_PRICE}</strong>
          </article>
          <article className="metric-card">
            <span>Supply removed</span>
            <strong>{SUPPLY_REMOVED}</strong>
            <small>Of initial supply</small>
          </article>
          <article className="metric-card metric-card--burn">
            <span>Total burned</span>
            <strong>{TOTAL_BURNED}</strong>
          </article>
        </section>

        <section className="panel burn-panel" aria-labelledby="burn-progress-title">
          <div className="section-heading">
            <div>
              <h2 id="burn-progress-title">Burn progress</h2>
            </div>
            <span className="live-badge">
              <i /> LIVE
            </span>
          </div>
          <div className="burn-progress">
            <div className="progress-summary">
              <div>
                <span>of acquired AIA burned</span>
                <strong>{BURN_PROGRESS_PERCENT}%</strong>
              </div>
              <div>
                <span>AIA burned</span>
                <strong>{TOTAL_BURNED}</strong>
              </div>
              <div>
                <span>AIA pending burn</span>
                <strong>{REMAINING_SUPPLY}</strong>
              </div>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={47.62}
              aria-valuenow={11}
              aria-label="AIA burned"
            >
              <span className="progress-fill">
                <b>{TOTAL_BURNED}</b>
              </span>
              <em>{TOTAL_AIA_ACQUIRED}</em>
            </div>
          </div>
          <p className="panel-note">
            Buybacks are executed off-chain via centralized exchange.
            <br />
            A portion is burned every 3 months on-chain—see the burn history below for transaction hashes, updated after each quarterly burn event.
          </p>
        </section>

        <section className="panel history-panel" id="history" aria-labelledby="burn-history-title">
          <div className="section-heading">
            <div>
              <h2 id="burn-history-title">Burn history</h2>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>AIA burned</th>
                  <th>Status</th>
                  <th>Burn hash</th>
                </tr>
              </thead>
              <tbody>
                {BURNS.map((burn) => (
                  <tr key={burn.hash}>
                    <td>{burn.date}</td>
                    <td>🔥 {burn.amount}</td>
                    <td>
                      <span className="status">Confirmed</span>
                    </td>
                    <td>
                      <button
                        className="hash-button"
                        type="button"
                        onClick={() => handleCopyHash(burn.hash)}
                      >
                        {copiedHash === burn.hash
                          ? 'COPIED'
                          : copiedHash === 'unavailable'
                            ? 'COPY UNAVAILABLE'
                            : `${formatShortHash(burn.hash)} ↗`}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mechanism-section" id="mechanism" aria-labelledby="mechanism-title">
          <div className="section-heading">
            <div>
              <h2 id="mechanism-title">How the mechanism works</h2>
            </div>
          </div>
          <div className="steps-grid">
            <article className="mechanism-step">
              <b>1</b>
              <div>
                <h3>Revenue collection</h3>
                <p>Protocol fees, AI trading profits, and business revenue fund continuous buybacks sustainably.</p>
              </div>
            </article>
            <article className="mechanism-step">
              <b>2</b>
              <div>
                <h3>Allocation to pool</h3>
                <p>Majority of revenue flows to dedicated buyback fund automatically.</p>
              </div>
            </article>
            <article className="mechanism-step">
              <b>3</b>
              <div>
                <h3>Market acquisition</h3>
                <p>Market acquisitions executed with full transparency and multi-sig security.</p>
              </div>
            </article>
            <article className="mechanism-step mechanism-step--accent">
              <b>4</b>
              <div>
                <h3>Permanent burn</h3>
                <p>Repurchased AIA is held in disclosed custody and burned according to the published burn schedule.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="panel trend-panel" aria-labelledby="trend-title">
          <div className="section-heading">
            <div>
              <h2 id="trend-title">AIA price trend</h2>
            </div>
            <div className="periods" aria-label="Chart period">
              {CHART_PERIODS.map((period) => (
                <button
                  key={period}
                  className={`period${activePeriod === period ? ' is-active' : ''}`}
                  type="button"
                  data-period={period}
                  onClick={() => setActivePeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-wrap">
            {isPriceLoading && (
              <div className="chart-state chart-state--loading">Loading price data...</div>
            )}
            {isPriceError && !isPriceLoading && (
              <div className="chart-state chart-state--error">Failed to load price data</div>
            )}
            {chartSeries && !isPriceLoading && (
              <AiaPriceTrendChart points={chartSeries.points} />
            )}
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-line" />
              AIA price
            </span>
            <span>
              <i className="legend-burn" />
              Burn event
            </span>
            <strong>
              Current: <b>{chartSeries?.currentPrice ?? (isPriceLoading ? '...' : '--')}</b>
            </strong>
          </div>
        </section>

        <section className="impact-section" aria-labelledby="impact-title">
          <div className="section-heading">
            <div>
              <h2 id="impact-title">Why AIA matters</h2>
              <p className="section-subtitle">Utility-driven demand meets deflationary supply mechanics.</p>
            </div>
          </div>
          <div className="impact-grid">
            <article>
              <b>1</b>
              <h3>Revenue Pool</h3>
              <p>funds from agents &amp; enterprises<br />Payments in USDC, stablecoins, or AIA</p>
            </article>
            <article>
              <b>2</b>
              <h3>Buyback Engine</h3>
              <p>Programmatic market acquisitions<br />Correlated with agent activity growth</p>
            </article>
            <article>
              <b>3</b>
              <h3>Staking Layer</h3>
              <p>Voluntary supply lock-up<br />Independent scarcity mechanism</p>
            </article>
            <article>
              <b>4</b>
              <h3>Deflationary Design</h3>
              <p>Scheduled burns permanently reduce supply
              </p>
            </article>
          </div>
        </section>

        <section className="panel flywheel-panel" aria-labelledby="flywheel-title">
          <div className="section-heading">
            <div>
              <h2 id="flywheel-title">The deflationary flywheel</h2>
            </div>
          </div>
          <div className="flywheel">
            <div className="flywheel-ring" />
            <div className="flywheel-core">
              AIA
              <br />
              <span>flywheel</span>
            </div>
            <div className="flywheel-node node-one">
              <b>1</b>
              <span>
                Agent Deployment
                <small>More autonomous agents come online</small>
              </span>
            </div>
            <div className="flywheel-node node-two">
              <b>2</b>
              <span>
                AIA Consumption
                <small>Every agent needs AIA for operations</small>
              </span>
            </div>
            <div className="flywheel-node node-three">
              <b>3</b>
              <span>
                Revenue → Burn
                <small>Fees automatically fund buyback &amp; burn</small>
              </span>
            </div>
            <div className="flywheel-node node-four">
              <b>4</b>
              <span>
                Permanent Removal
                <small>Tokens gone forever from supply</small>
              </span>
            </div>
          </div>
        </section>

        <section className="outcome-section">
          <p className="eyebrow">The outcome</p>
          <h2>AIA holders benefit alongside autonomous agent proliferation.</h2>
          <p>
            Repurchased AIA will burn according to the published burn schedule.
          </p>
          <p>
            The mechanism is transparent, automated, and enforced by protocol architecture.
          </p>
          <strong>Sustainable growth. Aligned value. Structural supply mechanics.</strong>
        </section>

        <section className="community-section" id="community" aria-labelledby="community-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMMUNITY</p>
              <h2 id="community-title">Stay connected</h2>
            </div>
          </div>
          <div className="community-grid">
            <a className="community-card" href="https://x.com/DeAgentAI" target="_blank" rel="noreferrer">
              <Image src="/images/twitter-logo.svg" alt="" width={35} height={35} />
              <span>
                <b>X (Twitter)</b>
                <small>Follow for latest protocol updates</small>
              </span>
              <em>FOLLOW</em>
            </a>
            <a className="community-card" href="https://discord.com/invite/officialdeagentai" target="_blank" rel="noreferrer">
              <Image src="/images/discord-logo.svg" alt="" width={35} height={35} />
              <span>
                <b>Discord</b>
                <small>Join the community and coordinate with builders</small>
              </span>
              <em>JOIN</em>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BuybackPage
