import { LoanRepository } from '@/domain/contracts/loan-repository'
import { Loan } from '@/domain/models/loan'
import { MOCK_LOANS } from './mock-data'

export class MockLoanRepository implements LoanRepository {
  async loadAll(): Promise<Loan[]> {
    return Promise.resolve(MOCK_LOANS)
  }
}
