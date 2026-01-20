import type { DashboardRepository } from '../../application/protocols'
import { createDashboardHooks } from './use-dashboard-hooks'

export function createDashboardFacade(repository: DashboardRepository) {
  const hooks = createDashboardHooks(repository)

  function useDashboardFacade() {
    const statsQuery = hooks.useDashboardStats()
    const loanFlowQuery = hooks.useLoanFlowData()
    const topBooksQuery = hooks.useTopBooks()
    const attentionQuery = hooks.useAttentionItems()

    const isLoading =
      statsQuery.isLoading ||
      loanFlowQuery.isLoading ||
      topBooksQuery.isLoading ||
      attentionQuery.isLoading

    const isError =
      statsQuery.isError ||
      loanFlowQuery.isError ||
      topBooksQuery.isError ||
      attentionQuery.isError

    return {
      stats: statsQuery.data ?? [],
      loanFlowData: loanFlowQuery.data ?? [],
      topBooks: topBooksQuery.data ?? [],
      attentionItems: attentionQuery.data ?? [],
      isLoading,
      isError
    }
  }

  return {
    ...hooks,
    useDashboardFacade
  }
}
