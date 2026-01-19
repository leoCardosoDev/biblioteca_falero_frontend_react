import type { Book } from '@/modules/library/domain'
import type { LibraryRepository } from '@/modules/library/application/repositories'

export class LoadBooksUseCase {
  private readonly repository: LibraryRepository

  constructor(repository: LibraryRepository) {
    this.repository = repository
  }

  async execute(): Promise<Book[]> {
    return this.repository.loadBooks()
  }
}
