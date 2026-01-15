import type { User } from '@/domain/models/user'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'
import type { ManageUserAccessParams } from '@/domain/usecases/manage-user-access'

export interface UserRepository {
  loadAll: () => Promise<User[]>
  loadById: (id: string) => Promise<User>
  add: (params: AddUserParams) => Promise<User>
  update: (params: UpdateUserParams) => Promise<User>
  delete: (id: string) => Promise<void>
  manageAccess: (params: ManageUserAccessParams) => Promise<void>
}
