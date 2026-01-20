import type { UpdateUser, UpdateUserParams } from '@/shared/domain/usecases'
import type { User } from '@/shared/domain/models'
import type { UserRepository } from '@/shared/domain/contracts'

export class RemoteUpdateUser implements UpdateUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(params: UpdateUserParams): Promise<User> {
    return this.userRepository.update(params)
  }
}
