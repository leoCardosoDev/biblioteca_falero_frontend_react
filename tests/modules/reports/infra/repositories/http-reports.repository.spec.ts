/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

import type { HttpClient, HttpResponse } from '@/shared/application/protocols'
import { HttpReportsRepository } from '@/modules/reports/infra'
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
  }
]

const mockCategoryData: CategoryChartDataPoint[] = [
  { name: 'Fiction', value: 150 }
]

const mockActivityData: ActivityChartDataPoint[] = [
  { name: 'Jan', loans: 50, returns: 40 }
]

const makeHttpClientSpy = (): HttpClient => ({
  request: vi.fn()
})

describe('HttpReportsRepository', () => {
  let sut: HttpReportsRepository
  let httpClientSpy: HttpClient
  const baseUrl = 'https://api.example.com'

  beforeEach(() => {
    httpClientSpy = makeHttpClientSpy()
    sut = new HttpReportsRepository(httpClientSpy, baseUrl)
  })

  describe('loadReports', () => {
    it('should call httpClient with correct url and method', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockReports
      } as HttpResponse)

      await sut.loadReports()

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        url: `${baseUrl}/reports`,
        method: 'get'
      })
    })

    it('should return reports on success', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockReports
      } as HttpResponse)

      const result = await sut.loadReports()

      expect(result).toEqual(mockReports)
    })

    it('should throw if httpClient throws', async () => {
      vi.mocked(httpClientSpy.request).mockRejectedValueOnce(
        new Error('Network error')
      )

      await expect(sut.loadReports()).rejects.toThrow('Network error')
    })
  })

  describe('loadCategoryChartData', () => {
    it('should call httpClient with correct url and method', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockCategoryData
      } as HttpResponse)

      await sut.loadCategoryChartData()

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        url: `${baseUrl}/reports/categories`,
        method: 'get'
      })
    })

    it('should return category data on success', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockCategoryData
      } as HttpResponse)

      const result = await sut.loadCategoryChartData()

      expect(result).toEqual(mockCategoryData)
    })

    it('should throw if httpClient throws', async () => {
      vi.mocked(httpClientSpy.request).mockRejectedValueOnce(
        new Error('Network error')
      )

      await expect(sut.loadCategoryChartData()).rejects.toThrow('Network error')
    })
  })

  describe('loadActivityChartData', () => {
    it('should call httpClient with correct url and method', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockActivityData
      } as HttpResponse)

      await sut.loadActivityChartData()

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        url: `${baseUrl}/reports/activity`,
        method: 'get'
      })
    })

    it('should return activity data on success', async () => {
      vi.mocked(httpClientSpy.request).mockResolvedValueOnce({
        statusCode: 200,
        body: mockActivityData
      } as HttpResponse)

      const result = await sut.loadActivityChartData()

      expect(result).toEqual(mockActivityData)
    })

    it('should throw if httpClient throws', async () => {
      vi.mocked(httpClientSpy.request).mockRejectedValueOnce(
        new Error('Network error')
      )

      await expect(sut.loadActivityChartData()).rejects.toThrow('Network error')
    })
  })
})
