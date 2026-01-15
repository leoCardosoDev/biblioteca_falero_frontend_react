import type { HttpClient } from '@/application/protocols/http/http-client'
import { HttpStatusCode } from '@/application/protocols/http/http-response'
import type { LoadStateById, LoadStateByIdModel } from '@/domain/usecases/load-state-by-id'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

export type RemoteStateModel = {
  id: string
  name: string
  uf: string
}

export class RemoteLoadStateById implements LoadStateById {
  private readonly url: string
  private readonly httpClient: HttpClient<RemoteStateModel>

  constructor(
    url: string,
    httpClient: HttpClient<RemoteStateModel>
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  async perform(id: string): Promise<LoadStateByIdModel> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get'
    })
    const remoteState = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          id: remoteState.id,
          name: remoteState.name,
          acronym: remoteState.uf
        }
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
