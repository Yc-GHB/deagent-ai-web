import type { AiaChartPeriod, AiaPricePoint } from '@/types/aia-price-chart'

const AIA_COIN_ID = 'aia'
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'
const COINGECKO_API_KEY = 'CG-H9TKUbuHBxkzH9xDSx164sc9'

const PERIOD_DAYS: Record<AiaChartPeriod, string> = {
  '7D': '7',
  '30D': '30',
  '90D': '90',
  ALL: '365',
}

interface CoinGeckoMarketChart {
  prices: AiaPricePoint[]
}

/** 将价格点归并为 UTC 日线（每天取当日最后一条） */
function aggregateToDailyPrices(prices: AiaPricePoint[]): AiaPricePoint[] {
  const dailyMap = new Map<string, AiaPricePoint>()
  for (const [timestamp, price] of prices) {
    const dayKey = new Date(timestamp).toISOString().slice(0, 10)
    dailyMap.set(dayKey, [timestamp, price])
  }
  return Array.from(dailyMap.values()).sort((a, b) => a[0] - b[0])
}

/** 获取 AIA 历史价格序列（日线） */
export async function fetchAiaMarketChart(period: AiaChartPeriod): Promise<{
  prices: AiaPricePoint[]
  currentPrice: number
}> {
  const days = PERIOD_DAYS[period]
  const url = `${COINGECKO_BASE_URL}/coins/${AIA_COIN_ID}/market_chart?vs_currency=usd&days=${days}&interval=daily`
  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': COINGECKO_API_KEY,
    },
    next: { revalidate: 300 },
  })
  if (!response.ok) {
    throw new Error(`CoinGecko 请求失败: ${response.status}`)
  }
  const data = (await response.json()) as CoinGeckoMarketChart
  if (!data.prices?.length) {
    throw new Error('CoinGecko 返回空价格数据')
  }
  const dailyPrices = aggregateToDailyPrices(data.prices)
  const currentPrice = dailyPrices[dailyPrices.length - 1][1]
  return {
    prices: dailyPrices,
    currentPrice,
  }
}
