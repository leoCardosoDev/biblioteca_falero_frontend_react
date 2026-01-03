import { AxiosInstance } from 'axios';
import { UserLoginRepository } from '../../domain/contracts/user-login-repository';
import { AddUserLoginParams } from '../../domain/usecases/add-user-login';

export class HttpUserLoginRepository implements UserLoginRepository {
  constructor(private readonly httpClient: AxiosInstance) { }

  async addLogin(params: AddUserLoginParams): Promise<void> {
    const { userId, ...data } = params;
    await this.httpClient.post(`/users/${userId}/login`, data);
  }
}
