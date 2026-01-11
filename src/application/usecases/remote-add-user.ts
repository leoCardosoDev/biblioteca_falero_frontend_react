import { AddUser, AddUserParams } from '@/domain/usecases'
import { User } from '@/domain/models'
import { UserRepository } from '@/domain/contracts'

export class RemoteAddUser implements AddUser {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(params: AddUserParams): Promise<User> {
    return this.userRepository.add(params)
  }
}
