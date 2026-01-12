import {
  ManageUserAccess,
  ManageUserAccessParams
} from '@/domain/usecases/manage-user-access'
import { UserRepository } from '@/domain/contracts/user-repository'

export class RemoteManageUserAccess implements ManageUserAccess {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(params: ManageUserAccessParams): Promise<void> {
    await this.userRepository.manageAccess(params)
  }
}
