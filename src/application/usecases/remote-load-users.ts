import type { LoadUsers } from '@/domain/usecases'
import type { User } from '@/domain/models'
import type { UserRepository } from '@/domain/contracts'

export class RemoteLoadUsers implements LoadUsers {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(): Promise<User[]> {
    return this.userRepository.loadAll()
  }
}
