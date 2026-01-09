import { LogoutRepository } from '@/domain/contracts/logout-repository'
import { LogoutParams } from '@/domain/usecases/logout'
import { HttpClient } from '@/application/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors'

export class HttpLogoutRepository implements LogoutRepository {
  constructor(private readonly httpClient: HttpClient<void>) {}

  async logout(params: LogoutParams): Promise<void> {
    try {
      const result = await this.httpClient.request({
        url: '/logout',
        method: 'post',
        body: params
      })

      if (result.statusCode !== 200 && result.statusCode !== 204) {
        throw new UnexpectedError()
      }
    } catch (error) {
      if (error instanceof UnexpectedError) {
        throw error
      }
      throw new UnexpectedError()
    }
  }
}
