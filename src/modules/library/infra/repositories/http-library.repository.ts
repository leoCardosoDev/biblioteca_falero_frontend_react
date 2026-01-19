import type { HttpClient } from '@/shared/infra/http/types'
import type { LibraryRepository } from '@/modules/library/application'
import type { Book, Loan } from '@/modules/library/domain'
import type { BookApiModel, LoanApiModel } from '@/modules/library/infra/models'
import { BookMapper, LoanMapper } from '@/modules/library/infra/mappers'

export class HttpLibraryRepository implements LibraryRepository {
  private readonly httpClient: HttpClient
  private readonly baseUrl: string

  constructor(httpClient: HttpClient, baseUrl: string) {
    this.httpClient = httpClient
    this.baseUrl = baseUrl
  }

  async loadBooks(): Promise<Book[]> {
    const response = await this.httpClient.get<BookApiModel[]>(
      `${this.baseUrl}/books`
    )
    return BookMapper.toDomainList(response)
  }

  async loadBookById(id: string): Promise<Book | undefined> {
    const response = await this.httpClient.get<BookApiModel>(
      `${this.baseUrl}/books/${id}`
    )
    return response ? BookMapper.toDomain(response) : undefined
  }

  async loadLoans(): Promise<Loan[]> {
    const response = await this.httpClient.get<LoanApiModel[]>(
      `${this.baseUrl}/loans`
    )
    return LoanMapper.toDomainList(response)
  }

  async loadLoansByUser(userId: string): Promise<Loan[]> {
    const response = await this.httpClient.get<LoanApiModel[]>(
      `${this.baseUrl}/loans?userId=${userId}`
    )
    return LoanMapper.toDomainList(response)
  }
}
