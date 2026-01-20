import type { LoadBooks } from '@/shared/domain/usecases'
import type { Book } from '@/shared/domain/models'
import type { BookRepository } from '@/shared/domain/contracts'

export class RemoteLoadBooks implements LoadBooks {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async load(): Promise<Book[]> {
    return this.bookRepository.loadAll()
  }
}
