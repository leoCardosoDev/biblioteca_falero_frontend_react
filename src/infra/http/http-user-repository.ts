import { HttpClient } from '@/application/protocols/http/http-client'
import { UserRepository } from '@/domain/contracts/user-repository'
import { User } from '@/domain/models/user'
import { AddUserParams } from '@/domain/usecases/add-user'
import { UpdateUserParams } from '@/domain/usecases/update-user'

export class HttpUserRepository implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(): Promise<User[]> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'get'
    })
    return ((response.body as unknown[]) || []).map((user: unknown) =>
      this.mapToDomain(user)
    )
  }

  async loadById(id: string): Promise<User> {
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'get'
    })
    return this.mapToDomain(response.body)
  }

  async add(params: AddUserParams): Promise<User> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'post',
      body: params
    })
    return this.mapToDomain(response.body)
  }

  async update(params: UpdateUserParams): Promise<User> {
    const { id, ...data } = params
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'put',
      body: data
    })
    return this.mapToDomain(response.body)
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.request({
      url: `/users/${id}`,
      method: 'delete'
    })
  }

  private mapToDomain(remoteUser: unknown): User {
    const user = remoteUser as RemoteUserDto
    return {
      ...user,
      role: (
        user.login?.role ||
        user.role ||
        'STUDENT'
      ).toUpperCase() as User['role'],
      status: (user.status || 'ACTIVE').toUpperCase() as User['status']
    }
  }
}

type RemoteUserDto = User & {
  login?: { role?: string }
}
