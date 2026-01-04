import { User } from '../models/user';

export interface LoadUserById {
  perform: (id: string) => Promise<User>;
}
