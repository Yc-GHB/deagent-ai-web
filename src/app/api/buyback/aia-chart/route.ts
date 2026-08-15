import { NextRequest, NextResponse } from 'next/server'
import { fetchAiaMarketChart } from '@/services/coingecko-service'
import type { AiaChartPeriod } from '@/types/aia-price-chart'

const VALID_PERIODS: AiaChartPeriod[] = ['7D', '30D', '90D', 'ALL']

function isValidPeriod(value: string | null): value is AiaChartPeriod {
  return VALID_PERIODS.includes(value as AiaChartPeriod)
}

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get('period')
  if (!isValidPeriod(period)) {
    return NextResponse.json(
      { success: false, error: '无效的 period 参数' },
      { status: 400 },
    )
  }
  try {
    const data = await fetchAiaMarketChart(period)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : '获取 AIA 价格失败'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
