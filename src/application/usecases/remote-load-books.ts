import { LoadBooks } from '@/domain/usecases'
import { Book } from '@/domain/models'
import { BookRepository } from '@/domain/contracts'

export class RemoteLoadBooks implements LoadBooks {
  constructor(private readonly bookRepository: BookRepository) {}

  async load(): Promise<Book[]> {
    return this.bookRepository.loadAll()
  }
}
