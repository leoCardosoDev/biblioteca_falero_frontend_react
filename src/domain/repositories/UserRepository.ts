import type { User } from '../entities/User';

export interface UserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
  list(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
