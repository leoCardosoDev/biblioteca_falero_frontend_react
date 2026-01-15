import type { LoadUserById } from '@/domain/usecases'
import type { UserRepository } from '@/domain/contracts'
import type { User } from '@/domain/models'

export class RemoteLoadUserById implements LoadUserById {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(id: string): Promise<User> {
    return await this.userRepository.loadById(id)
  }
}
