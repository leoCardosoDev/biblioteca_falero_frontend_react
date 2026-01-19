import { createReportsHooks } from '../../application'
import { MockReportsRepository } from '../../infra'

import { ReportsView } from './ReportsView'

const reportsRepository = new MockReportsRepository()
const reportsHooks = createReportsHooks(reportsRepository)

export function ReportsPage() {
  const { reports, categoryData, activityData, isLoading, isError } =
    reportsHooks.useReportsFacade()

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
        <p className="text-danger">Erro ao carregar relatórios.</p>
      </div>
    )
  }

  return (
    <ReportsView
      reports={reports}
      categoryData={categoryData}
      activityData={activityData}
    />
  )
}
