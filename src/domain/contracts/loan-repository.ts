import type { Loan } from '@/domain/models/loan'

export interface LoanRepository {
  loadAll(): Promise<Loan[]>
}
