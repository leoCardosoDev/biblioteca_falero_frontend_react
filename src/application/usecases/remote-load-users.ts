import { LoadUsers } from '@/domain/usecases'
import { User } from '@/domain/models'
import { UserRepository } from '@/domain/contracts'

export class RemoteLoadUsers implements LoadUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(): Promise<User[]> {
    return this.userRepository.loadAll()
  }
}
