import type { DeleteUser } from '@/shared/domain/usecases'
import type { UserRepository } from '@/shared/domain/contracts'

export class RemoteDeleteUser implements DeleteUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
