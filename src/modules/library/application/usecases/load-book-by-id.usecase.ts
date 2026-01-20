import type { Book } from '@/modules/library/domain'
import type { LibraryRepository } from '@/modules/library/application/repositories'

export class LoadBookByIdUseCase {
  private readonly repository: LibraryRepository

  constructor(repository: LibraryRepository) {
    this.repository = repository
  }

  async execute(id: string): Promise<Book | null> {
    return this.repository.getBookById(id)
  }
}
