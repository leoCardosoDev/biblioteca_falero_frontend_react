import type { Book, Loan } from '@/modules/library/domain'

export interface LibraryRepository {
  loadBooks(): Promise<Book[]>
  loadBookById(id: string): Promise<Book | undefined>
  loadLoans(): Promise<Loan[]>
  loadLoansByUser(userId: string): Promise<Loan[]>
}
