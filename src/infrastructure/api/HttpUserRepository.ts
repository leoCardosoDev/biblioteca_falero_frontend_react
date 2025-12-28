import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';
import { apiClient } from '../../infrastructure/http/api-client';

export class HttpUserRepository implements UserRepository {
  constructor() {
    console.log('HttpUserRepository initializing...');
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const response = await apiClient.post('/users', user);
    return response.data;
  }

  async list(): Promise<User[]> {
    const response = await apiClient.get('/users');
    // Mock status for now until backend implements it
    // See app/docs/todo/TODO_MOCKS.md
    return response.data.map((user: User) => ({
      ...user,
      status: 'active'
    }));
  }

  async update(user: User): Promise<User> {
    const response = await apiClient.put(`/users/${user.id}`, user);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
