/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createDashboardFacade } from '@/modules/dashboard/infra/hooks/use-dashboard-facade'
import type { DashboardRepository } from '@/modules/dashboard/application/protocols'

const makeMockRepository = (): DashboardRepository => ({
  loadStats: vi.fn().mockResolvedValue([]),
  loadLoanFlowData: vi.fn().mockResolvedValue([]),
  loadTopBooks: vi.fn().mockResolvedValue([]),
  loadAttentionItems: vi.fn().mockResolvedValue([])
})

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('createDashboardFacade', () => {
  let mockRepository: DashboardRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
  })

  describe('useDashboardFacade', () => {
    it('should return aggregated data from all hooks', async () => {
      const mockStats = [
        { title: 'Test', value: 100, icon: 'test', colorClass: 'text-primary' }
      ]
      const mockLoanFlow = [{ name: 'Jan', loans: 50 }]
      const mockTopBooks = [
        { title: 'Book', loans: 10, percentage: '50%', color: 'bg-primary' }
      ]
      const mockAttention = [
        {
          id: '1',
          bookTitle: 'Book',
          userName: 'User',
          userId: 'u1',
          status: 'overdue' as const,
          statusLabel: 'Overdue'
        }
      ]

      vi.mocked(mockRepository.loadStats).mockResolvedValue(mockStats)
      vi.mocked(mockRepository.loadLoanFlowData).mockResolvedValue(mockLoanFlow)
      vi.mocked(mockRepository.loadTopBooks).mockResolvedValue(mockTopBooks)
      vi.mocked(mockRepository.loadAttentionItems).mockResolvedValue(
        mockAttention
      )

      const facade = createDashboardFacade(mockRepository)

      const { result } = renderHook(() => facade.useDashboardFacade(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.stats).toEqual(mockStats)
      expect(result.current.loanFlowData).toEqual(mockLoanFlow)
      expect(result.current.topBooks).toEqual(mockTopBooks)
      expect(result.current.attentionItems).toEqual(mockAttention)
    })

    it('should return isLoading true while any query is loading', () => {
      vi.mocked(mockRepository.loadStats).mockImplementation(
        () => new Promise(() => {})
      )

      const facade = createDashboardFacade(mockRepository)

      const { result } = renderHook(() => facade.useDashboardFacade(), {
        wrapper: createWrapper()
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('should return isError true if any query fails', async () => {
      vi.mocked(mockRepository.loadStats).mockRejectedValue(new Error('Failed'))

      const facade = createDashboardFacade(mockRepository)

      const { result } = renderHook(() => facade.useDashboardFacade(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isError).toBe(true))
    })

    it('should return empty arrays when data is undefined', async () => {
      vi.mocked(mockRepository.loadStats).mockResolvedValue(undefined as never)
      vi.mocked(mockRepository.loadLoanFlowData).mockResolvedValue(
        undefined as never
      )
      vi.mocked(mockRepository.loadTopBooks).mockResolvedValue(
        undefined as never
      )
      vi.mocked(mockRepository.loadAttentionItems).mockResolvedValue(
        undefined as never
      )

      const facade = createDashboardFacade(mockRepository)

      const { result } = renderHook(() => facade.useDashboardFacade(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.stats).toEqual([])
      expect(result.current.loanFlowData).toEqual([])
      expect(result.current.topBooks).toEqual([])
      expect(result.current.attentionItems).toEqual([])
    })
  })

  describe('exposes underlying hooks', () => {
    it('should expose useDashboardStats', () => {
      const facade = createDashboardFacade(mockRepository)
      expect(facade.useDashboardStats).toBeDefined()
    })

    it('should expose useLoanFlowData', () => {
      const facade = createDashboardFacade(mockRepository)
      expect(facade.useLoanFlowData).toBeDefined()
    })

    it('should expose useTopBooks', () => {
      const facade = createDashboardFacade(mockRepository)
      expect(facade.useTopBooks).toBeDefined()
    })

    it('should expose useAttentionItems', () => {
      const facade = createDashboardFacade(mockRepository)
      expect(facade.useAttentionItems).toBeDefined()
    })
  })
})
