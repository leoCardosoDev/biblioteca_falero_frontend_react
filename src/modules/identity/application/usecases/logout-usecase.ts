import type { IdentityRepository } from '../protocols'

export class LogoutUseCase {
  constructor(private readonly repository: IdentityRepository) {}

  async execute(): Promise<void> {
    return this.repository.logout()
  }
}
