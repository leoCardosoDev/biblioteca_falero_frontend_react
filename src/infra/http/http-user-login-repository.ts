import type { HttpClient } from '@/application/protocols/http/http-client'
import type { UserLoginRepository } from '@/domain/contracts/user-login-repository'
import type { AddUserLoginParams } from '@/domain/usecases/add-user-login'

export class HttpUserLoginRepository implements UserLoginRepository {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async addLogin(params: AddUserLoginParams): Promise<void> {
    const { userId, ...data } = params
    await this.httpClient.request({
      url: `/users/${userId}/login`,
      method: 'post',
      body: data
    })
  }
}
