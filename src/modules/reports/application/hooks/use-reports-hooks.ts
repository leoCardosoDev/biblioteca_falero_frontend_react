import { useQuery } from '@tanstack/react-query'

import type { ReportsRepository } from '../protocols'

const REPORTS_KEY = ['reports', 'list']
const CATEGORY_CHART_KEY = ['reports', 'category-chart']
const ACTIVITY_CHART_KEY = ['reports', 'activity-chart']

export function createReportsHooks(repository: ReportsRepository) {
  function useReports() {
    return useQuery({
      queryKey: REPORTS_KEY,
      queryFn: () => repository.loadReports()
    })
  }

  function useCategoryChartData() {
    return useQuery({
      queryKey: CATEGORY_CHART_KEY,
      queryFn: () => repository.loadCategoryChartData()
    })
  }

  function useActivityChartData() {
    return useQuery({
      queryKey: ACTIVITY_CHART_KEY,
      queryFn: () => repository.loadActivityChartData()
    })
  }

  function useReportsFacade() {
    const reportsQuery = useReports()
    const categoryQuery = useCategoryChartData()
    const activityQuery = useActivityChartData()

    const isLoading =
      reportsQuery.isLoading ||
      categoryQuery.isLoading ||
      activityQuery.isLoading

    const isError =
      reportsQuery.isError || categoryQuery.isError || activityQuery.isError

    return {
      reports: reportsQuery.data ?? [],
      categoryData: categoryQuery.data ?? [],
      activityData: activityQuery.data ?? [],
      isLoading,
      isError
    }
  }

  return {
    useReports,
    useCategoryChartData,
    useActivityChartData,
    useReportsFacade
  }
}
