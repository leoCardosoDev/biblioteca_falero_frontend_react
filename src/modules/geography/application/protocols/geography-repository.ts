import type { StateProps } from '../../domain/entities/state'
import type { CityProps } from '../../domain/entities/city'
import type { NeighborhoodProps } from '../../domain/entities/neighborhood'
import type { AddressProps } from '../../domain/value-objects/address'

export interface GeographyRepository {
  getStates(): Promise<StateProps[]>
  getStateById(id: string): Promise<StateProps>
  getCities(stateId: string): Promise<CityProps[]>
  getCityById(id: string): Promise<CityProps>
  getNeighborhoods(cityId: string): Promise<NeighborhoodProps[]>
  getNeighborhoodById(id: string): Promise<NeighborhoodProps>
  loadAddressByZipCode(zipCode: string): Promise<AddressProps>
}
