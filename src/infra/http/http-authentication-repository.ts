import type { AuthenticationRepository } from '@/domain/contracts/authentication-repository'
import type { AuthenticationParams } from '@/domain/usecases/authentication'
import type { AccountModel } from '@/domain/models/account-model'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AxiosInstance, isAxiosError } from 'axios'

export class HttpAuthenticationRepository implements AuthenticationRepository {
  constructor(private readonly httpClient: AxiosInstance) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    try {
      const result = await this.httpClient.post('/login', params)
      return result.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status
        if (status === 401 || status === 403) {
          throw new InvalidCredentialsError()
        }
      }
      throw new UnexpectedError()
    }
  }
}
