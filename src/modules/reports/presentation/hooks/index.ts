import { HttpReportsRepository } from '@/modules/reports/infra'
import {
  createUseReportsQuery,
  createUseCategoryChartQuery,
  createUseActivityChartQuery
} from '@/modules/reports/infra'
import { apiClient } from '@/shared/infra/http/axios-adapter'

const API_BASE_URL = '/api'
const reportsRepository = new HttpReportsRepository(apiClient, API_BASE_URL)

export const useReports = createUseReportsQuery(reportsRepository)
export const useCategoryChart = createUseCategoryChartQuery(reportsRepository)
export const useActivityChart = createUseActivityChartQuery(reportsRepository)
