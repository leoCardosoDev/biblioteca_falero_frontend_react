import type { HttpClient } from '@/shared/infra/http/types'
import type { LibraryRepository } from '@/modules/library/application'
import type { Book, Loan } from '@/modules/library/domain'
import type { BookApiModel, LoanApiModel } from '@/modules/library/infra/models'
import { BookMapper, LoanMapper } from '@/modules/library/infra/mappers'

export class HttpLibraryRepository implements LibraryRepository {
  readonly #httpClient: HttpClient
  readonly #baseUrl: string

  constructor(httpClient: HttpClient, baseUrl: string) {
    this.#httpClient = httpClient
    this.#baseUrl = baseUrl
  }

  async getBooks(): Promise<Book[]> {
    const response = await this.#httpClient.get<BookApiModel[]>(
      `${this.#baseUrl}/books`
    )
    return BookMapper.toDomainList(response)
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      const response = await this.#httpClient.get<BookApiModel>(
        `${this.#baseUrl}/books/${id}`
      )
      return response ? BookMapper.toDomain(response) : null
    } catch {
      return null
    }
  }

  async getLoans(): Promise<Loan[]> {
    const response = await this.#httpClient.get<LoanApiModel[]>(
      `${this.#baseUrl}/loans`
    )
    return LoanMapper.toDomainList(response)
  }

  async createLoan(bookId: string, userId: string): Promise<void> {
    await this.#httpClient.post(`${this.#baseUrl}/loans`, { bookId, userId })
  }
}
