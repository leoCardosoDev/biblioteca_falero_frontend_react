import { Book } from '@/domain/models/book'

export interface BookRepository {
  loadAll(): Promise<Book[]>
}
