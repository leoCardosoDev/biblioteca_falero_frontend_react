import { UserModel } from '../models/user-model';

export interface LoadUsers {
  perform: () => Promise<UserModel[]>;
}
