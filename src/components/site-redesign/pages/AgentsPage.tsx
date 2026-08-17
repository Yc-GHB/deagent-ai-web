'use client'

import { FormEvent, useState } from 'react'
import { Mail } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { useScreener } from '@/hooks/use-screener'
import { submitWaitlist } from '@/services/screener-service'
import { ScreenerApiError } from '@/types/screener'
import type { ScreenerGroup } from '@/types/screener'
import {
  SLIDER_MAX,
  buildMarketKey,
  formatChangeLabel,
  formatFundLabel,
  formatMillionsUsd,
  formatSignedPercent,
  formatVolumeLabel,
  toScreenerLocale,
} from '@/utils/screener-format'
import CountUp from '../components/CountUp'
import PixelBlast from '../components/PixelBlast'
import { Toast } from '@/components/ui/Toast'
import './AgentsPage.css'
import './AgentsPageOverrides.css'

const GROUP_KEYS: readonly ScreenerGroup[] = ['all', 'crypto', 'tradfi']

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="agents-eyebrow">{children}</p>
}

const SKELETON_ROW_COUNT = 8

function SentryTableSkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => (
        <tr className="sentry-skeleton-row" key={`skeleton-${rowIndex}`}>
          <td><span className="sentry-skeleton sentry-skeleton--market" /></td>
          <td><span className="sentry-skeleton" /></td>
          <td><span className="sentry-skeleton" /></td>
          <td><span className="sentry-skeleton" /></td>
          <td><span className="sentry-skeleton" /></td>
          <td><span className="sentry-skeleton" /></td>
        </tr>
      ))}
    </>
  )
}

function waitlistErrorCopy(
  error: unknown,
  copy: {
    readonly invalid: string
    readonly rateLimited: string
    readonly unavailable: string
    readonly error: string
  },
): string {
  if (!(error instanceof ScreenerApiError)) return copy.error
  if (error.status === 422) return copy.invalid
  if (error.status === 429) return copy.rateLimited
  if (error.status === 503) return copy.unavailable
  return copy.error
}

/**
 * Agents 产品页：文案全部走 messages.agents。
 */
