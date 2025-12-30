import type { Authentication, AuthenticationParams } from '../../domain/usecases/authentication'
import type { AccountModel } from '../../domain/models/account-model'
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../domain/errors/unexpected-error'
import axios from 'axios'

export class HttpAuthentication implements Authentication {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    try {
      const result = await axios.post(this.url, params)
      return result.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 401 || status === 403) {
          throw new InvalidCredentialsError()
        }
      }
      throw new UnexpectedError()
    }
  }
}
