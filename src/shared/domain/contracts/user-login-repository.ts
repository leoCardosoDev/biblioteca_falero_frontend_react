import type { AddUserLoginParams } from '@/shared/domain/usecases/add-user-login'

export interface UserLoginRepository {
  addLogin: (params: AddUserLoginParams) => Promise<void>
}
