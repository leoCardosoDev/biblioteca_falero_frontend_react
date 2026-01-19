export interface DashboardStat {
  title: string
  value: string | number
  icon: string
  colorClass: string
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
}

export interface LoanFlowDataPoint {
  name: string
  loans: number
}

export interface TopBookItem {
  title: string
  loans: number
  percentage: string
  color: string
}

export interface AttentionItem {
  id: string
  bookTitle: string
  userName: string
  userId: string
  status: 'overdue' | 'maintenance'
  statusLabel: string
  dueDate?: string
}
