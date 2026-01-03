import { LoadBooks } from '@/domain/usecases/load-books'
import { Book } from '@/domain/models/book'
import { BookRepository } from '@/domain/contracts/book-repository'

export class DbLoadBooks implements LoadBooks {
  constructor(private readonly bookRepository: BookRepository) { }

  async load(): Promise<Book[]> {
    return this.bookRepository.loadAll()
  }
}
