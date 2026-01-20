import { useQuery } from '@tanstack/react-query'

import type { ReportsRepository } from '../../application'

const REPORTS_KEY = ['reports', 'list']
const CATEGORY_CHART_KEY = ['reports', 'category-chart']
const ACTIVITY_CHART_KEY = ['reports', 'activity-chart']

export function createUseReportsQuery(repository: ReportsRepository) {
  return function useReportsQuery() {
    return useQuery({
      queryKey: REPORTS_KEY,
      queryFn: () => repository.loadReports()
    })
  }
}

export function createUseCategoryChartQuery(repository: ReportsRepository) {
  return function useCategoryChartQuery() {
    return useQuery({
      queryKey: CATEGORY_CHART_KEY,
      queryFn: () => repository.loadCategoryChartData()
    })
  }
}

export function createUseActivityChartQuery(repository: ReportsRepository) {
  return function useActivityChartQuery() {
    return useQuery({
      queryKey: ACTIVITY_CHART_KEY,
      queryFn: () => repository.loadActivityChartData()
    })
  }
}
