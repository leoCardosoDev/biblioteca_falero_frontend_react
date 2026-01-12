import { LoadUserById } from '@/domain/usecases'
import { UserRepository } from '@/domain/contracts'
import { User } from '@/domain/models'

export class RemoteLoadUserById implements LoadUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(id: string): Promise<User> {
    return await this.userRepository.loadById(id)
  }
}
