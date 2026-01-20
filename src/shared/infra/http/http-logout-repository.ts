import type { LogoutRepository } from '@/shared/domain/contracts/logout-repository'
import type { LogoutParams } from '@/shared/domain/usecases/logout'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import { UnexpectedError } from '@/shared/domain/errors'

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
