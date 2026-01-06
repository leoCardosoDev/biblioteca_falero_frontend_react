import { Address } from '@/domain/models/user'

export interface LoadAddressByZipCode {
  perform: (zipCode: string) => Promise<Address>
}
