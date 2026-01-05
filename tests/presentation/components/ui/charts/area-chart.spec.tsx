import { render, screen } from '@testing-library/react'
import { AreaChart } from '@/presentation/react/components/ui/charts/area-chart'
import { vi, describe, test, expect } from 'vitest'

// Mock Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: unknown }) => (
    <div data-testid="responsive-container">{children as React.ReactNode}</div>
  ),
  AreaChart: ({ children }: { children: unknown }) => (
    <div data-testid="recharts-area-chart">{children as React.ReactNode}</div>
  ),
  Area: () => <div data-testid="recharts-area" />,
  XAxis: () => <div data-testid="recharts-xaxis" />,
  YAxis: () => <div data-testid="recharts-yaxis" />,
  CartesianGrid: () => <div data-testid="recharts-cartesian-grid" />,
  Tooltip: () => <div data-testid="recharts-tooltip" />
}))

describe('AreaChart Component', () => {
  const mockData = [
    { name: 'A', value: 100, value2: 150 },
    { name: 'B', value: 200, value2: 250 }
  ]

  const defaultProps = {
    data: mockData,
    xKey: 'name' as const,
    series: [
      { key: 'value', color: '#000' } as const,
      { key: 'value2', color: '#fff' } as const
    ]
  }

  test('renders without crashing', () => {
    render(<AreaChart {...defaultProps} />)
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('recharts-area-chart')).toBeInTheDocument()
  })

  test('renders correct number of areas', () => {
    const props = {
      ...defaultProps,
      series: [
        { key: 'value', color: '#000' } as const,
        { key: 'value2', color: '#fff' } as const
      ]
    }
    render(<AreaChart {...props} />)
    expect(screen.getAllByTestId('recharts-area')).toHaveLength(2)
  })

  test('hides grid when showGrid is false', () => {
    render(<AreaChart {...defaultProps} showGrid={false} />)
    expect(
      screen.queryByTestId('recharts-cartesian-grid')
    ).not.toBeInTheDocument()
  })

  test('renders gradients when enabled in series', () => {
    const props = {
      ...defaultProps,
      series: [{ key: 'value', color: '#000', gradient: true } as const]
    }
    const { container } = render(<AreaChart {...props} />)
    // Check if linearGradient is rendered. It's an SVG element, so we use container selector.
    // The implementation uses id={`gradient-${i}`}
    const gradient = container.querySelector('#gradient-0')
    expect(gradient).toBeInTheDocument()
  })
})
