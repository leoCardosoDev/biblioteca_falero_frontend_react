import { AddUserLoginParams } from '../usecases/add-user-login';

export interface UserLoginRepository {
  addLogin: (params: AddUserLoginParams) => Promise<void>;
}
