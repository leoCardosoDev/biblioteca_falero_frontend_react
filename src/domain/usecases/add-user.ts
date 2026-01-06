import { User } from '@/domain/models/user'

export interface AddUserParams {
  name: string
  email: string
  rg: string
  cpf: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  phone?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhoodId: string
    cityId: string
    state: string
    zipCode: string
  }
  role: User['role']
  status: User['status']
}

export interface AddUser {
  perform: (params: AddUserParams) => Promise<User>
}
