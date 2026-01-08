export type UserRole = 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT'

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  stateId?: string
  cityId?: string
  neighborhoodId?: string
}

export interface User {
  id: string
  name: string
  email: string
  rg: string
  cpf: string
  role: UserRole
  status: UserStatus
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  enrollmentId?: string
  avatarUrl?: string
  address?: Address
  createdAt: string
}
