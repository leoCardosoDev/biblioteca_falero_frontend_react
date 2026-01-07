import { HttpClient } from '@/application/protocols/http/http-client'
import { type LoadUsers } from '@/domain/usecases/load-users'
import { type User } from '@/domain/models/user'

export class RemoteLoadUsers implements LoadUsers {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(): Promise<User[]> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'get'
    })
    const remoteUsers = response.body as RemoteUser[]
    return remoteUsers.map((remoteUser) => ({
      ...remoteUser,
      role: remoteUser.login?.role || 'STUDENT',

      status: remoteUser.status || 'INACTIVE'
    }))
  }
}

interface RemoteUser extends Omit<User, 'role'> {
  role?: never
  login?: {
    role: User['role']
    status: User['status']
  } | null
}
