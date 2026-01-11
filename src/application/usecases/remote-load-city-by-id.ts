import { HttpClient } from '@/application/protocols/http/http-client'
import { HttpStatusCode } from '@/application/protocols/http/http-response'
import { LoadCityById, LoadCityByIdModel } from '@/domain/usecases/load-city-by-id'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadCityById implements LoadCityById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadCityByIdModel>
  ) { }

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
