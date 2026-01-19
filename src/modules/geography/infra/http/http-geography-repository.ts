import type { HttpClient } from '@/application/protocols/http/http-client'
import type { GeographyRepository } from '../../application/protocols/geography-repository'
import type { StateProps } from '../../domain/entities/state'
import type { CityProps } from '../../domain/entities/city'
import type { NeighborhoodProps } from '../../domain/entities/neighborhood'
import type { AddressProps } from '../../domain/value-objects/address'

type StateApiResponse = {
  id: string
  name: string
  acronym: string
}

type CityApiResponse = {
  id: string
  name: string
  stateId: string
}

type NeighborhoodApiResponse = {
  id: string
  name: string
  cityId: string
}

type AddressApiResponse = {
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

export class HttpGeographyRepository implements GeographyRepository {
  constructor(private readonly httpClient: HttpClient) { }

  async getStates(): Promise<StateProps[]> {
    const response = await this.httpClient.request<StateApiResponse[]>({
      url: '/states',
      method: 'get'
    })

    return response.body.map((state) => ({
      id: state.id,
      name: state.name,
      abbreviation: state.acronym
    }))
  }

  async getCities(stateId: string): Promise<CityProps[]> {
    const response = await this.httpClient.request<CityApiResponse[]>({
      url: `/states/${stateId}/cities`,
      method: 'get'
    })

    return response.body.map((city) => ({
      id: city.id,
      name: city.name,
      stateId: city.stateId
    }))
  }

  async getNeighborhoods(cityId: string): Promise<NeighborhoodProps[]> {
    const response = await this.httpClient.request<NeighborhoodApiResponse[]>({
      url: `/cities/${cityId}/neighborhoods`,
      method: 'get'
    })

    return response.body.map((neighborhood) => ({
      id: neighborhood.id,
      name: neighborhood.name,
      cityId: neighborhood.cityId
    }))
  }

  async loadAddressByZipCode(zipCode: string): Promise<AddressProps> {
    const response = await this.httpClient.request<AddressApiResponse>({
      url: `/addresses/cep/${zipCode}`,
      method: 'get'
    })

    return response.body
  }
}
