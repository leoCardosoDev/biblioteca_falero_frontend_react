import type { AuthenticationRepository } from '@/shared/domain/contracts/authentication-repository'
import type { AuthenticationParams } from '@/shared/domain/usecases/authentication'
import type { AccountModel } from '@/shared/domain/models/account-model'
import {
  InvalidCredentialsError,
  UnexpectedError
} from '@/shared/domain/errors'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'

export class HttpAuthenticationRepository implements AuthenticationRepository {
  private readonly httpClient: HttpClient<AccountModel>

  constructor(httpClient: HttpClient<AccountModel>) {
    this.httpClient = httpClient
  }

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
