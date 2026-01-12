import { AddUserLoginParams } from '@/domain/usecases/add-user-login'

export interface UserLoginRepository {
  addLogin: (params: AddUserLoginParams) => Promise<void>
}
