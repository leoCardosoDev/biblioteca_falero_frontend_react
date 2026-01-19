import type { Book } from './Book'
import type { Loan } from './Loan'

export interface LibraryRepository {
  // Books
  getBooks(): Promise<Book[]>
  getBookById(id: string): Promise<Book | null>

  // Loans
  getLoans(): Promise<Loan[]>
  createLoan(bookId: string, userId: string): Promise<void>
}
