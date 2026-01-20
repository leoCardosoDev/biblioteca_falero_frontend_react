import type { LoadUserById } from '@/shared/domain/usecases'
import type { UserRepository } from '@/shared/domain/contracts'
import type { User } from '@/shared/domain/models'

export class RemoteLoadUserById implements LoadUserById {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(id: string): Promise<User> {
    return await this.userRepository.loadById(id)
  }
}
