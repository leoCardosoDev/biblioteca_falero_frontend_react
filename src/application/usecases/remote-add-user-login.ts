import type { AddUserLogin, AddUserLoginParams } from '@/domain/usecases'
import type { UserLoginRepository } from '@/domain/contracts'

export class RemoteAddUserLogin implements AddUserLogin {
  private readonly userLoginRepository: UserLoginRepository

  constructor(userLoginRepository: UserLoginRepository) {
    this.userLoginRepository = userLoginRepository
  }

  async perform(params: AddUserLoginParams): Promise<void> {
    await this.userLoginRepository.addLogin(params)
  }
}
