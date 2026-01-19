import type {
  DashboardStat,
  LoanFlowDataPoint,
  TopBookItem,
  AttentionItem
} from '../../domain'

export interface DashboardRepository {
  loadStats(): Promise<DashboardStat[]>
  loadLoanFlowData(): Promise<LoanFlowDataPoint[]>
  loadTopBooks(): Promise<TopBookItem[]>
  loadAttentionItems(): Promise<AttentionItem[]>
}
