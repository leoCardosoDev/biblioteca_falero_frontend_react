import { LoadUserById } from '@/domain/usecases/load-user-by-id'
import { UserRepository } from '@/domain/contracts/user-repository'
import { User } from '@/domain/models/user'

export class DbLoadUserById implements LoadUserById {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(id: string): Promise<User> {
    return await this.userRepository.loadById(id)
  }
}
