import type { HttpClient } from '@/application/protocols/http/http-client'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { User } from '@/domain/models/user'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'
import type { ManageUserAccessParams } from '@/domain/usecases/manage-user-access'

export class HttpUserRepository implements UserRepository {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async loadAll(): Promise<User[]> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'get'
    })
    const body = response.body || []
    if (!Array.isArray(body)) return []

    return body.map((user) => this.mapToDomain(user))
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

  async manageAccess(params: ManageUserAccessParams): Promise<void> {
    const { id, ...data } = params
    const response = await this.httpClient.request({
      url: `/users/${id}/access`,
      method: 'post',
      body: data
    })

    if (response.statusCode >= 400) {
      const body = response.body as HttpErrorResponse
      const message =
        body?.error?.message || body?.message || 'Erro ao atualizar acesso'
      throw new Error(message)
    }
  }

  private mapToDomain(remoteUser: unknown): User {
    if (!this.isRemoteUserDto(remoteUser)) {
      throw new Error('Invalid user data received from API')
    }

    return {
      ...remoteUser,
      role: (
        remoteUser.login?.role ||
        remoteUser.role ||
        'STUDENT'
      ).toUpperCase() as User['role'],
      status: (remoteUser.status || 'ACTIVE').toUpperCase() as User['status']
    }
  }

  private isRemoteUserDto(data: unknown): data is RemoteUserDto {
    return (
      typeof data === 'object' &&
      data !== null &&
      'id' in data &&
      'name' in data &&
      'email' in data
    )
  }
}

type RemoteUserDto = User & {
  login?: { role?: string }
}

type HttpErrorResponse = {
  error?: {
    message?: string
  }
  message?: string
}
