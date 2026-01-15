import type { UpdateUser, UpdateUserParams } from '@/domain/usecases'
import type { User } from '@/domain/models'
import type { UserRepository } from '@/domain/contracts'

export class RemoteUpdateUser implements UpdateUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(params: UpdateUserParams): Promise<User> {
    return this.userRepository.update(params)
  }
}
