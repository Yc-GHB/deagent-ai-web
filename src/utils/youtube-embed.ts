interface YoutubeEmbedOptions {
  readonly autoplay?: boolean
}

/**
 * 生成 YouTube 嵌入地址：默认不自动播放，保留标准播放控件。
 */
export function buildYoutubeEmbedUrl(videoId: string, options: YoutubeEmbedOptions = {}): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    playsinline: '1',
  })
  if (options.autoplay) {
    params.set('autoplay', '1')
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}
