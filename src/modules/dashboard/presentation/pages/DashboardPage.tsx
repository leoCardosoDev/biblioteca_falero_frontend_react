import { createDashboardFacade, MockDashboardRepository } from '../../infra'

import { DashboardView } from './DashboardView'

const dashboardRepository = new MockDashboardRepository()
const dashboardFacade = createDashboardFacade(dashboardRepository)

export function DashboardPage() {
  const { stats, loanFlowData, topBooks, attentionItems, isLoading, isError } =
    dashboardFacade.useDashboardFacade()

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-400">Carregando...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-danger">Erro ao carregar dados do dashboard.</p>
      </div>
    )
  }

  return (
    <DashboardView
      stats={stats}
      loanFlowData={loanFlowData}
      topBooks={topBooks}
      attentionItems={attentionItems}
    />
  )
}
