import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import { HttpStatusCode } from '@/shared/application/protocols/http/http-response'
import type {
  LoadNeighborhoodById,
  LoadNeighborhoodByIdModel
} from '@/shared/domain/usecases/load-neighborhood-by-id'
import { NotFoundError, UnexpectedError } from '@/shared/domain/errors'

export type RemoteNeighborhoodModel = {
  id: string
  name: string
  cityId: string
}

export class RemoteLoadNeighborhoodById implements LoadNeighborhoodById {
  private readonly url: string
  private readonly httpClient: HttpClient<RemoteNeighborhoodModel>

  constructor(url: string, httpClient: HttpClient<RemoteNeighborhoodModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async perform(id: string): Promise<LoadNeighborhoodByIdModel> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get'
    })
    const remoteNeighborhood = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          id: remoteNeighborhood!.id,
          name: remoteNeighborhood!.name,
          cityId: remoteNeighborhood!.cityId
        }
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
