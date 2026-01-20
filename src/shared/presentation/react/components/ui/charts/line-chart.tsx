import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface LineChartProps<T> {
  data: T[]
  xKey: keyof T
  series: {
    key: keyof T
    color: string
    name?: string
  }[]
  height?: number | string
}

export function LineChart<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = '100%'
}: LineChartProps<T>) {
  return (
    <ResponsiveContainer
      width="100%"
      height={
        height as React.ComponentProps<typeof ResponsiveContainer>['height']
      }
    >
      <RechartsLineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#334155"
          vertical={false}
        />
        <XAxis
          dataKey={String(xKey)}
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e2a36',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        {series.map((s) => (
          <Line
            key={String(s.key)}
            type="monotone"
            dataKey={String(s.key)}
            name={s.name}
            stroke={s.color}
            strokeWidth={3}
            dot={{ r: 4, fill: s.color }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
