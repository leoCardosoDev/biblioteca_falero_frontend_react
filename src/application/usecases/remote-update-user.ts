import { UpdateUser, UpdateUserParams } from '@/domain/usecases'
import { User } from '@/domain/models'
import { UserRepository } from '@/domain/contracts'

export class RemoteUpdateUser implements UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(params: UpdateUserParams): Promise<User> {
    return this.userRepository.update(params)
  }
}
