import type { Loan } from '@/modules/library/domain'
import type { LibraryRepository } from '@/modules/library/application/repositories'

export class LoadLoansUseCase {
  private readonly repository: LibraryRepository

  constructor(repository: LibraryRepository) {
    this.repository = repository
  }

  async execute(): Promise<Loan[]> {
    return this.repository.getLoans()
  }
}
