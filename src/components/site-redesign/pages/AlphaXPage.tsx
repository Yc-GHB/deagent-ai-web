'use client'

import { useI18n } from '@/i18n/I18nProvider'
import './AlphaXPage.css'

const CAPABILITY_IMAGES = [
  '/figma-assets/alphax-proprietary-signals.png',
  '/figma-assets/alphax-autonomous-trading.png',
  '/figma-assets/alphax-auditable-record.png',
] as const

export default function AlphaXPage() {
  const { messages } = useI18n()
  const alphax = messages.alphax
  const capabilities = alphax.does.capabilities.map((capability, index) => ({
    ...capability,
    image: CAPABILITY_IMAGES[index] ?? CAPABILITY_IMAGES[0],
  }))

  return (
    <main className="alphax-page" id="top">

      <section className="alphax-hero" aria-labelledby="alphax-title">
        <img className="alphax-hero-grid" src="/figma-assets/alphax-hero-grid.png" alt="" aria-hidden="true" />
        <div className="alphax-hero-content">
          <h1 id="alphax-title">
            {alphax.hero.title}<span>{alphax.hero.titleAccent}</span>
          </h1>
          <p>
            {alphax.hero.copyBefore}
            <strong>{alphax.hero.copyStrong1}</strong>
            {alphax.hero.copyMid}
            <strong>{alphax.hero.copyStrong2}</strong>
            {alphax.hero.copyAfter}
          </p>
        </div>
      </section>

      <section className="alphax-does" aria-labelledby="alphax-does-title">
        <div className="alphax-section-inner">
          <header className="alphax-section-heading">
            <h2 id="alphax-does-title">{alphax.does.title}</h2>
            <p>{alphax.does.intro}</p>
          </header>
          <div className="alphax-capability-grid">
            {capabilities.map((capability) => (
              <article className="alphax-capability-card" key={capability.title}>
                <img src={capability.image} alt="" />
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="alphax-gallery" id="gallery" aria-labelledby="alphax-gallery-title">
        <div className="alphax-section-inner">
          <h2 id="alphax-gallery-title">{alphax.gallery.title}</h2>
          <div className="alphax-gallery-grid">
            {alphax.gallery.items.map((item) => (
              <article className="alphax-gallery-card" key={item.screen}>
                <span>{item.screen}</span>
                <h3>{item.title}</h3>
                <p>{alphax.gallery.placeholder}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
