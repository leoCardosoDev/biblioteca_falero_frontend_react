import { useReports, useCategoryChart, useActivityChart } from '../hooks'
import { ReportsView } from './ReportsView'

export function ReportsPage() {
  const {
    data: reports,
    isLoading: isLoadingReports,
    isError: isErrorReports
  } = useReports()

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory
  } = useCategoryChart()

  const {
    data: activityData,
    isLoading: isLoadingActivity,
    isError: isErrorActivity
  } = useActivityChart()

  const isLoading = isLoadingReports || isLoadingCategory || isLoadingActivity

  const isError = isErrorReports || isErrorCategory || isErrorActivity

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
      reports={reports ?? []}
      categoryData={categoryData ?? []}
      activityData={activityData ?? []}
    />
  )
}
