import { useQuery } from '@tanstack/react-query'

import type { DashboardRepository } from '../protocols'

const DASHBOARD_STATS_KEY = ['dashboard', 'stats']
const LOAN_FLOW_KEY = ['dashboard', 'loan-flow']
const TOP_BOOKS_KEY = ['dashboard', 'top-books']
const ATTENTION_ITEMS_KEY = ['dashboard', 'attention-items']

export function createDashboardHooks(repository: DashboardRepository) {
  function useDashboardStats() {
    return useQuery({
      queryKey: DASHBOARD_STATS_KEY,
      queryFn: () => repository.loadStats()
    })
  }

  function useLoanFlowData() {
    return useQuery({
      queryKey: LOAN_FLOW_KEY,
      queryFn: () => repository.loadLoanFlowData()
    })
  }

  function useTopBooks() {
    return useQuery({
      queryKey: TOP_BOOKS_KEY,
      queryFn: () => repository.loadTopBooks()
    })
  }

  function useAttentionItems() {
    return useQuery({
      queryKey: ATTENTION_ITEMS_KEY,
      queryFn: () => repository.loadAttentionItems()
    })
  }

  return {
    useDashboardStats,
    useLoanFlowData,
    useTopBooks,
    useAttentionItems
  }
}
