import {
  Authentication,
  AuthenticationParams
} from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'
import { CacheRepository } from '@/application/protocols/cache-repository'
import { Logout } from '@/domain/usecases/logout'

export class AuthFacade {
  constructor(
    private readonly authentication: Authentication,
    private readonly logoutUseCase: Logout,
    private readonly cacheRepository: CacheRepository
  ) {}

  async login(params: AuthenticationParams): Promise<AccountModel | null> {
    const account = await this.authentication.auth(params)
    if (account) {
      await this.cacheRepository.set('account', JSON.stringify(account))
      await this.cacheRepository.set('accessToken', account.accessToken)
      return account
    }
    return null
  }

  async logout(): Promise<void> {
    const accountStr = await this.cacheRepository.get('account')
    if (accountStr) {
      try {
        const account = JSON.parse(accountStr) as AccountModel
        if (account.refreshToken) {
          await this.logoutUseCase.logout({
            refreshToken: account.refreshToken
          })
        }
      } catch (error: unknown) {
        console.error('Logout failed:', error)
      }
    }
    await this.cacheRepository.set('accessToken', '')
    await this.cacheRepository.set('account', '')
  }

  async getCurrentUser(): Promise<AccountModel | null> {
    try {
      const accountStr = await this.cacheRepository.get('account')
      if (accountStr) {
        return JSON.parse(accountStr)
      }
      return null
    } catch {
      return null
    }
  }
}
