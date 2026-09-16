'use client'
/* eslint-disable @next/next/no-img-element -- uploaded object URLs require native image elements */

import { useEffect, useMemo, useRef, useState } from 'react'
import LayeredHoloCard from './LayeredHoloCard'

const ACCENT = '#00CCD6'
const MAX_FILE_SIZE = 12 * 1024 * 1024
const GENERATION_LIMIT = 5
const assetUrl = path => `/aia-anniversary/assets/${path}`
const DEFAULT_ARTWORK = Object.freeze({
  name: 'AIA BaBa.png',
  size: 2442795,
  lastModified: 1789459298000,
  url: assetUrl('aia-baba-default.png'),
  width: 941,
  height: 1672,
})

function cleanTitle(filename) {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
  if (!base || /^image\s*\d*$/i.test(base)) {return 'MY BABA'}
  return base.slice(0, 24).toUpperCase()
}

function makeSignature(file) {
  const seed = `${file.name}:${file.size}:${file.lastModified}`
  let hash = 2166136261
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return `AIA-${(hash >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(0, 7)}`
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}

function drawCover(context, image, x, y, width, height) {
  const sourceRatio = image.naturalWidth / image.naturalHeight
  const targetRatio = width / height
  let sourceWidth = image.naturalWidth
  let sourceHeight = image.naturalHeight
  let sourceX = 0
  let sourceY = 0
  if (sourceRatio > targetRatio) {
    sourceWidth = sourceHeight * targetRatio
    sourceX = (image.naturalWidth - sourceWidth) / 2
  } else {
    sourceHeight = sourceWidth / targetRatio
    sourceY = (image.naturalHeight - sourceHeight) / 2
  }
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
}

