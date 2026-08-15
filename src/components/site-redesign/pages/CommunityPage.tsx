'use client'

import { useMemo, useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import type { Messages } from '@/i18n/messages/types'
import CountUp from '../components/CountUp'
import DomeGallery, { type DomeGalleryImage } from '../components/DomeGallery'
import Prism from '../components/Prism'
import './CommunityPage.css'

/** 稳定文件夹键，与文案城市标签按索引对齐 */
const CITY_FOLDERS = ['shenzhen-ai-meetup', 'hong-kong', 'xian'] as const

const SOCIAL_ICONS = [
  '/images/social-x.svg',
  '/images/social-discord.svg',
  '/images/social-tg.svg',
  '/images/social-rootdata.svg',
] as const

/** 与 hero.social 顺序对齐：X / Discord / Telegram / RootData */
const SOCIAL_HREFS = [
  'https://x.com/DeAgentAI',
  'https://discord.com/invite/officialdeagentai',
  'https://t.me/officialdeagentai',
  'https://www.rootdata.com/projects/detail/DeAgentAI?k=MTI1MjA%3D',
] as const

/** Telegram / Discord 频道卡外链 */
const CHANNEL_HREFS = [
  'https://t.me/officialdeagentai',
  'https://discord.com/invite/officialdeagentai',
] as const

type CommunityMessages = Messages['community']
type GalleryPhoto = DomeGalleryImage & {
  year: string
  cityIndex: number
}

function CornerButton({ label }: { label: string }) {
  return (
    <span className="community-corner-button" aria-disabled="true">
      <i className="community-corner community-corner--tl" /><i className="community-corner community-corner--tr" />
      <i className="community-corner community-corner--bl" /><i className="community-corner community-corner--br" />
      <span>{label}</span>
    </span>
  )
}

export default function CommunityPage() {
  const { messages } = useI18n()
  const community = messages.community as CommunityMessages
  const years: CommunityMessages['snapshots']['years'] = community.snapshots.years
  const cityLabels: CommunityMessages['snapshots']['cities'] = community.snapshots.cities
  const [year, setYear] = useState<string | null>(null)

  const galleryPhotos = useMemo((): GalleryPhoto[] => (
    years.flatMap((photoYear: string) =>
      CITY_FOLDERS.map((folder, index) => ({
        src: `/community-gallery/${photoYear}/${folder}/example-01.jpeg`,
        year: photoYear,
        cityIndex: index,
        alt: community.snapshots.photoAltTemplate.replace('{city}', cityLabels[index] ?? ''),
      })),
    )
  ), [cityLabels, community.snapshots.photoAltTemplate, years])

  const visiblePhotos = useMemo(
    () => galleryPhotos.filter((photo: GalleryPhoto) => !year || photo.year === year),
    [galleryPhotos, year],
  )

  const filterLabel = year || community.snapshots.filterAll

  return (
    <main className="community-page" id="top">

      <section className="community-hero" aria-labelledby="community-title">
        <div className="community-hero-prism" aria-hidden="true"><Prism /></div>
        <div className="community-container community-hero-content">
          <h1 id="community-title">
            {community.hero.titleBefore}
            <span>{community.hero.titleAccent}</span>
          </h1>
          <p>{community.hero.copy}</p>
          <div className="community-social-row">
            {community.hero.social.map((label: string, index: number) => (
              <a
                href={SOCIAL_HREFS[index] ?? SOCIAL_HREFS[0]}
                aria-label={label}
                key={label}
                target="_blank"
                rel="noreferrer"
              >
                <img src={SOCIAL_ICONS[index] ?? SOCIAL_ICONS[0]} alt="" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="community-stats" aria-labelledby="traction-title">
        <div className="community-container">
          <header className="community-section-header">
            <h2 id="traction-title">{community.traction.title}</h2>
            <p>{community.traction.disclaimer}</p>
          </header>
          <div className="community-stats-grid">
            {community.traction.stats.map((stat: CommunityMessages['traction']['stats'][number], index: number) => (
              <article key={stat.title}>
                <strong className={index === 1 ? 'community-city-value' : undefined}>
                  {typeof stat.value === 'number' ? (
                    <>
                      <CountUp value={stat.value} />
                      {'valueSuffix' in stat && stat.valueSuffix ? stat.valueSuffix : null}
                    </>
                  ) : (
                    stat.value
                  )}
                </strong>
                <h3>{stat.title}</h3>
                <p>{stat.footnote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="community-snapshots" aria-labelledby="snapshots-title">
        <div className="community-container">
          <h2 id="snapshots-title">{community.snapshots.title}</h2>
          <p className="community-gallery-status" aria-live="polite">
            {filterLabel} · {visiblePhotos.length}
            {community.snapshots.sourcePhotosSuffix}
          </p>
          <div className="community-tabs community-year-tabs" role="group" aria-label={community.snapshots.yearAria}>
            {years.map((item: string) => (
              <button
                type="button"
                className={year === item ? 'is-active' : ''}
                aria-pressed={year === item}
                onClick={() => setYear(year === item ? null : item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="community-snapshot-gallery">
            <DomeGallery
              images={visiblePhotos}
              transitionKey={year || 'all'}
              overlayBlurColor="#1a1a1a"
              grayscale
              imageBorderRadius="18px"
            />
          </div>
        </div>
      </section>

      <section className="community-conversations" id="community-channels" aria-labelledby="conversation-title">
        <div className="community-container community-conversation-layout">
          <div className="community-conversation-copy">
            <h2 id="conversation-title">{community.conversation.title}</h2>
            <p>{community.conversation.copy}</p>
          </div>
          <div className="community-channel-grid">
            {community.conversation.channels.map((channel: CommunityMessages['conversation']['channels'][number], index: number) => (
              <a
                href={CHANNEL_HREFS[index] ?? CHANNEL_HREFS[0]}
                className="community-channel-card"
                key={channel.title}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {channel.code === 'chat' ? (
                    <MessageCircle size={18} strokeWidth={1.6} />
                  ) : (
                    <Send size={18} strokeWidth={1.6} />
                  )}
                </span>
                <div><h3>{channel.title}</h3><p>{channel.language}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="community-ambassador" aria-labelledby="ambassador-title">
        <div className="community-container">
          <article className="community-ambassador-card">
            <img src="/figma-assets/community-ambassador.png" alt={community.ambassador.imageAlt} />
            <div>
              <h2 id="ambassador-title">{community.ambassador.title}</h2>
              <p>{community.ambassador.copy}</p>
              <CornerButton label={community.ambassador.cta} />
            </div>
          </article>
        </div>
      </section>

      <section className="community-blogs" aria-labelledby="blogs-title">
        <div className="community-container">
          <h2 id="blogs-title">{community.blogs.title}</h2>
          <div className="community-blog-grid">
            {community.blogs.posts.map((post: CommunityMessages['blogs']['posts'][number], index: number) => (
              <article key={`${post.date}-${index}`}>
                <div className="community-blog-image">
                  <span>{String(index + 1).padStart(2, '0')} · 04</span>
                </div>
                <div className="community-blog-copy">
                  <span>{post.date}</span>
                  <h3>{post.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
