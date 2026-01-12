import { CacheRepository } from '@/application/protocols/cache-repository'
import {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: CacheRepository,
    private readonly httpClient: HttpClient
  ) {}

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
