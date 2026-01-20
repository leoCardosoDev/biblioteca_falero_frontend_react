import type { IdentityRepository, UserDto } from '../protocols'

export class LoadUsersUseCase {
  constructor(private readonly repository: IdentityRepository) {}

  async execute(): Promise<UserDto[]> {
    return this.repository.loadUsers()
  }
}
