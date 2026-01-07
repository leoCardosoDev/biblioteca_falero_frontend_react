import { HttpClient } from '@/application/protocols/http/http-client'
import {
  AddUserLogin,
  AddUserLoginParams
} from '@/domain/usecases/add-user-login'

export class RemoteAddUserLogin implements AddUserLogin {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(params: AddUserLoginParams): Promise<void> {
    const { userId, ...data } = params
    await this.httpClient.request({
      url: `/users/${userId}/login`,
      method: 'post',
      body: data
    })
  }
}
