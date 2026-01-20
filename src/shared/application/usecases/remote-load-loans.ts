import type { LoadLoans } from '@/shared/domain/usecases'
import type { Loan } from '@/shared/domain/models'
import type { LoanRepository } from '@/shared/domain/contracts'

export class RemoteLoadLoans implements LoadLoans {
  private readonly loanRepository: LoanRepository

  constructor(loanRepository: LoanRepository) {
    this.loanRepository = loanRepository
  }

  async load(): Promise<Loan[]> {
    return this.loanRepository.loadAll()
  }
}
