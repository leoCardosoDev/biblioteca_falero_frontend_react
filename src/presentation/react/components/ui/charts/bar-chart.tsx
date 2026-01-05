import React from 'react'
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface BarChartProps<T> {
  data: T[]
  xKey: keyof T
  yKey: keyof T // Used for category axis in vertical layout
  series: {
    key: keyof T
    color: string
    name?: string
  }[]
  layout?: 'horizontal' | 'vertical'
  height?: number | string
}

export function BarChart<T extends Record<string, unknown>>({
  data,
  xKey,
  yKey,
  series,
  layout = 'horizontal',
  height = '100%'
}: BarChartProps<T>) {
  return (
    <ResponsiveContainer
      width="100%"
      height={
        height as React.ComponentProps<typeof ResponsiveContainer>['height']
      }
    >
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#334155"
          horizontal={layout === 'horizontal'}
          vertical={layout === 'vertical'}
        />
        {layout === 'vertical' ? (
          <>
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey={String(yKey)}
              type="category"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
          </>
        ) : (
          <>
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
          </>
        )}

        <Tooltip
          contentStyle={{
            backgroundColor: '#1e2a36',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          itemStyle={{ color: '#fff' }}
          cursor={{ fill: '#ffffff10' }}
        />
        {series.map((s) => (
          <Bar
            key={String(s.key)}
            dataKey={String(s.key)}
            name={s.name}
            fill={s.color}
            radius={layout === 'vertical' ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            barSize={20}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
