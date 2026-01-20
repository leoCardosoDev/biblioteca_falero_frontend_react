import type { LoadUsers } from '@/shared/domain/usecases'
import type { User } from '@/shared/domain/models'
import type { UserRepository } from '@/shared/domain/contracts'

export class RemoteLoadUsers implements LoadUsers {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(): Promise<User[]> {
    return this.userRepository.loadAll()
  }
}
