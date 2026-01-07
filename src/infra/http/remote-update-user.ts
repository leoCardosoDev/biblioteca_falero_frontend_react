import { HttpClient } from '@/application/protocols/http/http-client'
import { UpdateUser, UpdateUserParams } from '@/domain/usecases/update-user'
import { User } from '@/domain/models/user'

export class RemoteUpdateUser implements UpdateUser {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(params: UpdateUserParams): Promise<User> {
    const { id, ...data } = params
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'put',
      body: data
    })
    return response.body
  }
}
