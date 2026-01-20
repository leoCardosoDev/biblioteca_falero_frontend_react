import type { Loan } from '@/shared/domain/models/loan'

export interface LoanRepository {
  loadAll(): Promise<Loan[]>
}
