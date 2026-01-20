import React from 'react'
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface AreaChartProps<T> {
  data: T[]
  xKey: keyof T
  series: {
    key: keyof T
    color: string
    name?: string
    gradient?: boolean
  }[]
  height?: number | string
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
}

export function AreaChart<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = '100%',
  showGrid = true,
  showXAxis = true,
  showYAxis = true
}: AreaChartProps<T>) {
  return (
    <ResponsiveContainer
      width="100%"
      height={
        height as React.ComponentProps<typeof ResponsiveContainer>['height']
      }
    >
      <RechartsAreaChart data={data}>
        <defs>
          {series
            .filter((s) => s.gradient)
            .map((s, i) => (
              <linearGradient
                key={String(s.key)}
                id={`gradient-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
        </defs>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />
        )}
        <XAxis
          dataKey={String(xKey)}
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          hide={!showXAxis}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          hide={!showYAxis}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e2a36',
            border: 'none',
            borderRadius: '8px'
          }}
          itemStyle={{ color: '#fff' }}
        />
        {series.map((s, i) => (
          <Area
            key={String(s.key)}
            type="monotone"
            dataKey={String(s.key)}
            name={s.name}
            stroke={s.color}
            strokeWidth={3}
            fillOpacity={1}
            fill={s.gradient ? `url(#gradient-${i})` : s.color}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
