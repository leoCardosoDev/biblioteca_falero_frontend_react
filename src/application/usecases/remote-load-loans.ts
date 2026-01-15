import type { LoadLoans } from '@/domain/usecases'
import type { Loan } from '@/domain/models'
import type { LoanRepository } from '@/domain/contracts'

export class RemoteLoadLoans implements LoadLoans {
  private readonly loanRepository: LoanRepository

  constructor(loanRepository: LoanRepository) {
    this.loanRepository = loanRepository
  }

  async load(): Promise<Loan[]> {
    return this.loanRepository.loadAll()
  }
}
