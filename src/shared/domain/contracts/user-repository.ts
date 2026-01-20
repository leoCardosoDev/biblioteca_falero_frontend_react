import type { User } from '@/shared/domain/models/user'
import type { AddUserParams } from '@/shared/domain/usecases/add-user'
import type { UpdateUserParams } from '@/shared/domain/usecases/update-user'
import type { ManageUserAccessParams } from '@/shared/domain/usecases/manage-user-access'

export interface UserRepository {
  loadAll: () => Promise<User[]>
  loadById: (id: string) => Promise<User>
  add: (params: AddUserParams) => Promise<User>
  update: (params: UpdateUserParams) => Promise<User>
  delete: (id: string) => Promise<void>
  manageAccess: (params: ManageUserAccessParams) => Promise<void>
}
