export type ReportFormat = 'PDF' | 'XLSX' | 'CSV'

export interface Report {
  id: string | number
  title: string
  format: ReportFormat
  category: string
  size: string
  date: string
}

export interface CategoryChartDataPoint {
  name: string
  value: number
}

export interface ActivityChartDataPoint {
  name: string
  loans: number
  returns: number
}
