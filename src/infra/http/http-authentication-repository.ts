import type { AuthenticationRepository } from '@/domain/contracts/authentication-repository'
import type { AuthenticationParams } from '@/domain/usecases/authentication'
import type { AccountModel } from '@/domain/models/account-model'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpClient } from '@/application/protocols/http/http-client'

export class HttpAuthenticationRepository implements AuthenticationRepository {
  constructor(private readonly httpClient: HttpClient<AccountModel>) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    try {
      const result = await this.httpClient.request({
        url: '/login',
        method: 'post',
        body: params
      })

      if (result.statusCode === 200) {
        return result.body
      }

      if (result.statusCode === 401 || result.statusCode === 403) {
        throw new InvalidCredentialsError()
      }

      throw new UnexpectedError()
    } catch (error) {
      if (
        error instanceof InvalidCredentialsError ||
        error instanceof UnexpectedError
      ) {
        throw error
      }
      throw new UnexpectedError()
    }
  }
}
