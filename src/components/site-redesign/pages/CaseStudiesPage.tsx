'use client'

import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import LightRays from '../components/LightRays'
import './CaseStudiesPage.css'

const RESULT_IMAGES = [
  '/figma-assets/case-result-predictions.png',
  '/figma-assets/case-result-calls.png',
  '/figma-assets/case-result-buzz.png',
] as const

const PRODUCT_IMAGES = [
  '/aliceAI/alice_1.png',
  '/aliceAI/alice_2.png',
  '/aliceAI/alice_3.png',
] as const

/** Integrations 页合作视频 */
const COLLABORATION_VIDEO_ID = '1K451z6K97o' as const

/**
 * 生成 YouTube 嵌入地址。
 */
function buildYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

function BulletCard({ label, title, items, tone }: { label: string; title: string; items: readonly string[]; tone: 'gold' | 'cyan' }) {
  return (
    <article className={`case-bullet-card case-bullet-card--${tone}`}>
      <span className="case-card-label">{label}</span>
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  )
}

export default function CaseStudiesPage() {
  const { messages } = useI18n()
  const caseStudies = messages.caseStudies
  const technicalPath = caseStudies.path.steps
  const results = caseStudies.results.items.map((item, index) => ({
    ...item,
    image: RESULT_IMAGES[index] ?? RESULT_IMAGES[0],
  }))
  const productScreens = caseStudies.product.screens
  const featureMeta = caseStudies.hero.feature.meta

  return (
    <main className="case-page" id="top">

      <section className="case-hero" aria-labelledby="case-page-title">
        <LightRays
          className="case-light-rays"
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
        <div className="case-container case-hero-content">
          <header className="case-page-header">
            <h1 id="case-page-title">{caseStudies.hero.title}</h1>
          </header>

          <article className="case-feature-card">
            <h2>{caseStudies.hero.feature.title}</h2>
            <p>{caseStudies.hero.feature.copy}</p>
            <dl>
              {featureMeta.map((item, index) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>
                    {index === 0 ? <img src="/figma-assets/case-alice-logo.svg" alt="" /> : null}
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <section className="case-section case-problem" aria-labelledby="problem-title">
        <div className="case-container">
          <h2 id="problem-title">{caseStudies.problem.title}</h2>
          <div className="case-two-card-grid">
            <BulletCard
              label={caseStudies.problem.constraints.label}
              title={caseStudies.problem.constraints.title}
              items={caseStudies.problem.constraints.items}
              tone="gold"
            />
            <BulletCard
              label={caseStudies.problem.interface.label}
              title={caseStudies.problem.interface.title}
              items={caseStudies.problem.interface.items}
              tone="cyan"
            />
          </div>
        </div>
      </section>

      <section className="case-section case-path" aria-labelledby="path-title">
        <div className="case-container">
          <header className="case-section-header">
            <h2 id="path-title">{caseStudies.path.title}</h2>
          </header>
          <div className="case-path-flow">
            {technicalPath.map((step, index) => (
              <div className="case-path-item" key={step.title}>
                <article className={`case-path-node case-path-node--${index + 1}`}>
                  <h3>{step.title}</h3><p>{step.copy}</p>
                </article>
                {index < technicalPath.length - 1 && <ArrowRight aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-results" aria-labelledby="results-title">
        <div className="case-container">
          <header className="case-section-header">
            <h2 id="results-title">{caseStudies.results.title}</h2>
          </header>
          <div className="case-results-grid">
            {results.map((item, index) => (
              <article className={`case-result-card case-result-card--${index + 1}`} key={item.label}>
                <strong>{item.number}</strong>
                <span>{item.label}</span>
                {item.sublabel ? <small>{item.sublabel}</small> : null}
                <img src={item.image} alt="" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-product" aria-labelledby="product-title">
        <div className="case-container">
          <h2 id="product-title">{caseStudies.product.title}</h2>
          <div className="case-product-grid">
            {productScreens.map((screen, index) => (
              <article className="case-product-card" key={screen.badge}>
                <img src={PRODUCT_IMAGES[index] ?? PRODUCT_IMAGES[0]} alt="" />
                <div className="case-product-meta">
                  <span>{screen.badge}</span>
                  <h3>{screen.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-video" id="collaboration-video" aria-labelledby="video-title">
        <div className="case-container">
          <h2 id="video-title">{caseStudies.video.title}</h2>
          <div className="case-video-embed">
            <iframe
              src={buildYoutubeEmbedUrl(COLLABORATION_VIDEO_ID)}
              title={caseStudies.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
