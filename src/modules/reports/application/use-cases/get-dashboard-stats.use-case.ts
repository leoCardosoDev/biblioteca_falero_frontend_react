import type { ReportsRepository } from '../protocols'
import type {
  Report,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '../../domain'

export interface DashboardStats {
  reports: Report[]
  categoryData: CategoryChartDataPoint[]
  activityData: ActivityChartDataPoint[]
}

export class GetDashboardStatsUseCase {
  constructor(private readonly repository: ReportsRepository) {}

  async execute(): Promise<DashboardStats> {
    const [reports, categoryData, activityData] = await Promise.all([
      this.repository.loadReports(),
      this.repository.loadCategoryChartData(),
      this.repository.loadActivityChartData()
    ])

    return {
      reports,
      categoryData,
      activityData
    }
  }
}
