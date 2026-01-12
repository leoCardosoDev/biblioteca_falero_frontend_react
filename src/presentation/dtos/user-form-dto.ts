export type UserFormData = {
  name: string
  email: string
  cpf: string
  rg: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  role: 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT'
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  address: {
    street: string
    number: string
    complement?: string
    neighborhoodId?: string | null
    cityId?: string | null
    stateId?: string | null
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}
