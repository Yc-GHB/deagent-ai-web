import type { AiaPricePoint } from '@/types/aia-price-chart'

/** Recharts 图表数据点 */
export interface AiaChartSeriesPoint {
  timestamp: number
  label: string
  price: number
  isBurnEvent: boolean
}

/** Recharts 图表序列 */
export interface AiaChartSeries {
  points: AiaChartSeriesPoint[]
  currentPrice: string
}

const TARGET_POINT_COUNT = 120

/** 格式化 USD 价格显示 */
export function formatUsdPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  if (price >= 0.01) {
    return `$${price.toFixed(4)}`
  }
  return `$${price.toFixed(6)}`
}

/** 均匀采样价格序列 */
function downsamplePrices(prices: AiaPricePoint[]): AiaPricePoint[] {
  if (prices.length <= TARGET_POINT_COUNT) {
    return prices
  }
  const step = (prices.length - 1) / (TARGET_POINT_COUNT - 1)
  return Array.from({ length: TARGET_POINT_COUNT }, (_, index) => {
    const sourceIndex = Math.round(index * step)
    return prices[sourceIndex]
  })
}

/** 在完整价格序列中查找最接近目标时间的价格 */
function findNearestPrice(prices: AiaPricePoint[], targetTimestamp: number): number {
  let closestPrice = prices[0][1]
  let closestDistance = Number.POSITIVE_INFINITY
  for (const [timestamp, price] of prices) {
    const distance = Math.abs(timestamp - targetTimestamp)
    if (distance < closestDistance) {
      closestDistance = distance
      closestPrice = price
    }
  }
  return closestPrice
}

/** 将时间戳格式化为图表标签 */
function formatChartLabel(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** 根据价格序列构建 Recharts 图表数据，burn 标记对齐真实销毁时间 */
export function buildAiaChartSeries(
  prices: AiaPricePoint[],
  burnTimestamps: number[] = [],
): AiaChartSeries | null {
  if (prices.length < 2) {
    return null
  }
  const sampledPrices = downsamplePrices(prices)
  const chartStart = sampledPrices[0][0]
  const chartEnd = sampledPrices[sampledPrices.length - 1][0]
  const pointMap = new Map<number, AiaChartSeriesPoint>()
  for (const [timestamp, price] of sampledPrices) {
    pointMap.set(timestamp, {
      timestamp,
      label: formatChartLabel(timestamp),
      price,
      isBurnEvent: false,
    })
  }
  for (const burnTimestamp of burnTimestamps) {
    if (burnTimestamp < chartStart || burnTimestamp > chartEnd) {
      continue
    }
    const burnPrice = findNearestPrice(prices, burnTimestamp)
    // 去掉过于靠近 burn 的采样点，避免同一位置出现双点
    const nearbyThreshold = 12 * 60 * 60 * 1000
    for (const timestamp of Array.from(pointMap.keys())) {
      if (!pointMap.get(timestamp)?.isBurnEvent && Math.abs(timestamp - burnTimestamp) < nearbyThreshold) {
        pointMap.delete(timestamp)
      }
    }
    pointMap.set(burnTimestamp, {
      timestamp: burnTimestamp,
      label: formatChartLabel(burnTimestamp),
      price: burnPrice,
      isBurnEvent: true,
    })
  }
  const points = Array.from(pointMap.values()).sort((a, b) => a.timestamp - b.timestamp)
  const currentPrice = points[points.length - 1].price
  return {
    points,
    currentPrice: formatUsdPrice(currentPrice),
  }
}

/** Y 轴刻度格式化 */
export function formatChartAxisPrice(value: number): string {
  if (value >= 1) {
    return `$${value.toFixed(2)}`
  }
  if (value >= 0.01) {
    return `$${value.toFixed(4)}`
  }
  return `$${value.toFixed(6)}`
}
