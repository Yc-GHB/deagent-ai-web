'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Locale } from '@/i18n/locales'
import { fetchScreenerMarkets, fetchScreenerRun, RUN_LIMIT } from '@/services/screener-service'
import { ScreenerApiError } from '@/types/screener'
import type { ScreenerGroup, ScreenerStrategy, ScreenerThresholds } from '@/types/screener'
import {
  SCREENER_STRATEGIES,
  STRATEGY_DEFAULTS,
  STRATEGY_SORT,
  sortScreenedMarkets,
  toScreenerLocale,
} from '@/utils/screener-format'

const REFRESH_MS = 45_000
const STALE_MS = 10_000
const SLIDER_DEBOUNCE_MS = 220

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function shouldRetry(error: unknown): boolean {
  if (!(error instanceof ScreenerApiError)) return true
  if (error.status === 422 || error.status === 429) return false
  return error.status === 500 || error.status === 503
}

/**
 * Hyperliquid screener：市场快照 + 策略筛选。
 */
export function useScreener(locale: Locale) {
  const [strategy, setStrategy] = useState<ScreenerStrategy>('funding_arb')
  const [group, setGroup] = useState<ScreenerGroup>('all')
  const [guard, setGuard] = useState(true)
  const [thresholds, setThresholds] = useState<ScreenerThresholds>(STRATEGY_DEFAULTS.funding_arb)
  const debouncedThresholds = useDebouncedValue(thresholds, SLIDER_DEBOUNCE_MS)
  const screenerLocale = toScreenerLocale(locale)

  const marketsQuery = useQuery({
    queryKey: ['screener-markets'],
    queryFn: ({ signal }) => fetchScreenerMarkets(signal),
    staleTime: STALE_MS,
    refetchInterval: REFRESH_MS,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 3,
  })

  const runQuery = useQuery({
    queryKey: ['screener-run', strategy, group, guard, debouncedThresholds, screenerLocale],
    queryFn: ({ signal }) =>
      fetchScreenerRun(
        {
          strategy,
          group,
          vol: debouncedThresholds.vol,
          fund: debouncedThresholds.fund,
          chg: debouncedThresholds.chg,
          guard,
          limit: RUN_LIMIT,
          locale: screenerLocale,
        },
        signal,
      ),
    staleTime: STALE_MS,
    refetchInterval: REFRESH_MS,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 3,
  })

  const selectStrategy = (next: ScreenerStrategy): void => {
    setStrategy(next)
    setThresholds(STRATEGY_DEFAULTS[next])
  }

  const run = runQuery.data
  const isCurrentRun = useMemo(() => {
    if (!run) return false
    return (
      run.strategy === strategy &&
      run.group === group &&
      run.guard === guard &&
      run.thresholds.vol === debouncedThresholds.vol &&
      run.thresholds.fund === debouncedThresholds.fund &&
      run.thresholds.chg === debouncedThresholds.chg
    )
  }, [debouncedThresholds, group, guard, run, strategy])
  const sortedRun = useMemo(() => {
    if (!isCurrentRun || !run) return undefined
    return {
      ...run,
      results: sortScreenedMarkets(run.results, STRATEGY_SORT[strategy]),
    }
  }, [isCurrentRun, run, strategy])

  return {
    strategy,
    strategies: SCREENER_STRATEGIES,
    group,
    guard,
    thresholds,
    markets: marketsQuery.data,
    run: sortedRun,
    isMarketsLoading: marketsQuery.isLoading,
    isRunLoading: runQuery.isLoading || runQuery.isFetching,
    hasRunError: runQuery.isError,
    selectStrategy,
    setGroup,
    setGuard,
    setThresholds,
  }
}
