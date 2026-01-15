import type { LoadBooks } from '@/domain/usecases'
import type { Book } from '@/domain/models'
import type { BookRepository } from '@/domain/contracts'

export class RemoteLoadBooks implements LoadBooks {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async load(): Promise<Book[]> {
    return this.bookRepository.loadAll()
  }
}
