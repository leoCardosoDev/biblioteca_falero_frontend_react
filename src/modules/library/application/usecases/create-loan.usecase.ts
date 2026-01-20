import type { LibraryRepository } from '@/modules/library/application/repositories'

export interface CreateLoanParams {
  bookId: string
  userId: string
}

export class CreateLoanUseCase {
  private readonly repository: LibraryRepository

  constructor(repository: LibraryRepository) {
    this.repository = repository
  }

  async execute(params: CreateLoanParams): Promise<void> {
    return this.repository.createLoan(params.bookId, params.userId)
  }
}