export default function AgentsPage() {
  const { locale, messages } = useI18n()
  const agents = messages.agents
  const { hero, sentry, dailyPush, comparison, credit, memory, deploy, waitlist } = agents
  const categoryLabels = sentry.matches.categoryLabels
  const screener = useScreener(locale)
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting'>('idle')
  const [toast, setToast] = useState<{ readonly id: number; readonly message: string; readonly type: 'success' | 'error' } | null>(null)
  const run = screener.run
  const markets = screener.markets
  const status = sentry.matches.status
  const marketTotal = markets?.total ?? hero.kpis[0].value
  const marketFootnote = markets
    ? `Crypto ${markets.counts.crypto} · Tradfi ${markets.counts.tradfi}`
    : hero.kpis[0].footnote
  const venueCount = markets?.venuesQueried.length ?? hero.kpis[2].value

  const submitWaitlistForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (waitlistStatus === 'submitting') return
    setWaitlistStatus('submitting')
    try {
      const result = await submitWaitlist({
        email: email.trim(),
        source: 'agents_page',
        locale: toScreenerLocale(locale),
      })
      setToast({
        id: Date.now(),
        message: result.alreadyJoined ? waitlist.alreadyJoined : waitlist.success,
        type: 'success',
      })
    } catch (error) {
      setToast({
        id: Date.now(),
        message: waitlistErrorCopy(error, waitlist),
        type: 'error',
      })
    } finally {
      setWaitlistStatus('idle')
    }
  }

  return (
    <main className="agents-page">

      <section className="agents-hero" id="top">
        <PixelBlast
          className="agents-pixel-blast"
          color="#2e515a"
          pixelSize={6}
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
        <div className="agents-hero-inner">
          <p className="agents-beta"><i /> {hero.beta}</p>
          <h1>{hero.title}</h1>
          <p className="agents-hero-description">{hero.description}</p>
          <div className="agents-kpis">
            <article className="agents-kpi agents-kpi--large">
              <span>{hero.kpis[0].label}</span>
              <strong><CountUp value={marketTotal} /></strong>
              <small>{marketFootnote}</small>
            </article>
            <article className="agents-kpi agents-kpi--large">
              <span>{hero.kpis[1].label}</span>
              <strong><CountUp value={hero.kpis[1].value} duration={2} delay={0.45} /><b className="count-up-unit">{hero.kpis[1].unit}</b></strong>
              <small>{hero.kpis[1].footnote}</small>
            </article>
            <article className="agents-kpi">
              <strong><CountUp value={venueCount} duration={1.2} delay={0.6} /></strong>
              <small>{hero.kpis[2].footnote}</small>
            </article>
            <article className="agents-kpi">
              <strong><CountUp value={hero.kpis[3].value} duration={1.6} delay={0.7} /><em>{hero.kpis[3].unitSuffix}</em></strong>
              <small>{hero.kpis[3].footnote}</small>
            </article>
            <article className="agents-kpi">
              <strong>
                {hero.kpis[4].valueLabel.split(' / ')[0]}{' '}
                <em>/ {hero.kpis[4].valueLabel.split(' / ')[1]}</em>
              </strong>
              <small>{hero.kpis[4].footnote}</small>
            </article>
          </div>
        </div>
      </section>

      <section className="agents-section agents-sentry" id="sentry">
        <Eyebrow>{sentry.eyebrow}</Eyebrow>
        <h2>{sentry.title}</h2>
        <p className="agents-intro">{sentry.intro}</p>
        <div className="sentry-dashboard">
          <aside className="sentry-filter-panel">
            <div className="sentry-filter-title"><b>{sentry.filters.title}</b><span><i /> {sentry.filters.live}</span></div>
            <p className="sentry-mini-title">{sentry.filters.presetTitle}</p>
            <div className="strategy-list">
              {sentry.strategies.map((item, index) => {
                const key = screener.strategies[index]
                const isActive = screener.strategy === key
                return (
                  <button
                    type="button"
                    key={item.title}
                    className={isActive ? 'is-active' : ''}
                    onClick={() => {
                      if (key) screener.selectStrategy(key)
                    }}
                  >
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                    <em>{isActive && run ? String(run.matched) : ''}</em>
                  </button>
                )
              })}
            </div>
            <p className="sentry-mini-title">{sentry.filters.fineTuneTitle}</p>
            <div className="sentry-ranges">
              <label>
                <span>{sentry.filters.ranges[0].label} <b>{formatVolumeLabel(screener.thresholds.vol)}</b></span>
                <input
                  aria-label={sentry.filters.ranges[0].aria}
                  type="range"
                  min={0}
                  max={SLIDER_MAX.vol}
                  step={0.5}
                  value={screener.thresholds.vol}
                  onChange={(event) => screener.setThresholds({ ...screener.thresholds, vol: Number(event.target.value) })}
                />
              </label>
              <label>
                <span>{sentry.filters.ranges[1].label} <b>{formatFundLabel(screener.thresholds.fund)}</b></span>
                <input
                  aria-label={sentry.filters.ranges[1].aria}
                  type="range"
                  min={0}
                  max={SLIDER_MAX.fund}
                  step={0.1}
                  value={screener.thresholds.fund}
                  onChange={(event) => screener.setThresholds({ ...screener.thresholds, fund: Number(event.target.value) })}
                />
              </label>
              <label>
                <span>{sentry.filters.ranges[2].label} <b>{formatChangeLabel(screener.thresholds.chg)}</b></span>
                <input
                  aria-label={sentry.filters.ranges[2].aria}
                  type="range"
                  min={0}
                  max={SLIDER_MAX.chg}
                  step={0.1}
                  value={screener.thresholds.chg}
                  onChange={(event) => screener.setThresholds({ ...screener.thresholds, chg: Number(event.target.value) })}
                />
              </label>
            </div>
            <button
              type="button"
              className={`sentry-outlier ${screener.guard ? 'is-on' : 'is-off'}`}
              aria-pressed={screener.guard}
              onClick={() => screener.setGuard(!screener.guard)}
            >
              <div>
                <b>{sentry.filters.outlierGuard.title}</b>
                <small>{sentry.filters.outlierGuard.description}</small>
              </div>
              <i />
            </button>
          </aside>
          <div className="sentry-matches-panel">
            <div className="sentry-matches-head">
              <b>{sentry.matches.title}</b>
              <div>
                {sentry.matches.tabs.map((tab, index) => (
                  <button
                    type="button"
                    className={screener.group === GROUP_KEYS[index] ? 'selected' : ''}
                    key={tab}
                    onClick={() => screener.setGroup(GROUP_KEYS[index])}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="sentry-match-summary">
              <strong>{run ? String(run.matched) : '—'}</strong>
              <span>{sentry.matches.summary.text}</span>
              <small>
                {sentry.matches.summary.outlierNoteBefore}
                <b>{run ? String(run.guardRemoved) : '—'}</b>
                {sentry.matches.summary.outlierNoteAfter}
              </small>
            </div>
            {run?.stale ? <p className="sentry-status">{status.stale}</p> : null}
            {markets && markets.venuesUnavailable.length > 0 ? (
              <p className="sentry-status">{status.partial}: {markets.venuesUnavailable.join(', ')}</p>
            ) : null}
            {run?.truncated ? <p className="sentry-status">{status.truncated}</p> : null}
            <div className={`sentry-table-wrap ${screener.isRunLoading ? 'is-loading' : ''}`}>
              <table>
                <thead>
                  <tr>
                    {sentry.matches.columns.map((column) => <th key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {screener.hasRunError && !screener.isRunLoading ? (
                    <tr><td colSpan={6}>{status.unavailable}</td></tr>
                  ) : screener.isRunLoading ? (
                    <SentryTableSkeleton />
                  ) : run && run.matched === 0 ? (
                    <tr><td colSpan={6}>{status.empty}</td></tr>
                  ) : (
                    (run?.results ?? []).map((row) => {
                      const category = row.type === 2 ? 'Tradfi' : 'Crypto'
                      const funding = formatSignedPercent(row.fundingAPR)
                      const change = formatSignedPercent(row.change24h)
                      const premium = formatSignedPercent(row.premium)
                      return (
                        <tr key={buildMarketKey(row.dex, row.symbol)} title={row.reason}>
                          <td>
                            <b>{row.symbol}</b>
                            <span className={category.toLowerCase()}>{categoryLabels[category]}</span>
                          </td>
                          <td className={funding.startsWith('-') ? 'down' : 'up'}>{funding}</td>
                          <td className={change.startsWith('-') ? 'down' : 'up'}>{change}</td>
                          <td>{formatMillionsUsd(row.vol24h)}</td>
                          <td>{formatMillionsUsd(row.openInterest)}</td>
                          <td className={premium.startsWith('-') ? 'down' : 'up'}>{premium}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="agents-section daily-push-card">
        <div className="daily-push-copy">
          <span className="coming-soon"><i /> {dailyPush.badge}</span>
          <h2>{dailyPush.title}</h2>
          <p>{dailyPush.copy}</p>
          <ul>
            {dailyPush.features.map((feature) => (
              <li key={feature.title}>
                <b>{feature.title}</b>
                <small>{feature.description}</small>
              </li>
            ))}
          </ul>
          <footer>{dailyPush.channels}</footer>
        </div>
        <div className="sentry-bot">
          <header>
            <b>{dailyPush.bot.name}</b>
            <small>{dailyPush.bot.time}</small>
          </header>
          <p>{dailyPush.bot.message}</p>
          <div className="bot-assets">
            {dailyPush.bot.assets.map((asset) => (
              <div key={asset.symbol}>
                <b>{asset.symbol} <span>{categoryLabels[asset.category as 'Crypto' | 'Tradfi'] ?? asset.category}</span></b>
                <small>{asset.note}</small>
                <strong className={asset.change.startsWith('-') ? 'down' : undefined}>{asset.change}</strong>
              </div>
            ))}
          </div>
          <aside>
            <b>{dailyPush.bot.memory.title}</b>
            <p>{dailyPush.bot.memory.copy}</p>
          </aside>
        </div>
      </section>

      <section className="agents-section agents-comparison">
        <Eyebrow>{comparison.eyebrow}</Eyebrow>
        <h2>{comparison.title}</h2>
        <p className="agents-intro">{comparison.intro}</p>
        <div className="comparison-grid">
          <article>
            <p>{comparison.openSource.title}</p>
            <ol>
              {comparison.openSource.steps.map((step, index) => (
                <li key={step}><i>{index + 1}</i>{step}</li>
              ))}
            </ol>
            <footer>
              {comparison.openSource.footerBefore}
              <b>{comparison.openSource.footerStrong}</b>
              {comparison.openSource.footerAfter}
            </footer>
          </article>
          <article className="comparison-agent">
            <p>{comparison.deagentai.title}</p>
            <ol>
              {comparison.deagentai.steps.map((step, index) => (
                <li key={step}><i>{index + 1}</i>{step}</li>
              ))}
            </ol>
            <footer>{comparison.deagentai.footer}</footer>
          </article>
        </div>
      </section>

      <section className="agents-section agents-credit">
        <Eyebrow>{credit.eyebrow}</Eyebrow>
        <h2>{credit.title}</h2>
        <p className="agents-intro">{credit.intro}</p>
        <div className="credit-table">
          {credit.levels.map((level) => (
            <p key={level.status}>
              <b>{level.status}</b>
              <span>{level.copy}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="agents-section agents-memory">
        <Eyebrow>{memory.eyebrow}</Eyebrow>
        <h2>{memory.title}</h2>
        <p className="agents-intro">{memory.intro}</p>
        <div className="memory-grid">
          <article>
            <header>
              <h3>{memory.remembered.title}</h3>
              <span>{memory.remembered.badge}</span>
            </header>
            <p>{memory.remembered.copy}</p>
            <ul>
              {memory.remembered.items.map((item) => (
                <li key={`${item.before}${item.strong}`}>
                  {item.before}<b>{item.strong}</b>{item.after}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <header>
              <h3>{memory.neverStored.title}</h3>
              <span>{memory.neverStored.badge}</span>
            </header>
            <p>{memory.neverStored.copy}</p>
            <ul>
              {memory.neverStored.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="agents-section agents-deploy" id="deploy">
        <Eyebrow>{deploy.eyebrow}</Eyebrow>
        <div className="deploy-layout">
          <div>
            <h2>{deploy.title}</h2>
            <ol>
              {deploy.steps.map((step, index) => (
                <li key={step.title}>
                  <i>{index + 1}</i>
                  <div>
                    <b>{step.title}</b>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="agents-code-block" aria-label={deploy.codeSample.filename}>
            <div className="agents-code-header">
              <span className="agents-window-controls" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>{deploy.codeSample.filename}</span>
            </div>
            <pre>
              <code>
                <span className="code-comment">{deploy.codeSample.commentRuntime}</span>
                {'\n'}
                <span className="code-import">from</span>
                {' agno.agent '}
                <span className="code-import">import</span>
                {' Agent\n'}
                <span className="code-import">from</span>
                {' agno.models.openai.like '}
                <span className="code-import">import</span>
                {' OpenAILike\n\n'}
                <span className="code-purple">agent = Agent(</span>
                {'\n'}
                <span className="code-cyan">{`  name="${deploy.codeSample.agentName}",`}</span>
                {'\n'}
                <span className="code-cyan">  model=OpenAILike(</span>
                {'\n'}
                <span className="code-cyan">    id=&quot;claude-3-5&quot;,</span>
                {'\n'}
                <span className="code-cyan">    base_url=&quot;https://hub.deagentai.io/v1&quot;,</span>
                {'\n'}
                <span className="code-cyan">    api_key=user_scoped_key,</span>
                {'\n'}
                <span className="code-cyan">  ),</span>
                {'\n'}
                <span className="code-cyan">  tools=[screen_market],</span>
                {'\n'}
                <span className="code-cyan">  instructions=[</span>
                {'\n'}
                <span className="code-cyan">{`    "${deploy.codeSample.instruction}",`}</span>
                {'\n'}
                <span className="code-cyan">  ],</span>
                {'\n'}
                <span className="code-purple">)</span>
                {'\n\n'}
                <span className="code-comment">{deploy.codeSample.commentScreening}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="agents-waitlist" id="waitlist">
        <div className="agents-dot-field" aria-hidden="true" />
        <h2>{waitlist.title}</h2>
        <p>{waitlist.copy}</p>
        <form onSubmit={submitWaitlistForm}>
          <label>
            <Mail size={15} />
            <input
              aria-label={waitlist.emailAria}
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={waitlist.emailPlaceholder}
            />
          </label>
          <button type="submit" disabled={waitlistStatus === 'submitting'}>
            {waitlistStatus === 'submitting' ? waitlist.submitting : waitlist.submit}
          </button>
        </form>
        {toast ? (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        ) : null}
      </section>
    </main>
  )
}
