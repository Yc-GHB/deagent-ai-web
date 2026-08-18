'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { useI18n, type Messages } from '@/i18n/I18nProvider'
import CardSwap, { Card } from '../components/CardSwap'
import ScrambledText from '../components/ScrambledText'
import ConnectWalletButton from '../components/ConnectWalletButton'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HERO_VIDEO_SRC = '/images/home/hero_video.mp4'
const HERO_VIDEO_POSTER = '/images/home/hero_poster.png'

/** 首页 Voices 区 YouTube 视频（嵌入 ID） */
const HOME_VOICE_VIDEOS = [
  'ED7snamvQe0',
  'XAWSIW9U7s0',
  '0ltbOrdeIes',
] as const

/**
 * 生成 YouTube 嵌入地址（静音自动播放并循环）。
 */
function buildYoutubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    playsinline: '1',
    rel: '0',
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

const TRUST_CARD_POSITIONS = ['trust-card--tl', 'trust-card--tr', 'trust-card--bl', 'trust-card--br'] as const

const AGENT_CARD_LOGOS = [
  { src: '/figma-assets/corrai-logo.png' },
  { src: '/figma-assets/alice-logo.svg' },
] as const

/** 沿用旧首页合作方 logo 列表 */
const PARTNER_LOGOS = [
  '/images/partners/03.png',
  '/images/partners/04.png',
  '/images/partners/01.png',
  '/images/partners/06.png',
  '/images/partners/02.png',
  '/images/partners/3.4.png',
  '/images/partners/2.0.png',
  '/images/partners/2.1.png',
  '/images/partners/3.1.png',
  '/images/partners/3.2.png',
  '/images/partners/2.2.png',
  '/images/partners/2.6.png',
  '/images/partners/2.4.png',
  '/images/partners/3.5.png',
  '/images/partners/15.png',
  '/images/partners/2.3.png',
  '/images/partners/3.3.png',
  '/images/partners/2.7.png',
  '/images/partners/2.8.png',
  '/images/partners/2.9.png',
  '/images/partners/2.10.png',
  '/images/partners/2.11.png',
  '/images/partners/2.13.png',
  '/images/partners/2.14.png',
  '/images/partners/2.15.png',
  '/images/partners/2.16.png',
  '/images/partners/07.png',
  '/images/partners/2.17.png',
  '/images/partners/14.png',
  '/images/partners/017_Kernel.png',
  '/images/partners/10.png',
  '/images/partners/09.png',
  '/images/partners/11.png',
  '/images/partners/12.png',
  '/images/partners/13.png',
] as const

type HomeMessages = Messages['home']
type AgentCardItem = HomeMessages['ecosystem']['agentCards']['items'][number]
type TrustCardCopy = HomeMessages['trust']['cards'][number]
type ProductCapability = HomeMessages['product']['capabilities'][number]
type TechnologyStep = HomeMessages['ecosystem']['technologySteps'][number]

const RippleDistortion = dynamic(() => import('../components/RippleDistortion'), {
  ssr: false,
})

function Brackets({ light = true }: { light?: boolean }) {
  return (
    <span aria-hidden='true' className={`corner-brackets ${light ? 'corner-brackets--light' : ''}`}>
      <i className='corner-bracket corner-bracket--tl' />
      <i className='corner-bracket corner-bracket--tr' />
      <i className='corner-bracket corner-bracket--bl' />
      <i className='corner-bracket corner-bracket--br' />
    </span>
  )
}

function EditorialButton({ children, href = '#', ghost = false }: { children: React.ReactNode; href?: string; ghost?: boolean }) {
  return (
    <span className='editorial-button-wrap'>
      <Brackets />
      <a href={href} className={`editorial-button ${ghost ? 'editorial-button--ghost' : ''}`}>
        {children}
      </a>
    </span>
  )
}

