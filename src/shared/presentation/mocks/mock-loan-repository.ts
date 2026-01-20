import type { LoanRepository } from '@/shared/domain/contracts/loan-repository'
import type { Loan } from '@/shared/domain/models/loan'
import { MOCK_LOANS } from './mock-data'

export class MockLoanRepository implements LoanRepository {
  async loadAll(): Promise<Loan[]> {
    return Promise.resolve(MOCK_LOANS)
  }
}
