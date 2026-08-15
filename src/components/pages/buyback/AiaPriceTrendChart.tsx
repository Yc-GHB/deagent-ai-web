'use client'

import { FC, useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AiaChartSeriesPoint } from '@/utils/aia-price-chart'
import { formatChartAxisPrice, formatUsdPrice } from '@/utils/aia-price-chart'

interface AiaPriceTrendChartProps {
  points: AiaChartSeriesPoint[]
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: AiaChartSeriesPoint }>
}

const ChartTooltip: FC<ChartTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null
  }
  const point = payload[0].payload
  const timeLabel = new Date(point.timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
  return (
    <div className="aia-chart-tooltip">
      <span>{timeLabel}</span>
      <strong>{formatUsdPrice(point.price)}</strong>
      {point.isBurnEvent && <em>Burn event</em>}
    </div>
  )
}

const renderBurnDot = (props: unknown) => {
  const { cx, cy, payload } = props as { cx?: number; cy?: number; payload?: AiaChartSeriesPoint }
  if (!payload?.isBurnEvent || cx === undefined || cy === undefined) {
    return <g />
  }
  return <circle cx={cx} cy={cy} r={5} fill="#06151a" stroke="#00F2FF" strokeWidth={2} />
}

const AiaPriceTrendChart: FC<AiaPriceTrendChartProps> = ({ points }) => {
  const xTicks = useMemo(() => {
    if (points.length <= 1) {
      return []
    }
    const tickCount = 5
    return Array.from({ length: tickCount }, (_, index) => {
      const pointIndex = Math.round((index * (points.length - 1)) / (tickCount - 1))
      return points[pointIndex].timestamp
    })
  }, [points])
  return (
    <div className="aia-price-chart">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="aiaPriceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F2FF" stopOpacity={0.34} />
              <stop offset="100%" stopColor="#00F2FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(108, 144, 151, 0.12)" vertical={false} />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            ticks={xTicks}
            tickFormatter={(value: number) =>
              new Date(value).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })
            }
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6f9da7', fontSize: 10 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6f9da7', fontSize: 10 }}
            tickFormatter={formatChartAxisPrice}
            width={58}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(0, 242, 255, 0.25)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#6DF9FF"
            strokeWidth={3}
            fill="url(#aiaPriceFill)"
            dot={renderBurnDot}
            activeDot={{ r: 4, fill: '#06151a', stroke: '#00F2FF', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AiaPriceTrendChart