function SectionTitle({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return (
    <div data-reveal className={`section-title ${centered ? 'section-title--centered' : ''}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

function CardDeck({ activeIndex, onSwap }: { activeIndex: number; onSwap: () => void }) {
  const { messages } = useI18n()
  const agentCards = messages.home.ecosystem.agentCards

  return (
    <div className='card-deck' aria-label={agentCards.aria}>
      <CardSwap activeIndex={activeIndex} onSwap={onSwap} width={300} height={400} cardDistance={78} verticalDistance={50} easing='elastic'>
        {agentCards.items.map((item: AgentCardItem, index: number) => (
          <Card key={item.name} customClass='agent-card'>
            <span className='agent-chip'><i />{item.chip}</span>
            <h3>{item.name}</h3>
            <p>{item.role}</p>
            <div className='agent-card-logo'>
              <img src={(AGENT_CARD_LOGOS[index] ?? AGENT_CARD_LOGOS[0]).src} alt={item.logoAlt} />
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  )
}

export default function HomePage() {
  const { messages, locale } = useI18n()
  const home: HomeMessages = messages.home
  const [activeScenario, setActiveScenario] = useState(0)
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false)
  const [isRippleEnabled, setIsRippleEnabled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scenarioRef = useRef<HTMLDivElement>(null)
  const scenarioCopyRef = useRef<HTMLDivElement>(null)
  const technologyPathRef = useRef<HTMLDivElement>(null)

  const trustCards = home.trust.cards.map((card: TrustCardCopy, index: number) => ({
    ...card,
    position: TRUST_CARD_POSITIONS[index] ?? TRUST_CARD_POSITIONS[0],
  }))
  const productCapabilities = home.product.capabilities
  const technologySteps = home.ecosystem.technologySteps
  const scenarios = home.ecosystem.scenarios
  const toggleScenario = () => setActiveScenario(current => (current + 1) % scenarios.length)

  useGSAP(() => {
    const scenario = scenarioRef.current
    if (!scenario) return
    const SCENARIO_THRESHOLD = 0.55
    const resolveScenarioIndex = (): number => (
      scenario.getBoundingClientRect().top <= window.innerHeight * SCENARIO_THRESHOLD ? 1 : 0
    )
    const applyScenarioIndex = (next: number): void => {
      setActiveScenario(current => (current === next ? current : next))
    }
    const trigger = ScrollTrigger.create({
      trigger: scenario,
      start: 'top 55%',
      end: 'bottom top',
      onEnter: () => applyScenarioIndex(1),
      onEnterBack: () => applyScenarioIndex(1),
      onLeaveBack: () => applyScenarioIndex(0),
    })
    applyScenarioIndex(resolveScenarioIndex())
    ScrollTrigger.refresh()
    return () => {
      trigger.kill()
    }
  }, { scope: scenarioRef })

  useGSAP(() => {
    if (!scenarioCopyRef.current) return
    gsap.fromTo(scenarioCopyRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' })
  }, { scope: scenarioRef, dependencies: [activeScenario], revertOnUpdate: true })

  useGSAP(() => {
    const path = technologyPathRef.current
    if (!path) return
    const cards = gsap.utils.toArray<HTMLElement>('[data-tech-step]', path)
    const media = gsap.matchMedia()
    media.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions?.reduceMotion) {
        gsap.set(cards, { autoAlpha: 1, clearProps: 'transform' })
        return
      }
      gsap.set(cards, { autoAlpha: 0, y: 42, scale: 0.975 })
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: path,
          start: 'top 55%',
          toggleActions: 'restart none none reverse',
        },
      })
      sequence.to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 1.05, ease: 'power3.out', stagger: 0.65 })
      return () => sequence.kill()
    })
    return () => media.revert()
  }, { scope: technologyPathRef })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    elements.forEach((element, index) => element.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`))
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cancelled = false
    const markReady = (): void => {
      if (cancelled) return
      setIsHeroVideoReady(true)
      // 涟漪交互层属于动效，reduced-motion 下不启用
      if (!reduceMotion.matches) setIsRippleEnabled(true)
    }
    const tryPlay = async (): Promise<void> => {
      if (cancelled) return
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      try {
        await video.play()
        markReady()
      } catch {
        // 等待用户手势后再播
      }
    }
    const onPlaying = (): void => {
      markReady()
    }
    const onTimeUpdate = (): void => {
      if (video.currentTime > 0.05) markReady()
    }
    video.addEventListener('playing', onPlaying)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadeddata', () => {
      void tryPlay()
    })
    video.addEventListener('canplay', () => {
      void tryPlay()
    })
    video.addEventListener('error', () => {
      console.warn('[HomePage] hero video error', {
        code: video.error?.code,
        message: video.error?.message,
        src: video.currentSrc || HERO_VIDEO_SRC,
      })
      if (!reduceMotion.matches) setIsRippleEnabled(true)
    })
    void tryPlay()
    // 即使自动播放失败，也启用液态玻璃层（纹理用 poster）
    const rippleFallback = window.setTimeout(() => {
      if (!cancelled && !reduceMotion.matches) setIsRippleEnabled(true)
    }, 800)
    const unlock = (): void => {
      void tryPlay()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true })
    return () => {
      cancelled = true
      window.clearTimeout(rippleFallback)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('timeupdate', onTimeUpdate)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [])

  return (
    <div id='top' className='site-shell home-page'>
      <section className='hero-section'>
        <div className='hero-media'>
          <img
            className={`hero-video-poster${isHeroVideoReady ? ' hero-video-poster--hidden' : ''}`}
            src={HERO_VIDEO_POSTER}
            alt=''
            decoding='async'
            fetchPriority='high'
          />
          <video
            ref={videoRef}
            className='hero-video'
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
            poster={HERO_VIDEO_POSTER}
          >
            <source src={HERO_VIDEO_SRC} type='video/mp4' />
          </video>
        </div>
        {isRippleEnabled && (
          <div className='hero-liquid-glass' aria-hidden='true'>
            <RippleDistortion
              src={HERO_VIDEO_POSTER}
              videoRef={videoRef}
              brushSize={180}
              strength={0.18}
              swirl={0.7}
              rings={3}
              spread={4}
              fade={2.4}
              spacing={24}
              dispersion={0.16}
              glint={0.38}
              tint='#B8C8CC'
              tintAmount={0.14}
              highlightColor='#F4F8F9'
              grayscale={false}
              trigger='both'
              clickStrength={1.7}
              quality='medium'
              className='hero-ripple'
            />
          </div>
        )}
        <div data-reveal className='hero-content'>
          <h1>
            <ScrambledText key={locale} className='hero-heading-scramble' radius={120} duration={0.72} speed={0.85} scrambleChars='.:/'>
              {home.hero.titleLine1}
            </ScrambledText>
            <ScrambledText key={`${locale}-2`} className='hero-heading-scramble' radius={120} duration={0.72} speed={0.85} scrambleChars='.:/'>
              {home.hero.titleLine2}
            </ScrambledText>
          </h1>
          <div className='hero-actions'>
            <EditorialButton href='#product'>{home.hero.ctaExplore} <ArrowRight size={14} /></EditorialButton>
            <EditorialButton href='#tech' ghost>{home.hero.ctaLearn}</EditorialButton>
          </div>
        </div>
      </section>

      <div className='site-content'>
        <section id='tech' className='content-section trust-section'>
          <SectionTitle eyebrow={home.trust.eyebrow} title={home.trust.title} centered />
          <div data-reveal className='trust-visual'>
            <img className='trust-diagram' src='/figma-assets/trust-diagram.png' alt={home.trust.diagramAlt} />
            {trustCards.map((card: TrustCardCopy & { position: (typeof TRUST_CARD_POSITIONS)[number] }) => (
              <article key={card.title} className={`trust-card ${card.position}`}>
                <h3><i />{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
            <div className='trust-label-orbit' aria-label={home.trust.orbitAria}>
              <p className='trust-label trust-label--left'>{home.trust.labels.continuity}</p>
              <p className='trust-label trust-label--right'>{home.trust.labels.consensus}</p>
              <p className='trust-label trust-label--bottom'>{home.trust.labels.identity}</p>
            </div>
          </div>
        </section>

        <section id='product' className='content-section product-section'>
          <SectionTitle eyebrow={home.product.eyebrow} title={home.product.title} />
          <div data-reveal className='product-layout'>
            <div className='screener-frame'><img src='/figma-assets/market-screener.png' alt={home.product.screenerAlt} /></div>
            <div className='product-details'>
              <h3>{home.product.heading}</h3>
              <div className='capability-list'>
                {productCapabilities.map((capability: ProductCapability) => (
                  <article key={capability.title}>
                    <h4><i />{capability.title}</h4>
                    <p>{capability.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id='ecosystem' className='content-section ecosystem-section'>
          <SectionTitle eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} centered />
          <div ref={technologyPathRef} data-reveal className='technology-path'>
            {technologySteps.map((step: TechnologyStep, index: number) => (
              <article key={step.title} data-tech-step className={`technology-step technology-step--${index + 1}`}>
                <h3><i />{step.title}</h3>
                <ul>{step.lines.map((line: string) => <li key={line}>{line}</li>)}</ul>
              </article>
            ))}
          </div>
          <div ref={scenarioRef} data-reveal className='scenario-layout'>
            <article ref={scenarioCopyRef} className='scenario-copy'>
              <h3>{scenarios[activeScenario].title}</h3>
              <p>{scenarios[activeScenario].copy}</p>
            </article>
            <CardDeck activeIndex={activeScenario} onSwap={toggleScenario} />
          </div>
        </section>

        <section id='learn' className='content-section voices-section'>
          <SectionTitle eyebrow={home.voices.eyebrow} title={home.voices.title} centered />
          <div data-reveal className='voices-feature'>
            <iframe
              src={buildYoutubeEmbedUrl(HOME_VOICE_VIDEOS[0])}
              title={`${home.voices.title} 1`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              loading='lazy'
              referrerPolicy='strict-origin-when-cross-origin'
            />
          </div>
          <div className='voices-grid' aria-label={home.voices.gridAria}>
            {HOME_VOICE_VIDEOS.slice(1).map((videoId, index) => (
              <div key={videoId} className='voices-grid-item'>
                <iframe
                  src={buildYoutubeEmbedUrl(videoId)}
                  title={`${home.voices.title} ${index + 2}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='strict-origin-when-cross-origin'
                />
              </div>
            ))}
          </div>
        </section>

        <section id='partners' className='content-section partners-section'>
          <SectionTitle eyebrow={home.partners.eyebrow} title={home.partners.title} />
          <div data-reveal className='partner-board' aria-label={home.partners.title}>
            <div className='partner-marquee'>
              <div className='partner-marquee-track'>
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, index) => (
                  <img key={`${src}-${index}`} src={src} alt='' />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id='launch' className='content-section launch-section'>
          <div data-reveal className='launch-copy'>
            <h2>{home.launch.title}</h2>
            <p>{home.launch.copy}</p>
          </div>
          <div className='network-graphic' aria-hidden='true'>
            <img src='/figma-assets/network-architecture.svg' alt='' />
          </div>
          <div className='launch-actions'>
            <ConnectWalletButton />
            <EditorialButton href='https://deagentai.gitbook.io/deagentai' ghost>{home.launch.ctaWhitepaper}</EditorialButton>
          </div>
        </section>
      </div>
    </div>
  )
}
