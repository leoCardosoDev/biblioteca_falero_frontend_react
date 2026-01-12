import { HttpClient } from '@/application/protocols/http/http-client'
import { UserLoginRepository } from '@/domain/contracts/user-login-repository'
import { AddUserLoginParams } from '@/domain/usecases/add-user-login'

export class HttpUserLoginRepository implements UserLoginRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async addLogin(params: AddUserLoginParams): Promise<void> {
    const { userId, ...data } = params
    await this.httpClient.request({
      url: `/users/${userId}/login`,
      method: 'post',
      body: data
    })
  }
}
