import type { Book } from '@/shared/domain/models/book'

export interface BookRepository {
  loadAll(): Promise<Book[]>
}
