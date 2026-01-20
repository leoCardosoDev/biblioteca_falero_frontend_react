/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

import type { ReportsRepository } from '@/modules/reports/application'
import { GetDashboardStatsUseCase } from '@/modules/reports/application'
import type {
  Report,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '@/modules/reports/domain'

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Sales',
    format: 'PDF',
    category: 'Sales',
    size: '2.5 MB',
    date: '2026-01-15'
  },
  {
    id: '2',
    title: 'Inventory Report',
    format: 'CSV',
    category: 'Inventory',
    size: '1.2 MB',
    date: '2026-01-10'
  }
]

const mockCategoryData: CategoryChartDataPoint[] = [
  { name: 'Fiction', value: 150 },
  { name: 'Non-Fiction', value: 100 }
]

const mockActivityData: ActivityChartDataPoint[] = [
  { name: 'Jan', loans: 50, returns: 40 },
  { name: 'Feb', loans: 60, returns: 55 }
]

const makeRepositorySpy = (): ReportsRepository => ({
  loadReports: vi.fn().mockResolvedValue(mockReports),
  loadCategoryChartData: vi.fn().mockResolvedValue(mockCategoryData),
  loadActivityChartData: vi.fn().mockResolvedValue(mockActivityData)
})

describe('GetDashboardStatsUseCase', () => {
  let sut: GetDashboardStatsUseCase
  let repositorySpy: ReportsRepository

  beforeEach(() => {
    repositorySpy = makeRepositorySpy()
    sut = new GetDashboardStatsUseCase(repositorySpy)
  })

  it('should call loadReports on repository', async () => {
    await sut.execute()

    expect(repositorySpy.loadReports).toHaveBeenCalledTimes(1)
  })

  it('should call loadCategoryChartData on repository', async () => {
    await sut.execute()

    expect(repositorySpy.loadCategoryChartData).toHaveBeenCalledTimes(1)
  })

  it('should call loadActivityChartData on repository', async () => {
    await sut.execute()

    expect(repositorySpy.loadActivityChartData).toHaveBeenCalledTimes(1)
  })

  it('should return reports from repository', async () => {
    const result = await sut.execute()

    expect(result.reports).toEqual(mockReports)
  })

  it('should return categoryData from repository', async () => {
    const result = await sut.execute()

    expect(result.categoryData).toEqual(mockCategoryData)
  })

  it('should return activityData from repository', async () => {
    const result = await sut.execute()

    expect(result.activityData).toEqual(mockActivityData)
  })

  it('should return all dashboard stats aggregated', async () => {
    const result = await sut.execute()

    expect(result).toEqual({
      reports: mockReports,
      categoryData: mockCategoryData,
      activityData: mockActivityData
    })
  })

  it('should throw if loadReports fails', async () => {
    const error = new Error('Failed to load reports')
    vi.mocked(repositorySpy.loadReports).mockRejectedValueOnce(error)

    await expect(sut.execute()).rejects.toThrow('Failed to load reports')
  })

  it('should throw if loadCategoryChartData fails', async () => {
    const error = new Error('Failed to load category data')
    vi.mocked(repositorySpy.loadCategoryChartData).mockRejectedValueOnce(error)

    await expect(sut.execute()).rejects.toThrow('Failed to load category data')
  })

  it('should throw if loadActivityChartData fails', async () => {
    const error = new Error('Failed to load activity data')
    vi.mocked(repositorySpy.loadActivityChartData).mockRejectedValueOnce(error)

    await expect(sut.execute()).rejects.toThrow('Failed to load activity data')
  })

  it('should execute all repository calls in parallel', async () => {
    const callOrder: string[] = []
    vi.mocked(repositorySpy.loadReports).mockImplementation(async () => {
      callOrder.push('reports-start')
      await new Promise((resolve) => setTimeout(resolve, 10))
      callOrder.push('reports-end')
      return mockReports
    })
    vi.mocked(repositorySpy.loadCategoryChartData).mockImplementation(
      async () => {
        callOrder.push('category-start')
        await new Promise((resolve) => setTimeout(resolve, 10))
        callOrder.push('category-end')
        return mockCategoryData
      }
    )
    vi.mocked(repositorySpy.loadActivityChartData).mockImplementation(
      async () => {
        callOrder.push('activity-start')
        await new Promise((resolve) => setTimeout(resolve, 10))
        callOrder.push('activity-end')
        return mockActivityData
      }
    )

    await sut.execute()

    expect(callOrder.slice(0, 3)).toContain('reports-start')
    expect(callOrder.slice(0, 3)).toContain('category-start')
    expect(callOrder.slice(0, 3)).toContain('activity-start')
  })
})
