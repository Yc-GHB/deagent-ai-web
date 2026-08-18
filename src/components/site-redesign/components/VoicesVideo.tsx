'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { buildYoutubeEmbedUrl } from '@/utils/youtube-embed'

interface VoicesVideoProps {
  readonly videoId: string
  readonly coverSrc: string
  readonly title: string
  readonly className?: string
}

/**
 * 首页 Voices 视频：封面 + 点击后加载 YouTube 播放器。
 */
export default function VoicesVideo({ videoId, coverSrc, title, className }: VoicesVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const rootClassName = className ? `voices-video ${className}` : 'voices-video'
  if (isPlaying) {
    return (
      <div className={rootClassName}>
        <iframe
          src={buildYoutubeEmbedUrl(videoId, { autoplay: true })}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
        />
      </div>
    )
  }
  return (
    <div className={rootClassName}>
      <button type='button' className='voices-video-trigger' onClick={() => setIsPlaying(true)} aria-label={title}>
        <img className='voices-video-cover' src={coverSrc} alt='' />
        <span className='voices-video-play' aria-hidden='true'>
          <Play size={28} strokeWidth={1.75} fill='currentColor' />
        </span>
      </button>
    </div>
  )
}
