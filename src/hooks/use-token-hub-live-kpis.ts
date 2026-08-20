'use client'

import { useEffect, useState } from 'react'

/** 设计稿基线时刻（UTC）：从此刻起按伪随机曲线累计。 */
const KPI_EPOCH_MS = Date.UTC(2026, 7, 18, 4, 0, 0)
const BASE_REQUESTS = 1_284_739_261
const BASE_TOKENS_BILLION = 847.26
const TICK_MS = 900

export interface TokenHubLiveKpis {
  readonly requestsLabel: string
  readonly tokensLabel: string
}

/**
 * 确定性伪随机：同一时间戳永远得到同一结果。
 */
function hashNoise(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

/**
 * 多层波形叠加，模拟业务峰谷，而非匀速直线。
 */
function waveFactor(elapsedSeconds: number): number {
  const hour = elapsedSeconds / 3_600
  const dayPhase = (elapsedSeconds % 86_400) / 86_400
  const businessHoursBoost = 0.72 + 0.55 * Math.max(0, Math.sin((dayPhase - 0.12) * Math.PI * 2))
  const weeklyRipple = 1 + 0.08 * Math.sin((hour / 24) * (Math.PI * 2) / 7 + 1.7)
  const microBurst = 1 + 0.22 * Math.sin(elapsedSeconds / 37) * Math.sin(elapsedSeconds / 11.3)
  const rareSpike = hashNoise(Math.floor(elapsedSeconds / 47)) > 0.93 ? 1.8 : 1
  return businessHoursBoost * weeklyRipple * microBurst * rareSpike
}

function requestsRateAt(elapsedSeconds: number): number {
  return 9.5 + 18 * waveFactor(elapsedSeconds) + 6 * hashNoise(elapsedSeconds * 0.017)
}

function tokensPerMinuteAt(minuteIndex: number): number {
  const elapsedSeconds = minuteIndex * 60
  return (
    0.0048 *
    waveFactor(elapsedSeconds) *
    (0.85 + 0.4 * hashNoise(minuteIndex * 1.91)) *
    (hashNoise(minuteIndex * 0.37) > 0.88 ? 1.65 : 1)
  )
}

/**
 * 按秒积分：每秒增量随噪声变化，累计不可一眼看穿。
 */
function accumulateRequests(elapsedSeconds: number): number {
  const wholeSeconds = Math.floor(elapsedSeconds)
  let total = 0
  const coarseStep = 60
  let second = 0
  while (second + coarseStep <= wholeSeconds) {
    const mid = second + coarseStep / 2
    total += requestsRateAt(mid) * coarseStep
    second += coarseStep
  }
  while (second <= wholeSeconds) {
    total += requestsRateAt(second)
    second += 1
  }
  total += requestsRateAt(elapsedSeconds) * (elapsedSeconds - wholeSeconds)
  return Math.floor(total)
}

function accumulateTokensBillion(elapsedSeconds: number): number {
  const wholeMinutes = Math.floor(elapsedSeconds / 60)
  let total = 0
  const coarseStep = 30
  let minute = 0
  while (minute + coarseStep <= wholeMinutes) {
    const mid = minute + Math.floor(coarseStep / 2)
    total += tokensPerMinuteAt(mid) * coarseStep
    minute += coarseStep
  }
  while (minute < wholeMinutes) {
    total += tokensPerMinuteAt(minute)
    minute += 1
  }
  const minuteFraction = (elapsedSeconds - wholeMinutes * 60) / 60
  total += tokensPerMinuteAt(wholeMinutes) * minuteFraction
  return total
}

function readLiveKpis(nowMs: number): TokenHubLiveKpis {
  const elapsedSeconds = Math.max(0, (nowMs - KPI_EPOCH_MS) / 1_000)
  const requests = BASE_REQUESTS + accumulateRequests(elapsedSeconds)
  const tokensBillion = BASE_TOKENS_BILLION + accumulateTokensBillion(elapsedSeconds)
  return {
    requestsLabel: requests.toLocaleString('en-US'),
    tokensLabel: tokensBillion.toFixed(2),
  }
}

/**
 * 根据固定时间戳计算当前 KPI，并以不规则节奏缓慢跳动。
 */
export function useTokenHubLiveKpis(): TokenHubLiveKpis {
  const [kpis, setKpis] = useState<TokenHubLiveKpis>(() => ({
    requestsLabel: BASE_REQUESTS.toLocaleString('en-US'),
    tokensLabel: BASE_TOKENS_BILLION.toFixed(2),
  }))

  useEffect(() => {
    let timer: number | undefined
    const scheduleNext = (): void => {
      setKpis(readLiveKpis(Date.now()))
      const delay = TICK_MS + Math.floor(hashNoise(Date.now() / 1_000) * 700)
      timer = window.setTimeout(scheduleNext, delay)
    }
    scheduleNext()
    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  return kpis
}
