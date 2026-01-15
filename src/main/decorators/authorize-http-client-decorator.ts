import type { CacheRepository } from '@/application/protocols/cache-repository'
import type {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'

export class AuthorizeHttpClientDecorator implements HttpClient {
  private readonly getStorage: CacheRepository
  private readonly httpClient: HttpClient

  constructor(
    getStorage: CacheRepository,
    httpClient: HttpClient
  ) {
    this.getStorage = getStorage
    this.httpClient = httpClient
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    const accessToken = await this.getStorage.get('accessToken')
    if (accessToken) {
      Object.assign(data, {
        headers: Object.assign({}, data.headers, {
          Authorization: `Bearer ${accessToken}`
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
