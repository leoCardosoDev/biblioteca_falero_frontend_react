/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'

import type {
  Report,
  ReportFormat,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '@/modules/reports/domain'

describe('Reports Domain DTOs', () => {
  describe('Report', () => {
    it('should create a valid Report with PDF format', () => {
      const report: Report = {
        id: '123',
        title: 'Monthly Sales Report',
        format: 'PDF',
        category: 'Sales',
        size: '2.5 MB',
        date: '2026-01-20'
      }

      expect(report.id).toBe('123')
      expect(report.title).toBe('Monthly Sales Report')
      expect(report.format).toBe('PDF')
      expect(report.category).toBe('Sales')
      expect(report.size).toBe('2.5 MB')
      expect(report.date).toBe('2026-01-20')
    })

    it('should create a valid Report with CSV format', () => {
      const report: Report = {
        id: 456,
        title: 'Inventory Export',
        format: 'CSV',
        category: 'Inventory',
        size: '1.0 MB',
        date: '2026-01-15'
      }

      expect(report.id).toBe(456)
      expect(report.format).toBe('CSV')
    })

    it('should create a valid Report with XLSX format', () => {
      const report: Report = {
        id: '789',
        title: 'Financial Summary',
        format: 'XLSX',
        category: 'Finance',
        size: '5.0 MB',
        date: '2026-01-10'
      }

      expect(report.format).toBe('XLSX')
    })

    it('should accept string or number as id', () => {
      const reportWithStringId: Report = {
        id: 'abc-123',
        title: 'Test Report',
        format: 'PDF',
        category: 'Test',
        size: '1 KB',
        date: '2026-01-01'
      }

      const reportWithNumberId: Report = {
        id: 12345,
        title: 'Test Report',
        format: 'PDF',
        category: 'Test',
        size: '1 KB',
        date: '2026-01-01'
      }

      expect(typeof reportWithStringId.id).toBe('string')
      expect(typeof reportWithNumberId.id).toBe('number')
    })
  })

  describe('ReportFormat', () => {
    it('should allow PDF as valid format', () => {
      const format: ReportFormat = 'PDF'
      expect(format).toBe('PDF')
    })

    it('should allow XLSX as valid format', () => {
      const format: ReportFormat = 'XLSX'
      expect(format).toBe('XLSX')
    })

    it('should allow CSV as valid format', () => {
      const format: ReportFormat = 'CSV'
      expect(format).toBe('CSV')
    })
  })

  describe('CategoryChartDataPoint', () => {
    it('should create a valid CategoryChartDataPoint', () => {
      const dataPoint: CategoryChartDataPoint = {
        name: 'Fiction',
        value: 150
      }

      expect(dataPoint.name).toBe('Fiction')
      expect(dataPoint.value).toBe(150)
    })

    it('should accept zero as a valid value', () => {
      const dataPoint: CategoryChartDataPoint = {
        name: 'Empty Category',
        value: 0
      }

      expect(dataPoint.value).toBe(0)
    })
  })

  describe('ActivityChartDataPoint', () => {
    it('should create a valid ActivityChartDataPoint', () => {
      const dataPoint: ActivityChartDataPoint = {
        name: 'January',
        loans: 50,
        returns: 40
      }

      expect(dataPoint.name).toBe('January')
      expect(dataPoint.loans).toBe(50)
      expect(dataPoint.returns).toBe(40)
    })

    it('should accept zero values', () => {
      const dataPoint: ActivityChartDataPoint = {
        name: 'No Activity',
        loans: 0,
        returns: 0
      }

      expect(dataPoint.loans).toBe(0)
      expect(dataPoint.returns).toBe(0)
    })
  })
})
