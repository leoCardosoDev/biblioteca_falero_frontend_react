import type { GeographyRepository } from '../protocols/geography-repository'
import type { AddressProps } from '../../domain/value-objects/address'

export class GetAddressByZipCodeUseCase {
  constructor(private readonly repository: GeographyRepository) {}

  async execute(zipCode: string): Promise<AddressProps> {
    return this.repository.loadAddressByZipCode(zipCode)
  }
}
