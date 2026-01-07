import { HttpClient } from '@/application/protocols/http/http-client'
import { AddUser, AddUserParams } from '@/domain/usecases/add-user'
import { User } from '@/domain/models/user'

export class RemoteAddUser implements AddUser {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(params: AddUserParams): Promise<User> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'post',
      body: params
    })
    const remoteUser = response.body
    return {
      ...remoteUser,
      role: remoteUser.login?.role || 'STUDENT',
      status: remoteUser.status || 'INACTIVE'
    }
  }
}
