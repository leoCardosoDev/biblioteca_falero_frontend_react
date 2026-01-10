import { HttpClient } from '@/application/protocols/http/http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-reponse'
import { LoadNeighborhoodById } from '@/domain/usecases/load-neighborhood-by-id'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

type RemoteNeighborhoodModel = {
  id: string
  name: string
  cityId: string
}

export class RemoteLoadNeighborhoodById implements LoadNeighborhoodById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteNeighborhoodModel>
  ) {}

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
