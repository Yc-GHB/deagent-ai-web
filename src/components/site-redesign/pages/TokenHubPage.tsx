'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import {
  siDeepseek,
  siMeta,
  siQwen,
  type SimpleIcon,
} from 'simple-icons'
import { siOpenai } from 'simple-icons-v13'
import { useI18n } from '@/i18n/I18nProvider'
import { useTokenHubLiveKpis } from '@/hooks/use-token-hub-live-kpis'
import { submitWaitlist } from '@/services/screener-service'
import { ScreenerApiError } from '@/types/screener'
import { toScreenerLocale } from '@/utils/screener-format'
import { Toast } from '@/components/ui/Toast'
import TextSphere from '../components/originkit/word-globe'
import './TokenHubPage.css'
import './TokenHubArchitecture.css'

type ModelLogoAsset = {
  readonly title: string
  readonly color?: string
  readonly icon?: SimpleIcon
  readonly image?: string
  readonly plus?: boolean
}

type ModelVisual = {
  readonly share: number
  readonly logo: ModelLogoAsset
}

const MODEL_VISUALS: readonly ModelVisual[] = [
  { share: 34, logo: { title: 'Claude', image: '/model-logos/claude.jpg' } },
  { share: 26, logo: { title: 'OpenAI', icon: siOpenai, color: '#10A37F' } },
  { share: 17, logo: { title: 'Gemini', image: '/model-logos/gemini.png' } },
  { share: 12, logo: { title: 'DeepSeek', icon: siDeepseek, color: '#315FCE' } },
  { share: 6, logo: { title: 'Grok', image: '/model-logos/grok.jpg' } },
  { share: 3, logo: { title: 'Qwen', icon: siQwen, color: '#6950EF' } },
  { share: 1.5, logo: { title: 'Meta', icon: siMeta, color: '#0467DF' } },
]

const MORE_MODEL_VISUAL: ModelVisual = {
  share: 6.5,
  logo: { title: 'More models', plus: true, color: '#16181A' },
}

const MODEL_LAYER_LOGOS: readonly { readonly logos: readonly ModelLogoAsset[] }[] = [
  { logos: [{ title: 'Claude', image: '/model-logos/claude.jpg' }] },
  { logos: [{ title: 'OpenAI', icon: siOpenai, color: '#10A37F' }] },
  { logos: [{ title: 'Gemini', image: '/model-logos/gemini.png' }] },
  { logos: [{ title: 'DeepSeek', icon: siDeepseek, color: '#315FCE' }] },
  { logos: [{ title: 'Grok', image: '/model-logos/grok.jpg' }, { title: 'Qwen', icon: siQwen, color: '#6950EF' }] },
  { logos: [{ title: 'More models', plus: true, color: '#16181A' }] },
]

const HOURLY_BARS: readonly number[] = [58, 64, 47, 57, 65, 70, 47, 57, 49, 58, 53, 45, 27, 20, 24, 42, 56, 55, 47, 61]

const ENTERPRISE_IMAGE_SRC = '/figma-assets/token-hub-new/raw-03.jpeg'
const WAITLIST_BG_SRC = '/figma-assets/token-hub-new/raw-07.png'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="hub-eyebrow">{children}</p>
}

type CountUpProps = {
  readonly value: number
  readonly decimals?: number
  readonly suffix?: string
  readonly suffixSpacing?: boolean
  readonly duration?: number
  readonly delay?: number
}

/**
 * 进入视口后缓动计数。
 */
function CountUp({ value, decimals = 0, suffix = '', suffixSpacing = false, duration = 1600, delay = 0 }: CountUpProps) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number | null>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const element = valueRef.current
    if (!element) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setDisplayValue(value)
      return
    }
    let hasRun = false
    const startAnimation = (): void => {
      if (hasRun) return
      hasRun = true
      const startsAt = performance.now() + delay
      const tick = (now: number): void => {
        if (now < startsAt) {
          frameRef.current = requestAnimationFrame(tick)
          return
        }
        const progress = Math.min((now - startsAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(value * eased)
        if (progress < 1) frameRef.current = requestAnimationFrame(tick)
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startAnimation()
        observer.disconnect()
      }
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [delay, duration, value])

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue)

  return (
    <>
      <span ref={valueRef} className="count-up-value">{formattedValue}</span>
      {suffix ? <span className={`count-up-suffix${suffixSpacing ? ' count-up-suffix--spaced' : ''}`}>{suffix}</span> : null}
    </>
  )
}

