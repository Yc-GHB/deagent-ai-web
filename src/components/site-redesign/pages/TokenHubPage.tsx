'use client'

import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import LetterGlitch from '../components/LetterGlitch'
import './TokenHubPage.css'

const CAPABILITY_IMAGES = [
  '/figma-assets/token-hub-models.png',
  '/figma-assets/token-hub-metering.png',
  '/figma-assets/token-hub-settlement.png',
] as const

function BracketButton({ children, href, secondary = false }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  return (
    <span className={`token-button-wrap ${secondary ? 'token-button-wrap--secondary' : ''}`}>
      <i className="token-corner token-corner--tl" aria-hidden="true" />
      <i className="token-corner token-corner--tr" aria-hidden="true" />
      <i className="token-corner token-corner--bl" aria-hidden="true" />
      <i className="token-corner token-corner--br" aria-hidden="true" />
      <a href={href}>{children}</a>
    </span>
  )
}

export default function TokenHubPage() {
  const { messages } = useI18n()
  const tokenHub = messages.tokenHub
  const capabilities = tokenHub.capabilities.items.map((item, index) => ({
    ...item,
    image: CAPABILITY_IMAGES[index] ?? CAPABILITY_IMAGES[0],
  }))

  return (
    <main className="token-hub-page" id="top">

      <section className="token-hub-hero" aria-labelledby="token-hub-title">
        <LetterGlitch
          className="token-hub-letter-glitch"
          glitchColors={['#151616', '#0d0d1a', '#10232d']}
          glitchSpeed={55}
          smooth
          centerVignette
          outerVignette
        />
        <div className="token-hub-narrow">
          <h1 id="token-hub-title">{tokenHub.hero.title}</h1>
          <p>
            {tokenHub.hero.copyBefore}
            <strong>{tokenHub.hero.copyStrong}</strong>
            {tokenHub.hero.copyAfter}
          </p>
          <div className="token-hub-actions">
            <BracketButton href="#get-started">{tokenHub.hero.ctaEnter}</BracketButton>
          </div>
        </div>
      </section>

      <section className="token-hub-role" aria-labelledby="token-hub-role-title">
        <div className="token-hub-narrow">
          <p className="token-hub-eyebrow">{tokenHub.role.eyebrow}</p>
          <h2 id="token-hub-role-title">{tokenHub.role.title}</h2>
          <div className="token-hub-flow" aria-label={tokenHub.role.flowAria}>
            {tokenHub.role.flow.map((step, index) => (
              <Fragment key={step.title}>
                {index > 0 ? <ArrowRight aria-hidden="true" /> : null}
                <article>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="token-hub-capabilities" id="capabilities" aria-labelledby="token-hub-capabilities-title">
        <div className="token-hub-wide">
          <h2 id="token-hub-capabilities-title">{tokenHub.capabilities.title}</h2>
          <div className="token-capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.title}>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>
                <img src={capability.image} alt="" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="token-hub-cta" id="get-started" aria-labelledby="token-hub-cta-title">
        <div>
          <p className="token-hub-eyebrow">{tokenHub.cta.eyebrow}</p>
          <h2 id="token-hub-cta-title">{tokenHub.cta.title}</h2>
          <p>{tokenHub.cta.copy}</p>
          <BracketButton href="#top">{tokenHub.cta.button}</BracketButton>
        </div>
      </section>
    </main>
  )
}
