import { AddUserLogin, AddUserLoginParams } from '@/domain/usecases'
import { UserLoginRepository } from '@/domain/contracts'

export class RemoteAddUserLogin implements AddUserLogin {
  constructor(private readonly userLoginRepository: UserLoginRepository) {}

  async perform(params: AddUserLoginParams): Promise<void> {
    await this.userLoginRepository.addLogin(params)
  }
}
