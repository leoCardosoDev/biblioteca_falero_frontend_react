import { Book } from '@/domain/models/book'

export interface LoadBooks {
  load: () => Promise<Book[]>
}
