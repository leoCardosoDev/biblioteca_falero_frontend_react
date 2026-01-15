import type {
  ManageUserAccess,
  ManageUserAccessParams
} from '@/domain/usecases/manage-user-access'
import type { UserRepository } from '@/domain/contracts/user-repository'

export class RemoteManageUserAccess implements ManageUserAccess {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async perform(params: ManageUserAccessParams): Promise<void> {
    await this.userRepository.manageAccess(params)
  }
}
