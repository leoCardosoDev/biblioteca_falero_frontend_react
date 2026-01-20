import type { Logout, LogoutParams } from '@/shared/domain/usecases/logout'
import type { LogoutRepository } from '@/shared/domain/contracts/logout-repository'

export class RemoteLogout implements Logout {
  constructor(private readonly logoutRepository: LogoutRepository) {}

  async logout(params: LogoutParams): Promise<void> {
    await this.logoutRepository.logout(params)
  }
}
