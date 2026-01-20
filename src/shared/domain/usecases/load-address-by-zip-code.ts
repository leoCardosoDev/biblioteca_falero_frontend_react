import type { Address } from '@/shared/domain/models/user'

export interface LoadAddressByZipCode {
  perform: (zipCode: string) => Promise<Address>
}
