'use client'

import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import SideRays from '../components/SideRays'
import './SolutionsPage.css'

const CAPABILITY_ICONS = ['◎', '◈', '⇄'] as const

function CornerButton({ children, href, secondary = false }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  return (
    <span className={`solutions-button-wrap ${secondary ? 'solutions-button-wrap--secondary' : ''}`}>
      <i className="solutions-corner solutions-corner--tl" />
      <i className="solutions-corner solutions-corner--tr" />
      <i className="solutions-corner solutions-corner--bl" />
      <i className="solutions-corner solutions-corner--br" />
      <a href={href}>{children}</a>
    </span>
  )
}

export default function SolutionsPage() {
  const { messages } = useI18n()
  const solutions = messages.solutions
  const guarantees = solutions.how.guarantees
  const capabilities = solutions.capabilities.items.map((item, index) => ({
    ...item,
    icon: CAPABILITY_ICONS[index] ?? CAPABILITY_ICONS[0],
  }))
  const useCases = solutions.useCases.items
  const codeComments = solutions.integration.codeComments

  return (
    <main className="solutions-page" id="top">

      <section className="solutions-hero" aria-labelledby="solutions-title">
        <SideRays
          className="solutions-side-rays"
          speed={2.5}
          rayColor1="#00CCD6"
          rayColor2="#96C8FF"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.25}
          blend={0.75}
          falloff={1.6}
          opacity={0.82}
        />
        <div className="solutions-container">
          <div className="solutions-hero-copy">
            <h1 id="solutions-title">{solutions.hero.title}</h1>
            <p>
              {solutions.hero.copyBefore}
              <strong>{solutions.hero.copyStrong1}</strong>
              {solutions.hero.copySep1}
              <strong>{solutions.hero.copyStrong2}</strong>
              {solutions.hero.copySep2}
              <strong>{solutions.hero.copyStrong3}</strong>
              {solutions.hero.copyAfter}
            </p>
          </div>
          <div className="solutions-actions">
            <CornerButton href="#credentials">{solutions.hero.ctaContact}</CornerButton>
          </div>
        </div>
      </section>

      <section className="solutions-section solutions-how" id="how-it-works" aria-labelledby="how-title">
        <div className="solutions-container">
          <header className="solutions-section-header">
            <h2 id="how-title">{solutions.how.title}</h2>
            <p>{solutions.how.intro}</p>
          </header>
          <div className="solutions-guarantee-flow">
            {guarantees.map((item, index) => (
              <div className="solutions-guarantee-item" key={item.step}>
                <article className={`solutions-guarantee-card solutions-guarantee-card--${index + 1}`}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
                {index < guarantees.length - 1 && <ArrowRight aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-section solutions-capabilities" aria-labelledby="capabilities-title">
        <div className="solutions-container">
          <header className="solutions-section-header solutions-section-header--compact">
            <h2 id="capabilities-title">{solutions.capabilities.title}</h2>
          </header>
          <div className="solutions-capability-grid">
            {capabilities.map((item) => (
              <article key={item.title}>
                <span className="solutions-capability-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-section solutions-use-cases" aria-labelledby="cases-title">
        <div className="solutions-container">
          <header className="solutions-section-header">
            <h2 id="cases-title">{solutions.useCases.title}</h2>
            <p>{solutions.useCases.intro}</p>
          </header>
          <div className="solutions-use-grid">
            {useCases.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-section solutions-integration" id="integration" aria-labelledby="integration-title">
        <div className="solutions-container solutions-integration-layout">
          <div className="solutions-integration-copy">
            <h2 id="integration-title">{solutions.integration.title}</h2>
            <p>{solutions.integration.intro}</p>
            <ul>
              {solutions.integration.points.map((point) => (
                <li key={point.strong}>
                  <strong>{point.strong}</strong>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="solutions-code-block" aria-label={solutions.integration.codeAria}>
            <div className="solutions-code-header"><span className="solutions-window-controls"><i /><i /><i /></span><span>{solutions.integration.codeFilename}</span></div>
            <pre><code><span className="code-comment">{codeComments[0]}</span>{'\n'}<span className="code-import">import</span> deagentai{'\n\n'}<span className="code-purple">client = deagentai.Client(api_key=&quot;...&quot;)</span>{'\n\n'}<span className="code-comment">{codeComments[1]}</span>{'\n'}<span className="code-purple">result = client.agent.decide(</span>{'\n'}<span className="code-cyan">  capability=&quot;prediction&quot;,</span>{'\n'}<span className="code-cyan">  context={'{'} &quot;domain&quot;: &quot;match&quot;, ... {'}'},</span>{'\n'}<span className="code-purple">)</span>{'\n\n'}<span className="code-comment">{codeComments[2]}</span>{'\n'}<span className="code-purple">print(result.decision, result.confidence)</span></code></pre>
          </div>
        </div>
      </section>

      <section className="solutions-credentials" id="credentials" aria-labelledby="credentials-title">
        <div>
          <h2 id="credentials-title">{solutions.credentials.title}</h2>
          <p>{solutions.credentials.copy}</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="solutions-contact">{solutions.credentials.inputLabel}</label>
            <input id="solutions-contact" type="text" placeholder={solutions.credentials.inputPlaceholder} />
            <button type="submit">{solutions.credentials.submit}</button>
          </form>
        </div>
      </section>
    </main>
  )
}
