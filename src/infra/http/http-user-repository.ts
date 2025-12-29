import { AxiosInstance } from 'axios';
import { UserRepository } from '../../domain/contracts/user-repository';
import { UserModel } from '../../domain/models/user-model';
import { AddUserParams } from '../../domain/usecases/add-user';
import { UpdateUserParams } from '../../domain/usecases/update-user';

export class HttpUserRepository implements UserRepository {
  constructor(private readonly httpClient: AxiosInstance) { }

  async loadAll(): Promise<UserModel[]> {
    const response = await this.httpClient.get<UserModel[]>('/users');
    return response.data;
  }

  async add(params: AddUserParams): Promise<UserModel> {
    const response = await this.httpClient.post<UserModel>('/users', params);
    return response.data;
  }

  async update(params: UpdateUserParams): Promise<UserModel> {
    const { id, ...data } = params;
    const response = await this.httpClient.put<UserModel>(`/users/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/users/${id}`);
  }
}
