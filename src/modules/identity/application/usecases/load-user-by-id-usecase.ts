import type { IdentityRepository, UserDto } from '../protocols'

export class LoadUserByIdUseCase {
  constructor(private readonly repository: IdentityRepository) {}

  async execute(id: string): Promise<UserDto | undefined> {
    return this.repository.loadUserById(id)
  }
}
