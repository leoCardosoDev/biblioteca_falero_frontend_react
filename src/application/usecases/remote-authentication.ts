import type { CacheRepository } from '@/application/protocols/cache-repository'
import type { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import type { AccountModel } from '@/domain/models/account-model'
import type { AuthenticationRepository } from '@/domain/contracts/authentication-repository'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly cacheRepository: CacheRepository
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const account = await this.authenticationRepository.auth(params)
    if (account?.accessToken) {
      await this.cacheRepository.remove('auth_session')

      await this.cacheRepository.set('accessToken', account.accessToken)
      await this.cacheRepository.set('account', JSON.stringify(account))
    }
    return account
  }
}
