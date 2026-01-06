import { DeleteUser } from '@/domain/usecases/delete-user'
import { UserRepository } from '@/domain/contracts/user-repository'

export class DbDeleteUser implements DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