function ModelLogo({ icon, title }: { icon: SimpleIcon; title: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${title} logo`}>
      <path d={icon.path} />
    </svg>
  )
}

function ModelLogoVisual({ logo }: { logo: ModelLogoAsset }) {
  if (logo.image) return <img src={logo.image} alt={`${logo.title} logo`} />
  if (logo.plus) return <Plus aria-label="More models" />
  if (logo.icon) return <ModelLogo icon={logo.icon} title={logo.title} />
  return null
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
 * AI Token Hub 产品页（对齐 Handoff 实现：Word Globe、模型 logo、架构流光）。
 */
export default function TokenHubPage() {
  const { locale, messages } = useI18n()
  const tokenHub = messages.tokenHub
  const liveKpis = useTokenHubLiveKpis()
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting'>('idle')
  const [toast, setToast] = useState<{ readonly id: number; readonly message: string; readonly type: 'success' | 'error' } | null>(null)
  const modelCards = [...tokenHub.models.items, tokenHub.models.more].map((item, index) => {
    const visual = MODEL_VISUALS[index] ?? MORE_MODEL_VISUAL
    return { ...item, share: visual.share, logo: visual.logo }
  })

  const submitWaitlistForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (waitlistStatus === 'submitting') return
    setWaitlistStatus('submitting')
    try {
      const result = await submitWaitlist({
        email: email.trim(),
        source: 'token_hub_page',
        locale: toScreenerLocale(locale),
      })
      setToast({
        id: Date.now(),
        message: result.alreadyJoined ? tokenHub.waitlist.alreadyJoined : tokenHub.waitlist.success,
        type: 'success',
      })
    } catch (error) {
      setToast({
        id: Date.now(),
        message: waitlistErrorCopy(error, tokenHub.waitlist),
        type: 'error',
      })
    } finally {
      setWaitlistStatus('idle')
    }
  }

  return (
    <main className="token-hub-page token-hub-page--new" id="top">
      {toast ? <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}

      <section className="hub-hero" aria-labelledby="hub-title">
        <div className="hub-hero-globe" aria-hidden="true">
          <TextSphere
            word="AI TOKEN HUB"
            color="#60777b"
            font={{ fontFamily: 'Geist Mono, monospace', fontWeight: 500, fontSize: 15 }}
            speed={5}
          />
        </div>
        <div className="hub-shell hub-hero-content">
          <h1 id="hub-title">{tokenHub.hero.title}</h1>
          <p>
            {tokenHub.hero.copyBefore}
            <b>{tokenHub.hero.copyStrongAia}</b>
            {tokenHub.hero.copyMiddle}
            <b>{tokenHub.hero.copyStrongUsdt}</b>
            {tokenHub.hero.copyAfter}
            <b>{tokenHub.hero.copyStrongClients}</b>
            {tokenHub.hero.copyEnd}
          </p>
          <div className="hub-kpis">
            <article className="hub-kpi hub-kpi--wide">
              <small>{tokenHub.hero.kpis.totalRequests.label}</small>
              <strong>{liveKpis.requestsLabel}</strong>
              <span>
                <b>▲ <CountUp value={8.4} decimals={1} suffix="%" duration={1250} delay={120} /></b>
                {' '}{tokenHub.hero.kpis.totalRequests.deltaNote}
              </span>
            </article>
            <article className="hub-kpi hub-kpi--wide">
              <small>{tokenHub.hero.kpis.tokensProcessed.label}</small>
              <strong>
                {liveKpis.tokensLabel}
                <span className="count-up-suffix count-up-suffix--spaced">{tokenHub.hero.kpis.tokensProcessed.unit}</span>
              </strong>
              <em>
                <b>▲ <CountUp value={12.1} decimals={1} suffix="%" duration={1250} delay={200} /></b>
                {' '}{tokenHub.hero.kpis.tokensProcessed.deltaNote}
              </em>
            </article>
            <article className="hub-kpi hub-kpi--mini">
              <small>{tokenHub.hero.kpis.mini[0].label}</small>
              <strong><CountUp value={38} delay={160} /></strong>
            </article>
            <article className="hub-kpi hub-kpi--mini">
              <small>{tokenHub.hero.kpis.mini[1].label}</small>
              <strong><CountUp value={260} suffix="+" delay={240} /></strong>
            </article>
            <article className="hub-kpi hub-kpi--mini">
              <small>{tokenHub.hero.kpis.mini[2].label}</small>
              <strong><CountUp value={8} delay={320} /></strong>
            </article>
            <article className="hub-kpi hub-kpi--mini">
              <small>{tokenHub.hero.kpis.mini[3].label}</small>
              <strong><CountUp value={99.97} decimals={2} suffix="%" delay={400} /></strong>
            </article>
          </div>
        </div>
      </section>

      <section className="hub-section hub-track">
        <div className="hub-shell">
          <Eyebrow>{tokenHub.enterprise.eyebrow}</Eyebrow>
          <h2>{tokenHub.enterprise.title}</h2>
          <p className="hub-lede">{tokenHub.enterprise.copy}</p>
          <div className="track-content">
            <figure>
              <img src={ENTERPRISE_IMAGE_SRC} alt="" />
            </figure>
            <div>
              <h3>{tokenHub.enterprise.asideTitle}</h3>
              <p>{tokenHub.enterprise.asideCopy}</p>
              <div className="track-facts">
                {tokenHub.enterprise.facts.map((fact) => (
                  <div key={fact.label}>
                    <b>{fact.value}</b>
                    <span>{fact.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-section hub-usage">
        <div className="hub-shell">
          <Eyebrow>{tokenHub.usage.eyebrow}</Eyebrow>
          <h2>{tokenHub.usage.title}</h2>
          <p className="hub-lede">{tokenHub.usage.copy}</p>
          <div className="usage-grid">
            <article className="usage-card calls-card">
              <header>
                <b>{tokenHub.usage.recentCalls.title}</b>
                <span>{tokenHub.usage.recentCalls.updated}</span>
              </header>
              <div className="calls-list">
                {tokenHub.usage.recentCalls.rows.map((row) => (
                  <div key={`${row.time}-${row.model}`}>
                    <span>{row.time}</span>
                    <span>{row.model}</span>
                    <span>{row.tokens}</span>
                    <span>{row.latency}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="usage-card chart-card" aria-label={tokenHub.usage.chart.title}>
              <header>
                <b>{tokenHub.usage.chart.title}</b>
                <span>{tokenHub.usage.chart.peak}</span>
              </header>
              <div className="bar-chart" role="img" aria-label={tokenHub.usage.chart.title}>
                {HOURLY_BARS.map((bar, index) => (
                  <i aria-hidden="true" key={`bar-${index}`} style={{ height: `${bar}%` }} />
                ))}
              </div>
              <footer>
                {tokenHub.usage.chart.axis.map((label) => <span key={label}>{label}</span>)}
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section className="hub-section hub-models">
        <div className="hub-shell">
          <Eyebrow>{tokenHub.models.eyebrow}</Eyebrow>
          <h2>{tokenHub.models.title}</h2>
          <p className="hub-lede">{tokenHub.models.copy}</p>
          <div className="models-grid">
            {modelCards.map((model) => (
              <article key={model.name}>
                <div className="model-card-head">
                  <div
                    className={`model-mark${model.logo.plus ? ' model-mark--more' : ''}`}
                    style={{ backgroundColor: model.logo.color }}
                  >
                    <ModelLogoVisual logo={model.logo} />
                  </div>
                  <div className="model-copy">
                    <b>{model.name}</b>
                    <span>{model.provider}</span>
                  </div>
                </div>
                <hr />
                <div className="model-bottom">
                  <b>{model.price}</b>
                  <span>{model.volume}</span>
                  <div
                    className="model-progress"
                    role="progressbar"
                    aria-label={`${model.name} hub volume share`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={model.share}
                  >
                    <i style={{ width: `${model.share}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hub-section hub-integration">
        <div className="hub-shell integration-layout">
          <div>
            <Eyebrow>{tokenHub.integration.eyebrow}</Eyebrow>
            <h2>{tokenHub.integration.title}</h2>
            <div className="steps">
              {tokenHub.integration.steps.map((step, index) => (
                <article key={step.title}>
                  <b>{index + 1}</b>
                  <div>
                    <h3>{step.title}</h3>
                    {'copy' in step ? (
                      <p>{step.copy}</p>
                    ) : (
                      <p>
                        {step.copyBefore}
                        <strong>{step.copyStrong}</strong>
                        {step.copyAfter}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="hub-code-block" aria-label={tokenHub.integration.codeAria}>
            <div className="hub-code-header">
              <span className="hub-window-controls" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>{tokenHub.integration.codeFilename}</span>
            </div>
            <pre>
              <code>
                <span className="code-comment"># pip install openai</span>
                {'\n'}
                <span className="code-import">from</span>
                {' openai '}
                <span className="code-import">import</span>
                {' OpenAI\n\n'}
                <span className="code-purple">client = OpenAI(</span>
                {'\n'}
                <span className="code-cyan">{'  base_url="https://hub.deagentai.io/v1",'}</span>
                {'\n'}
                <span className="code-cyan">{'  api_key="dgt-••••••••••••••••",'}</span>
                {'\n'}
                <span className="code-purple">)</span>
                {'\n\n'}
                <span className="code-purple">resp = client.chat.completions.create(</span>
                {'\n'}
                <span className="code-cyan">{'  model="claude-opus-5",'}</span>
                {'\n'}
                <span className="code-cyan">{'  messages=[{"role": "user", "content": "gm"}],'}</span>
                {'\n'}
                <span className="code-purple">)</span>
                {'\n\n'}
                <span className="code-comment"># x-hub-tokens: 42 · x-hub-cost: 0.0009 $AIA</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="hub-section hub-ecosystem">
        <div className="hub-shell">
          <Eyebrow>{tokenHub.ecosystem.eyebrow}</Eyebrow>
          <h2>{tokenHub.ecosystem.title}</h2>
          <p className="hub-lede">{tokenHub.ecosystem.copy}</p>
          <div className="ecosystem-steps">
            {tokenHub.ecosystem.steps.map((step, index) => (
              <article key={step.number}>
                <small>{step.number}</small>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                {index < tokenHub.ecosystem.steps.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
              </article>
            ))}
          </div>
          <div className="architecture">
            <svg className="architecture-flow-lines" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
              <g className="flow-lines flow-lines--inbound">
                <path d="M304 114 C352 114 372 204 420 250" />
                <path d="M304 260 C352 260 372 260 420 260" />
                <path d="M304 406 C352 406 372 316 420 270" />
              </g>
              <g className="flow-lines flow-lines--outbound">
                <path d="M780 250 C828 250 848 96 896 96" />
                <path d="M780 254 C828 254 848 172 896 172" />
                <path d="M780 258 C828 258 848 248 896 248" />
                <path d="M780 262 C828 262 848 324 896 324" />
                <path d="M780 266 C828 266 848 400 896 400" />
                <path d="M780 270 C828 270 848 476 896 476" />
              </g>
              <circle cx="420" cy="260" r="3" />
              <circle cx="780" cy="260" r="3" />
            </svg>
            <div className="architecture-side architecture-side--left">
              <small>{tokenHub.ecosystem.diagram.callersLabel}</small>
              {tokenHub.ecosystem.diagram.callers.map((caller) => (
                <p key={caller.title}>
                  <strong>
                    {caller.title}
                    {'badge' in caller && caller.badge ? <b>{caller.badge}</b> : null}
                  </strong>
                  <span>{caller.copy}</span>
                </p>
              ))}
            </div>
            <div className="architecture-center">
              <small>{tokenHub.ecosystem.diagram.gatewayLabel}</small>
              <div className="architecture-hub">
                <h3>{tokenHub.ecosystem.diagram.hubTitle}</h3>
                <p>{tokenHub.ecosystem.diagram.hubSubtitle}</p>
                <ul>
                  {tokenHub.ecosystem.diagram.hubBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <div>
                  {tokenHub.ecosystem.diagram.hubStats.map((stat) => (
                    <b key={stat.label}>
                      {stat.value}
                      <span>{stat.label}</span>
                    </b>
                  ))}
                </div>
              </div>
            </div>
            <div className="architecture-side architecture-side--right">
              <small>{tokenHub.ecosystem.diagram.modelsLabel}</small>
              {tokenHub.ecosystem.diagram.models.map((label, index) => {
                const layer = MODEL_LAYER_LOGOS[index]
                return (
                  <p key={label}>
                    <span className="architecture-model-logos">
                      {layer?.logos.map((logo) => (
                        <span
                          className={`architecture-model-logo${logo.plus ? ' architecture-model-logo--more' : ''}`}
                          style={{ backgroundColor: logo.color }}
                          key={logo.title}
                        >
                          <ModelLogoVisual logo={logo} />
                        </span>
                      ))}
                    </span>
                    <span className="architecture-model-name">{label}</span>
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="hub-waitlist" id="waitlist">
        <img src={WAITLIST_BG_SRC} alt="" />
        <div>
          <h2>{tokenHub.waitlist.title}</h2>
          <p>{tokenHub.waitlist.copy}</p>
          <form onSubmit={submitWaitlistForm}>
            <input
              aria-label={tokenHub.waitlist.emailAria}
              placeholder={tokenHub.waitlist.emailPlaceholder}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" disabled={waitlistStatus === 'submitting'}>
              {waitlistStatus === 'submitting' ? tokenHub.waitlist.submitting : tokenHub.waitlist.submit}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
