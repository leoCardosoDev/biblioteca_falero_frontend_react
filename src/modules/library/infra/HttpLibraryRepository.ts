import type { HttpClient } from '@/shared/infra/http/types'
import type { LibraryRepository } from '../domain/LibraryRepository'
import type { Book } from '../domain/Book'
import type { Loan } from '../domain/Loan'
import type { BookDTO, LoanDTO } from './dtos'
import { BookMapper } from './BookMapper'
import { LoanMapper } from './LoanMapper'

export class HttpLibraryRepository implements LibraryRepository {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async getBooks(): Promise<Book[]> {
    // Mocking response structure matching legacy "load-books" if API is not real yet
    // Assuming API returns { books: [...] } or [...]
    const booksData = await this.httpClient.get<BookDTO[]>('/books')
    return booksData.map(BookMapper.toDomain)
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      const bookData = await this.httpClient.get<BookDTO>(`/books/${id}`)
      return BookMapper.toDomain(bookData)
    } catch (_e) {
      return null
    }
  }

  async getLoans(): Promise<Loan[]> {
    const loansData = await this.httpClient.get<LoanDTO[]>('/loans')
    return loansData.map(LoanMapper.toDomain)
  }

  async createLoan(bookId: string, userId: string): Promise<void> {
    await this.httpClient.post('/loans', { bookId, userId })
  }
}
