import { Logout, LogoutParams } from '@/domain/usecases/logout'
import { LogoutRepository } from '@/domain/contracts/logout-repository'

export class RemoteLogout implements Logout {
  constructor(private readonly logoutRepository: LogoutRepository) {}

  async logout(params: LogoutParams): Promise<void> {
    await this.logoutRepository.logout(params)
  }
}