export default function AiaAnniversaryApp() {
  const [artwork, setArtwork] = useState(DEFAULT_ARTWORK)
  const [generated, setGenerated] = useState(false)
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState('Ready to create')
  const [message, setMessage] = useState(
    `Default artwork ready. Original size: ${DEFAULT_ARTWORK.width} × ${DEFAULT_ARTWORK.height}.`
  )
  const [error, setError] = useState(false)
  const [depth, setDepth] = useState(1.1)
  const [contourGlow, setContourGlow] = useState(0.45)
  const [flipped, setFlipped] = useState(false)
  const [tiltKey, setTiltKey] = useState(0)
  const [motionEnabled, setMotionEnabled] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [holoLayers, setHoloLayers] = useState(null)
  const [remainingCount, setRemainingCount] = useState(GENERATION_LIMIT)
  const objectUrlRef = useRef('')
  const pointerRef = useRef({ x: 0, y: 0, time: 0 })
  const dialogRef = useRef(null)

  const signature = useMemo(() => makeSignature(artwork), [artwork])
  const title = useMemo(() => cleanTitle(artwork.name), [artwork.name])
  const cardVars = {
    '--aia-glow-alpha': Math.min(0.5, 0.04 + contourGlow * 0.13),
    '--aia-glow-blur': `${7 + contourGlow * 7}px`,
  }

  useEffect(() => () => {
    if (objectUrlRef.current) {URL.revokeObjectURL(objectUrlRef.current)}
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {return}
    if (guideOpen && !dialog.open) {dialog.showModal()}
    if (!guideOpen && dialog.open) {dialog.close()}
  }, [guideOpen])

  useEffect(() => {
    let cancelled = false
    async function loadGenerationQuota() {
      try {
        const response = await fetch('/api/aia-anniversary/holo-layers')
        const payload = await response.json()
        if (cancelled || typeof payload.remainingCount !== 'number') {return}
        setRemainingCount(payload.remainingCount)
      } catch {
        if (!cancelled) {setRemainingCount(GENERATION_LIMIT)}
      }
    }
    loadGenerationQuota()
    return () => {
      cancelled = true
    }
  }, [])

  async function acceptFile(file) {
    if (!file) {return}
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError(true)
      setMessage('Choose a JPG, PNG or WEBP image.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(true)
      setMessage('This image is larger than 12MB. Compress it and try again.')
      return
    }

    const nextUrl = URL.createObjectURL(file)
    try {
      const image = await loadImage(nextUrl)
      if (objectUrlRef.current) {URL.revokeObjectURL(objectUrlRef.current)}
      objectUrlRef.current = nextUrl
      setArtwork({
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        url: nextUrl,
        width: image.naturalWidth,
        height: image.naturalHeight,
      })
      setGenerated(false)
      setHoloLayers(null)
      setFlipped(false)
      setTiltKey(value => value + 1)
      setError(false)
      setMessage(`Artwork ready. Original size: ${image.naturalWidth} × ${image.naturalHeight}.`)
    } catch {
      URL.revokeObjectURL(nextUrl)
      setError(true)
      setMessage('This image could not be read. Choose another file and try again.')
    }
  }

  async function generateCard() {
    if (busy) {return}
    if (remainingCount <= 0) {
      setError(true)
      setMessage(`You can generate at most ${GENERATION_LIMIT} cards.`)
      return
    }
    setBusy(true)
    setGenerated(false)
    try {
      setPhase('Reading your artwork')
      const source = await fetch(artwork.url)
      const blob = await source.blob()
      const mimeType = blob.type || 'image/png'
      const form = new FormData()
      form.append('file', new File([blob], artwork.name || 'artwork.png', { type: mimeType }))
      setPhase('Painting the anniversary card')
      const response = await fetch('/api/aia-anniversary/holo-layers', {
        method: 'POST',
        body: form,
      })
      const payload = await response.json()
      if (typeof payload.remainingCount === 'number') {
        setRemainingCount(payload.remainingCount)
      }
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Generation failed')
      }
      setPhase('Sealing the encounter')
      setHoloLayers(payload.data)
      setGenerated(true)
      setPhase('Limited card ready')
      setError(false)
      setMessage('Card ready. Move across it to explore the foil, or tap the card to flip.')
    } catch (generateError) {
      setError(true)
      setMessage(generateError instanceof Error ? generateError.message : 'Generation failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  async function downloadCard() {
    if (!generated) {
      generateCard()
      return
    }
    try {
      const image = await loadImage(artwork.url)
      const width = 1500
      const height = 2100
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      context.save()
      roundedRect(context, 0, 0, width, height, 76)
      context.clip()
      drawCover(context, image, 0, 0, width, height)

      const scrim = context.createLinearGradient(0, 0, 0, height)
      scrim.addColorStop(0, 'rgba(4, 7, 8, 0.08)')
      scrim.addColorStop(0.54, 'rgba(4, 7, 8, 0)')
      scrim.addColorStop(1, 'rgba(4, 7, 8, 0.9)')
      context.fillStyle = scrim
      context.fillRect(0, 0, width, height)

      context.globalCompositeOperation = 'screen'
      const foil = context.createLinearGradient(0, 100, width, height - 100)
      foil.addColorStop(0, 'rgba(0, 204, 214, 0.04)')
      foil.addColorStop(0.32, 'rgba(255, 255, 255, 0.2)')
      foil.addColorStop(0.6, 'rgba(0, 204, 214, 0.16)')
      foil.addColorStop(1, 'rgba(255, 255, 255, 0.05)')
      context.fillStyle = foil
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'

      const chrome = context.createLinearGradient(70, 70, width - 70, height - 70)
      chrome.addColorStop(0, '#f7ffff')
      chrome.addColorStop(0.22, '#5d686a')
      chrome.addColorStop(0.48, '#eaffff')
      chrome.addColorStop(0.75, '#425154')
      chrome.addColorStop(1, '#f7ffff')
      context.lineWidth = 12
      context.strokeStyle = chrome
      roundedRect(context, 54, 54, width - 108, height - 108, 58)
      context.stroke()

      if (contourGlow > 0) {
        context.lineWidth = 2 + contourGlow * 2
        context.strokeStyle = `rgba(0, 204, 214, ${Math.min(0.58, contourGlow * 0.16)})`
        roundedRect(context, 76, 76, width - 152, height - 152, 48)
        context.stroke()
      }

      context.fillStyle = 'rgba(247, 255, 255, 0.94)'
      context.font = '700 34px ui-monospace, monospace'
      context.fillText('AIA 1ST ANNIVERSARY', 118, 156)
      context.fillStyle = ACCENT
      context.textAlign = 'right'
      context.fillText('1 / 1', width - 118, 156)
      context.textAlign = 'left'
      context.font = '700 30px ui-monospace, monospace'
      context.fillText('LIMITED ENCOUNTER', 118, height - 332)
      context.fillStyle = '#f7ffff'
      context.font = '700 86px Arial, sans-serif'
      context.fillText(title.length > 18 ? `${title.slice(0, 18)}…` : title, 114, height - 214)
      context.fillStyle = 'rgba(238, 250, 250, 0.72)'
      context.font = '600 28px ui-monospace, monospace'
      context.fillText(signature, 118, height - 120)
      context.restore()

      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `aia-limited-encounter-${signature.toLowerCase()}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()
      setMessage('Your high-resolution PNG download has started.')
    } catch {
      setError(true)
      setMessage('Export failed. Try again.')
    }
  }

  async function shareEvent() {
    const shareData = {
      title: 'AIA 1st Anniversary · Limited Encounter',
      text: 'Create your own reactive AIA BaBa holographic card.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setError(false)
        setMessage('Thanks for sharing the encounter.')
        return
      }

      await navigator.clipboard.writeText(shareData.url)
      setError(false)
      setMessage('Share link copied to your clipboard.')
    } catch (shareError) {
      if (shareError?.name === 'AbortError') {return}
      setError(true)
      setMessage('Sharing is unavailable in this browser. Copy the page URL to share it.')
    }
  }

  async function toggleDeviceMotion() {
    if (motionEnabled) {
      setMotionEnabled(false)
      setTiltKey(value => value + 1)
      setError(false)
      setMessage('Device motion is off. Drag across the card to steer the foil.')
      return
    }

    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      setError(true)
      setMessage('Motion sensors are not available on this device. Drag across the card instead.')
      return
    }
    if (!window.isSecureContext && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      setError(true)
      setMessage('Device motion requires an HTTPS page on mobile.')
      return
    }

    try {
      const OrientationEvent = window.DeviceOrientationEvent
      if (typeof OrientationEvent.requestPermission === 'function') {
        const permission = await OrientationEvent.requestPermission()
        if (permission !== 'granted') {
          throw new Error('Motion permission was not granted.')
        }
      }
      setMotionEnabled(true)
      setTiltKey(value => value + 1)
      setError(false)
      setMessage('Device motion enabled. Tilt your phone to steer the holographic layers.')
    } catch (motionError) {
      setMotionEnabled(false)
      setError(true)
      setMessage(motionError instanceof Error ? motionError.message : 'Motion permission could not be enabled.')
    }
  }

  function recenterMotion() {
    setTiltKey(value => value + 1)
    setError(false)
    setMessage(motionEnabled ? 'Motion recentered to the current phone angle.' : 'Card recentered.')
  }

  function handleCardPointerDown(event) {
    pointerRef.current = { x: event.clientX, y: event.clientY, time: performance.now() }
  }

  function handleCardPointerUp(event) {
    if (event.target.closest('button')) {return}
    const start = pointerRef.current
    const travel = Math.hypot(event.clientX - start.x, event.clientY - start.y)
    if (travel <= 8 && performance.now() - start.time <= 500) {setFlipped(value => !value)}
  }

  return (
    <div className='aia-anniversary app-shell'>
      <header className='topbar'>
        <div className='brand' aria-label='DeAgentAI AIA 1st Anniversary'>
          <img src={assetUrl('deagent-logo.png')} alt='DeAgentAI' />
          <span aria-hidden='true' />
          <small>AIA 1ST ANNIVERSARY</small>
        </div>
        <nav aria-label='Event navigation'>
          <button className='quiet-button' type='button' onClick={() => setGuideOpen(true)}>How it works</button>
          <button
            className='icon-button'
            type='button'
            aria-label='Share this experience'
            title='Share'
            onClick={shareEvent}
          >
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M12 16V3m0 0 4.5 4.5M12 3 7.5 7.5' />
              <path d='M5 11v8h14v-8' />
            </svg>
          </button>
        </nav>
      </header>

      <main className='studio'>
        <section className='creator' aria-labelledby='event-title'>
          <p className='eyebrow'>AIA 1st Anniversary</p>
          <h1 id='event-title'>Limited <span>Encounter</span></h1>
          <p className='lede'>Upload a BaBa-inspired image and preserve the encounter in a reactive anniversary card.</p>

          <div className='upload-panel'>
            <label
              className='dropzone'
              onDragOver={event => event.preventDefault()}
              onDrop={event => {
                event.preventDefault()
                acceptFile(event.dataTransfer.files[0])
              }}
            >
              <img src={artwork.url} alt='' />
              <span className='drop-copy'>
                <strong>{artwork === DEFAULT_ARTWORK ? 'AIA BaBa anniversary artwork' : artwork.name}</strong>
                <small>JPG, PNG or WEBP · up to 12MB</small>
              </span>
              <span className='choose-label'>Choose file</span>
              <input
                type='file'
                accept='image/jpeg,image/png,image/webp'
                aria-label='Choose your BaBa artwork'
                onChange={event => {
                  acceptFile(event.target.files[0])
                  event.target.value = ''
                }}
              />
            </label>
            <p className={`form-message${error ? ' is-error' : ''}`} role='status'>{message}</p>
            <div className='action-row'>
              <button className='primary-button' type='button' disabled={busy || remainingCount <= 0} onClick={generateCard}>
                {busy ? phase : remainingCount <= 0 ? 'Limit reached' : generated ? 'Generate again' : 'Generate card'}
              </button>
              <button className='secondary-button' type='button' disabled={!generated || busy} onClick={downloadCard}>
                Download PNG
              </button>
            </div>
            <p className={`generation-quota${remainingCount <= 0 ? ' is-empty' : ''}`}>
              {remainingCount <= 0
                ? `Generation limit reached (${GENERATION_LIMIT} / ${GENERATION_LIMIT}).`
                : `${remainingCount} of ${GENERATION_LIMIT} generations left.`}
            </p>
          </div>
          <p className='privacy'>Artwork is sent to DeAgentAI only to split holographic layers. Each visitor can generate up to 5 cards. It is not stored on this site.</p>
        </section>

        <section className='showcase' aria-label='Interactive holographic card preview'>
          <div className='scene' aria-hidden='true' />
          <div
            className={`flip-stage${flipped ? ' is-flipped' : ''}${generated ? ' is-generated' : ''}`}
            style={cardVars}
            onPointerDown={handleCardPointerDown}
            onPointerUp={handleCardPointerUp}
          >
            <div className='flip-inner'>
              <div className='flip-face flip-front'>
                <LayeredHoloCard
                  artworkUrl={artwork.url}
                  layered={Boolean(holoLayers) || artwork.url === DEFAULT_ARTWORK.url}
                  layers={holoLayers || undefined}
                  depth={depth}
                  contourGlow={contourGlow}
                  generated={generated}
                  recenterKey={tiltKey}
                  motionEnabled={motionEnabled}
                />
              </div>
              <div className='flip-face flip-back'>
                <LayeredHoloCard
                  artworkUrl={assetUrl('aia-card-back.png')}
                  artworkAlt='AIA card back'
                  artworkFit='contain'
                  surface='card-back'
                  layered={false}
                  depth={0}
                  contourGlow={0}
                  generated={generated}
                  recenterKey={tiltKey}
                  motionEnabled={motionEnabled}
                />
              </div>
            </div>
          </div>

          <div className='effect-panel' aria-label='Card effects'>
            <label>
              <span>Depth</span>
              <input type='range' min='-3' max='3' step='0.05' value={depth} onChange={event => setDepth(Number(event.target.value))} />
              <output>{depth > 0 ? '+' : ''}{depth.toFixed(2)}×</output>
            </label>
            <label>
              <span>Contour glow</span>
              <input type='range' min='0' max='3' step='0.05' value={contourGlow} onChange={event => setContourGlow(Number(event.target.value))} />
              <output>{contourGlow.toFixed(2)}×</output>
            </label>
            <div className='effect-actions'>
              <button
                className={`effect-button${motionEnabled ? ' is-active' : ''}`}
                type='button'
                aria-pressed={motionEnabled}
                onClick={toggleDeviceMotion}
              >
                {motionEnabled ? 'Motion on' : 'Enable motion'}
              </button>
              <button className='effect-button' type='button' onClick={recenterMotion}>Recenter</button>
              <button className='effect-button' type='button' onClick={() => setFlipped(value => !value)}>Flip card</button>
            </div>
          </div>

          {busy && (
            <div className='status-panel' role='status' aria-live='polite'>
              <span aria-hidden='true' />
              <strong>{phase}</strong>
              <small>DeAgentAI is painting a full card, then splitting layers</small>
            </div>
          )}
        </section>
      </main>

      <dialog ref={dialogRef} onClose={() => setGuideOpen(false)}>
        <div className='dialog-head'>
          <h2>How to create your encounter</h2>
          <button className='icon-button' type='button' aria-label='Close event guide' onClick={() => setGuideOpen(false)}>×</button>
        </div>
        <div className='rules-grid'>
          <article><strong>UPLOAD</strong><p>Keep the default anniversary artwork or choose your own BaBa-inspired image.</p></article>
          <article><strong>GENERATE</strong><p>DeAgentAI splits your artwork into independently moving scenery, subject, UI and contour layers.</p></article>
          <article><strong>PLAY</strong><p>Drag across the card, or enable motion and tilt your phone, to steer the lenticular parallax. Use Recenter after changing your grip.</p></article>
          <article><strong>KEEP</strong><p>Download a 1500 × 2100 PNG. The original file is used only for this generation request.</p></article>
        </div>
      </dialog>
    </div>
  )
}
