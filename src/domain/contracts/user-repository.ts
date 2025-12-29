import { UserModel } from '../models/user-model';
import { AddUserParams } from '../usecases/add-user';
import { UpdateUserParams } from '../usecases/update-user';

export interface UserRepository {
  loadAll: () => Promise<UserModel[]>;
  add: (params: AddUserParams) => Promise<UserModel>;
  update: (params: UpdateUserParams) => Promise<UserModel>;
  delete: (id: string) => Promise<void>;
}
