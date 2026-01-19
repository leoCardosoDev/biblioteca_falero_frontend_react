import type { HttpClient } from '@/application/protocols/http/http-client'

import type {
  IdentityRepository,
  LoginRequestDto,
  LoginResponseDto,
  UserDto,
  CreateUserDto,
  UpdateUserDto
} from '../application/protocols'

export class HttpIdentityRepository implements IdentityRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.httpClient.request({
      url: '/login',
      method: 'post',
      body: dto
    })
    if (response.statusCode !== 200) {
      throw new Error('Invalid credentials')
    }
    return response.body as LoginResponseDto
  }

  async logout(): Promise<void> {
    await this.httpClient.request({
      url: '/logout',
      method: 'post'
    })
  }

  async loadUsers(): Promise<UserDto[]> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'get'
    })
    if (response.statusCode !== 200) {
      throw new Error('Failed to load users')
    }
    return response.body as UserDto[]
  }

  async loadUserById(id: string): Promise<UserDto | undefined> {
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'get'
    })
    if (response.statusCode === 404) {
      return undefined
    }
    if (response.statusCode !== 200) {
      throw new Error('Failed to load user')
    }
    return response.body as UserDto
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const response = await this.httpClient.request({
      url: '/users',
      method: 'post',
      body: dto
    })
    if (response.statusCode !== 201 && response.statusCode !== 200) {
      throw new Error('Failed to create user')
    }
    return response.body as UserDto
  }

  async updateUser(dto: UpdateUserDto): Promise<UserDto> {
    const response = await this.httpClient.request({
      url: `/users/${dto.id}`,
      method: 'put',
      body: dto
    })
    if (response.statusCode !== 200) {
      throw new Error('Failed to update user')
    }
    return response.body as UserDto
  }

  async deleteUser(id: string): Promise<void> {
    const response = await this.httpClient.request({
      url: `/users/${id}`,
      method: 'delete'
    })
    if (response.statusCode !== 200 && response.statusCode !== 204) {
      throw new Error('Failed to delete user')
    }
  }
}
