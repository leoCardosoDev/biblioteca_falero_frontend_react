import type { HttpClient } from '@/shared/application/protocols'
import type { ReportsRepository } from '../../application'
import type {
  Report,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '../../domain'

export class HttpReportsRepository implements ReportsRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string
  ) {}

  async loadReports(): Promise<Report[]> {
    const { body } = await this.httpClient.request({
      url: `${this.baseUrl}/reports`,
      method: 'get'
    })
    return body as Report[]
  }

  async loadCategoryChartData(): Promise<CategoryChartDataPoint[]> {
    const { body } = await this.httpClient.request({
      url: `${this.baseUrl}/reports/categories`,
      method: 'get'
    })
    return body as CategoryChartDataPoint[]
  }

  async loadActivityChartData(): Promise<ActivityChartDataPoint[]> {
    const { body } = await this.httpClient.request({
      url: `${this.baseUrl}/reports/activity`,
      method: 'get'
    })
    return body as ActivityChartDataPoint[]
  }
}
