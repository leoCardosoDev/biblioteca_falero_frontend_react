import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import { HttpStatusCode } from '@/shared/application/protocols/http/http-response'
import type {
  LoadCityById,
  LoadCityByIdModel
} from '@/shared/domain/usecases/load-city-by-id'
import { NotFoundError, UnexpectedError } from '@/shared/domain/errors'

export class RemoteLoadCityById implements LoadCityById {
  private readonly url: string
  private readonly httpClient: HttpClient<LoadCityByIdModel>

  constructor(url: string, httpClient: HttpClient<LoadCityByIdModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async perform(id: string): Promise<LoadCityByIdModel> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get'
    })
    const remoteCity = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteCity!
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
