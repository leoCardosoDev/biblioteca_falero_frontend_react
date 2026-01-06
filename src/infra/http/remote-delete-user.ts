import { HttpClient } from '@/application/protocols/http/http-client'
import { DeleteUser } from '@/domain/usecases/delete-user'

export class RemoteDeleteUser implements DeleteUser {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(id: string): Promise<void> {
    await this.httpClient.request({
      url: `/users/${id}`,
      method: 'delete'
    })
  }
}
