import { User } from '../models/user';
import { AddUserParams } from '../usecases/add-user';
import { UpdateUserParams } from '../usecases/update-user';

export interface UserRepository {
  loadAll: () => Promise<User[]>;
  loadById: (id: string) => Promise<User>;
  add: (params: AddUserParams) => Promise<User>;
  update: (params: UpdateUserParams) => Promise<User>;
  delete: (id: string) => Promise<void>;
}
