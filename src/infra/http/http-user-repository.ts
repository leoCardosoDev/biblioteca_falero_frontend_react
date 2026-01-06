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
    return response.body
  }

  async loadById(id: string): Promise<User> {
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'get'
    })
    return response.body
  }

  async add(params: AddUserParams): Promise<User> {
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

  async update(params: UpdateUserParams): Promise<User> {
    const { id, ...data } = params
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'put',
      body: data
    })
    return response.body
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.request({
      url: `/users/${id}`,
      method: 'delete'
    })
  }
}
