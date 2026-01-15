import type { BookRepository } from '@/domain/contracts/book-repository'
import type { Book } from '@/domain/models/book'
import { MOCK_BOOKS } from './mock-data'

export class MockBookRepository implements BookRepository {
  async loadAll(): Promise<Book[]> {
    return Promise.resolve(MOCK_BOOKS)
  }
}
