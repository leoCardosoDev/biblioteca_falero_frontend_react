import { render, screen } from '@testing-library/react'
import { LineChart } from '@/presentation/react/components/ui/charts/line-chart'
import { vi, describe, test, expect } from 'vitest'

// Mock Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: unknown }) => (
    <div data-testid="responsive-container">{children as React.ReactNode}</div>
  ),
  LineChart: ({ children }: { children: unknown }) => (
    <div data-testid="recharts-line-chart">{children as React.ReactNode}</div>
  ),
  Line: () => <div data-testid="recharts-line" />,
  XAxis: () => <div data-testid="recharts-xaxis" />,
  YAxis: () => <div data-testid="recharts-yaxis" />,
  CartesianGrid: () => <div data-testid="recharts-cartesian-grid" />,
  Tooltip: () => <div data-testid="recharts-tooltip" />,
  Legend: () => <div data-testid="recharts-legend" />
}))

describe('LineChart Component', () => {
  const mockData = [
    { name: 'A', value: 100, value2: 150 },
    { name: 'B', value: 200, value2: 250 }
  ]

  const defaultProps = {
    data: mockData,
    xKey: 'name' as const,
    series: [{ key: 'value', color: '#000' } as const]
  }

  test('renders without crashing', () => {
    render(<LineChart {...defaultProps} />)
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('recharts-line-chart')).toBeInTheDocument()
  })

  test('renders correct number of lines', () => {
    const props = {
      ...defaultProps,
      series: [
        { key: 'value', color: '#000' } as const,
        { key: 'value2', color: '#fff' } as const
      ]
    }
    render(<LineChart {...props} />)
    expect(screen.getAllByTestId('recharts-line')).toHaveLength(2)
  })
})
