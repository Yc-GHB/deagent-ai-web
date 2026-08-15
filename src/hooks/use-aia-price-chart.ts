import { useQuery } from '@tanstack/react-query'
import type { AiaChartPeriod, AiaPriceChartResponse } from '@/types/aia-price-chart'

async function fetchAiaPriceChart(period: AiaChartPeriod): Promise<AiaPriceChartResponse['data']> {
  const response = await fetch(`/api/buyback/aia-chart?period=${period}`)
  const result = (await response.json()) as AiaPriceChartResponse
  if (!result.success || !result.data) {
    throw new Error(result.error ?? '获取 AIA 价格失败')
  }
  return result.data
}

/** 获取 AIA 价格趋势数据 */
export function useAiaPriceChart(period: AiaChartPeriod) {
  return useQuery({
    queryKey: ['aia-price-chart', period],
    queryFn: () => fetchAiaPriceChart(period),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
