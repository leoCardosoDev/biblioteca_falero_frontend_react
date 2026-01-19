import type {
  Report,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '../../domain'

export interface ReportsRepository {
  loadReports(): Promise<Report[]>
  loadCategoryChartData(): Promise<CategoryChartDataPoint[]>
  loadActivityChartData(): Promise<ActivityChartDataPoint[]>
}
