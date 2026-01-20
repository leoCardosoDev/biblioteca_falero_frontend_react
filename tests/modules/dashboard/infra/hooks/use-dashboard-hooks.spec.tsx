/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createDashboardHooks } from '@/modules/dashboard/infra/hooks/use-dashboard-hooks'
import type { DashboardRepository } from '@/modules/dashboard/application/protocols'
import type {
  DashboardStat,
  LoanFlowDataPoint,
  TopBookItem,
  AttentionItem
} from '@/modules/dashboard/domain'

const makeMockRepository = (): DashboardRepository => ({
  loadStats: vi.fn(),
  loadLoanFlowData: vi.fn(),
  loadTopBooks: vi.fn(),
  loadAttentionItems: vi.fn()
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

describe('createDashboardHooks', () => {
  let mockRepository: DashboardRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
  })

  describe('useDashboardStats', () => {
    it('should call repository.loadStats when hook is used', async () => {
      const mockStats: DashboardStat[] = [
        {
          title: 'Test',
          value: 100,
          icon: 'test',
          colorClass: 'text-primary'
        }
      ]
      vi.mocked(mockRepository.loadStats).mockResolvedValue(mockStats)
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useDashboardStats(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(mockRepository.loadStats).toHaveBeenCalledTimes(1)
      expect(result.current.data).toEqual(mockStats)
    })

    it('should handle loading state', () => {
      vi.mocked(mockRepository.loadStats).mockImplementation(
        () => new Promise(() => {})
      )
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useDashboardStats(), {
        wrapper: createWrapper()
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('should handle error state', async () => {
      vi.mocked(mockRepository.loadStats).mockRejectedValue(
        new Error('API Error')
      )
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useDashboardStats(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isError).toBe(true))
    })
  })

  describe('useLoanFlowData', () => {
    it('should return loan flow data from repository', async () => {
      const mockData: LoanFlowDataPoint[] = [{ name: 'Jan', loans: 50 }]
      vi.mocked(mockRepository.loadLoanFlowData).mockResolvedValue(mockData)
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useLoanFlowData(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toEqual(mockData)
    })
  })

  describe('useTopBooks', () => {
    it('should return top books from repository', async () => {
      const mockBooks: TopBookItem[] = [
        {
          title: 'Test Book',
          loans: 10,
          percentage: '50%',
          color: 'bg-primary'
        }
      ]
      vi.mocked(mockRepository.loadTopBooks).mockResolvedValue(mockBooks)
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useTopBooks(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toEqual(mockBooks)
    })
  })

  describe('useAttentionItems', () => {
    it('should return attention items from repository', async () => {
      const mockItems: AttentionItem[] = [
        {
          id: '1',
          bookTitle: 'Test Book',
          userName: 'Test User',
          userId: 'user-1',
          status: 'overdue',
          statusLabel: 'Overdue'
        }
      ]
      vi.mocked(mockRepository.loadAttentionItems).mockResolvedValue(mockItems)
      const hooks = createDashboardHooks(mockRepository)

      const { result } = renderHook(() => hooks.useAttentionItems(), {
        wrapper: createWrapper()
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toEqual(mockItems)
    })
  })
})
