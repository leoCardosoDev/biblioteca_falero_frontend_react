import {
  AddUserLogin,
  AddUserLoginParams
} from '@/domain/usecases/add-user-login'
import { UserLoginRepository } from '@/domain/contracts/user-login-repository'

export class DbAddUserLogin implements AddUserLogin {
  constructor(private readonly userLoginRepository: UserLoginRepository) {}

  async perform(params: AddUserLoginParams): Promise<void> {
    await this.userLoginRepository.addLogin(params)
  }
}
