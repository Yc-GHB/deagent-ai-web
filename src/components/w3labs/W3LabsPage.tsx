'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/i18n/I18nProvider'
import Hero24 from './originkit/hero-24'
import W3LabsPhotoConstellation from './W3LabsPhotoConstellation'
import W3LabsEventArchive from './W3LabsEventArchive'
import './W3LabsPage.css'

/**
 * W3Labs 独立落地页：地球 Hero、活动影像与线下活动档案。
 */
export default function W3LabsPage() {
  const { messages } = useI18n()
  const cta = messages.w3labs.cta
  return (
    <main className="w3labs-page" id="top">
      <Hero24 />
      <W3LabsPhotoConstellation />
      <W3LabsEventArchive />
      <section className="w3labs-cta" aria-labelledby="w3labs-cta-title">
        <div className="w3labs-container w3labs-cta-inner">
          <div>
            <h2 id="w3labs-cta-title">{cta.title}</h2>
            <p>{cta.copy}</p>
          </div>
          <Link className="w3labs-button w3labs-button--primary" href="/community#community-channels">
            {cta.button} <ArrowRight size={16} strokeWidth={1.7} />
          </Link>
        </div>
      </section>
    </main>
  )
}
