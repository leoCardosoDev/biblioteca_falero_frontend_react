import type { GenderType } from '../domain'
import type { UserRoleType } from '../domain/value-objects/user-role'
import type { UserStatusType } from '../domain/value-objects/user-status'
import type { AddressProps } from '../domain/value-objects/address'

export interface UserDto {
  id: string
  name: string
  email: string
  rg: string
  cpf: string
  role: UserRoleType
  status: UserStatusType
  gender: GenderType
  enrollmentId?: string
  avatarUrl?: string
  address?: AddressProps
  createdAt: string
  deletedAt?: string
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  accessToken: string
  name: string
}

export interface CreateUserDto {
  name: string
  email: string
  rg: string
  cpf: string
  role: UserRoleType
  gender: GenderType
  enrollmentId?: string
  address?: AddressProps
}

export interface UpdateUserDto {
  id: string
  name?: string
  rg?: string
  role?: UserRoleType
  gender?: GenderType
  enrollmentId?: string
  address?: AddressProps
}

export interface IdentityRepository {
  login(dto: LoginRequestDto): Promise<LoginResponseDto>
  logout(): Promise<void>
  loadUsers(): Promise<UserDto[]>
  loadUserById(id: string): Promise<UserDto | undefined>
  createUser(dto: CreateUserDto): Promise<UserDto>
  updateUser(dto: UpdateUserDto): Promise<UserDto>
  deleteUser(id: string): Promise<void>
}
