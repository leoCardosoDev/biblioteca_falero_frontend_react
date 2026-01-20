import type { Book, Loan } from '@/modules/library/domain'

export interface LibraryRepository {
  getBooks(): Promise<Book[]>
  getBookById(id: string): Promise<Book | null>
  getLoans(): Promise<Loan[]>
  createLoan(bookId: string, userId: string): Promise<void>
}
