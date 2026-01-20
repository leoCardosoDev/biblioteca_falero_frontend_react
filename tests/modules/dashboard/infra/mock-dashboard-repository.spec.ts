import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MockDashboardRepository } from '@/modules/dashboard/infra/mock-dashboard-repository'
import type { DashboardRepository } from '@/modules/dashboard/application/protocols'

describe('MockDashboardRepository', () => {
  let sut: DashboardRepository

  beforeEach(() => {
    sut = new MockDashboardRepository()
  })

  describe('loadStats', () => {
    it('should return an array of DashboardStat', async () => {
      const result = await sut.loadStats()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return stats with required properties', async () => {
      const result = await sut.loadStats()
      const stat = result[0]

      expect(stat).toHaveProperty('title')
      expect(stat).toHaveProperty('value')
      expect(stat).toHaveProperty('icon')
      expect(stat).toHaveProperty('colorClass')
    })

    it('should return consistent data across multiple calls', async () => {
      const result1 = await sut.loadStats()
      const result2 = await sut.loadStats()

      expect(result1).toEqual(result2)
    })
  })

  describe('loadLoanFlowData', () => {
    it('should return an array of LoanFlowDataPoint', async () => {
      const result = await sut.loadLoanFlowData()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return loan flow data with required properties', async () => {
      const result = await sut.loadLoanFlowData()
      const dataPoint = result[0]

      expect(dataPoint).toHaveProperty('name')
      expect(dataPoint).toHaveProperty('loans')
      expect(typeof dataPoint.loans).toBe('number')
    })
  })

  describe('loadTopBooks', () => {
    it('should return an array of TopBookItem', async () => {
      const result = await sut.loadTopBooks()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return top books with required properties', async () => {
      const result = await sut.loadTopBooks()
      const book = result[0]

      expect(book).toHaveProperty('title')
      expect(book).toHaveProperty('loans')
      expect(book).toHaveProperty('percentage')
      expect(book).toHaveProperty('color')
    })
  })

  describe('loadAttentionItems', () => {
    it('should return an array of AttentionItem', async () => {
      const result = await sut.loadAttentionItems()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return attention items with required properties', async () => {
      const result = await sut.loadAttentionItems()
      const item = result[0]

      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('bookTitle')
      expect(item).toHaveProperty('userName')
      expect(item).toHaveProperty('userId')
      expect(item).toHaveProperty('status')
      expect(item).toHaveProperty('statusLabel')
    })

    it('should return items with valid status values', async () => {
      const result = await sut.loadAttentionItems()

      result.forEach((item) => {
        expect(['overdue', 'maintenance']).toContain(item.status)
      })
    })
  })

  describe('Empty Dashboard State', () => {
    it('should handle empty stats gracefully', async () => {
      const emptyRepo = {
        loadStats: vi.fn().mockResolvedValue([]),
        loadLoanFlowData: vi.fn().mockResolvedValue([]),
        loadTopBooks: vi.fn().mockResolvedValue([]),
        loadAttentionItems: vi.fn().mockResolvedValue([])
      }

      const stats = await emptyRepo.loadStats()
      const loanFlow = await emptyRepo.loadLoanFlowData()
      const topBooks = await emptyRepo.loadTopBooks()
      const attentionItems = await emptyRepo.loadAttentionItems()

      expect(stats).toEqual([])
      expect(loanFlow).toEqual([])
      expect(topBooks).toEqual([])
      expect(attentionItems).toEqual([])
    })
  })
})
