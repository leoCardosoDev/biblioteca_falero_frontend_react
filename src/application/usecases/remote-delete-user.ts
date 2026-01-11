import { DeleteUser } from '@/domain/usecases'
import { UserRepository } from '@/domain/contracts'

export class RemoteDeleteUser implements DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
