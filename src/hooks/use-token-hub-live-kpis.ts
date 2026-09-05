'use client'

import { useEffect, useState } from 'react'
import type { TokenHubUsageSnapshot } from '@/types/platform-usage'

const POLL_MS = 5 * 60 * 1000
const USAGE_PATH = '/api/platform-usage/summary'

const EMPTY_SNAPSHOT: TokenHubUsageSnapshot = {
  kpis: {
    requestsLabel: '—',
    tokensLabel: '—',
    tokensUnit: '',
    requestDeltaPercent: null,
    tokenDeltaPercent: null,
  },
  chart: {
    bars: [],
    axis: [],
    peakValue: '—',
  },
}

/**
 * 拉取 Token Hub 累计用量与近 15 日柱状图。
 */
export function useTokenHubLiveKpis(): TokenHubUsageSnapshot {
  const [snapshot, setSnapshot] = useState<TokenHubUsageSnapshot>(EMPTY_SNAPSHOT)

  useEffect(() => {
    let cancelled = false
    const loadSnapshot = async (): Promise<void> => {
      try {
        const response = await fetch(USAGE_PATH, { cache: 'no-store' })
        const payload = (await response.json()) as { success?: boolean; data?: TokenHubUsageSnapshot }
        if (!cancelled && payload.success && payload.data) setSnapshot(payload.data)
      } catch {
        if (!cancelled) setSnapshot(EMPTY_SNAPSHOT)
      }
    }
    void loadSnapshot()
    const timer = window.setInterval(() => {
      void loadSnapshot()
    }, POLL_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  return snapshot
}
