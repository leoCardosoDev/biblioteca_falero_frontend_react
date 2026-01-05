import { User } from '../models/user';

export interface LoadUsers {
  perform: () => Promise<User[]>;
}
