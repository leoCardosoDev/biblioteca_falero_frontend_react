import { render, screen } from '@testing-library/react'
import { BarChart } from '@/presentation/react/components/ui/charts/bar-chart'
import { vi, describe, test, expect } from 'vitest'

// Mock Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: unknown }) => (
    <div data-testid="responsive-container">{children as React.ReactNode}</div>
  ),
  BarChart: ({ children }: { children: unknown }) => (
    <div data-testid="recharts-bar-chart">{children as React.ReactNode}</div>
  ),
  Bar: () => <div data-testid="recharts-bar" />,
  XAxis: () => <div data-testid="recharts-xaxis" />,
  YAxis: () => <div data-testid="recharts-yaxis" />,
  CartesianGrid: () => <div data-testid="recharts-cartesian-grid" />,
  Tooltip: () => <div data-testid="recharts-tooltip" />,
  Legend: () => <div data-testid="recharts-legend" />
}))

describe('BarChart Component', () => {
  const mockData = [
    { name: 'A', value: 100, value2: 150 },
    { name: 'B', value: 200, value2: 250 }
  ]

  const defaultProps = {
    data: mockData,
    xKey: 'name' as const,
    yKey: 'value' as const,
    series: [{ key: 'value', color: '#000' } as const]
  }

  test('renders without crashing', () => {
    render(<BarChart {...defaultProps} />)
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('recharts-bar-chart')).toBeInTheDocument()
  })

  test('renders correct number of bars', () => {
    const props = {
      ...defaultProps,
      series: [
        { key: 'value', color: '#000' } as const,
        { key: 'value2', color: '#fff' } as const
      ]
    }
    render(<BarChart {...props} />)
    expect(screen.getAllByTestId('recharts-bar')).toHaveLength(2)
  })

  test('renders vertical layout correctly', () => {
    render(<BarChart {...defaultProps} layout="vertical" />)
    // Just verifying it renders without crashing and basic elements are there.
    // The logic inside handles swapping axes, which we want to cover.
    expect(screen.getByTestId('recharts-bar-chart')).toBeInTheDocument()
  })
})
