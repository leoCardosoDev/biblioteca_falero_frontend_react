import type { AddUser, AddUserParams } from '@/shared/domain/usecases'
import type { User } from '@/shared/domain/models'
import type { UserRepository } from '@/shared/domain/contracts'

export class RemoteAddUser implements AddUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(params: AddUserParams): Promise<User> {
    return this.userRepository.add(params)
  }
}
