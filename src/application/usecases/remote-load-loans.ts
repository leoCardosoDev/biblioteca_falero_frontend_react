import { LoadLoans } from '@/domain/usecases'
import { Loan } from '@/domain/models'
import { LoanRepository } from '@/domain/contracts'

export class RemoteLoadLoans implements LoadLoans {
  constructor(private readonly loanRepository: LoanRepository) {}

  async load(): Promise<Loan[]> {
    return this.loanRepository.loadAll()
  }
}
