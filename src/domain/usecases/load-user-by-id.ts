import { UserModel } from '../models/user-model';

export interface LoadUserById {
  perform: (id: string) => Promise<UserModel>;
}
