import { LoadLoans } from '@/domain/usecases/load-loans'
import { Loan } from '@/domain/models/loan'
import { LoanRepository } from '@/domain/contracts/loan-repository'

export class DbLoadLoans implements LoadLoans {
  constructor(private readonly loanRepository: LoanRepository) { }

  async load(): Promise<Loan[]> {
    return this.loanRepository.loadAll()
  }
}
