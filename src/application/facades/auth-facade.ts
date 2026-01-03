import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/domain/models/account-model";
import { CacheRepository } from "@/application/protocols/cache-repository";

export class AuthFacade {
  constructor(
    private readonly authentication: Authentication,
    private readonly cacheRepository: CacheRepository
  ) { }

  async login(params: AuthenticationParams): Promise<AccountModel | null> {
    try {
      const account = await this.authentication.auth(params);
      if (account) {
        await this.cacheRepository.set('account', JSON.stringify(account));
        await this.cacheRepository.set('accessToken', account.accessToken);
        return account;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.cacheRepository.set('accessToken', '');
    await this.cacheRepository.set('account', '');
  }

  async getCurrentUser(): Promise<AccountModel | null> {
    try {
      const accountStr = await this.cacheRepository.get('account');
      if (accountStr) {
        return JSON.parse(accountStr);
      }
      return null;
    } catch {
      return null;
    }
  }
}
