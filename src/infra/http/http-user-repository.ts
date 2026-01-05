import { AxiosInstance } from 'axios';
import { UserRepository } from '../../domain/contracts/user-repository';
import { User } from '../../domain/models/user';
import { AddUserParams } from '../../domain/usecases/add-user';
import { UpdateUserParams } from '../../domain/usecases/update-user';

export class HttpUserRepository implements UserRepository {
  constructor(private readonly httpClient: AxiosInstance) { }

  async loadAll(): Promise<User[]> {
    const response = await this.httpClient.get<User[]>('/users');
    return response.data;
  }

  async loadById(id: string): Promise<User> {
    const response = await this.httpClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async add(params: AddUserParams): Promise<User> {
    const response = await this.httpClient.post<User>('/users', params);
    return response.data;
  }

  async update(params: UpdateUserParams): Promise<User> {
    const { id, ...data } = params;
    const response = await this.httpClient.put<User>(`/users/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/users/${id}`);
  }
}
