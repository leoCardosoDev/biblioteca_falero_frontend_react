import { useQuery } from '@tanstack/react-query'
import type { GeographyRepository } from '../protocols/geography-repository'
import type { StateProps } from '../../domain/entities/state'
import type { CityProps } from '../../domain/entities/city'
import type { NeighborhoodProps } from '../../domain/entities/neighborhood'
import type { AddressProps } from '../../domain/value-objects/address'

export const geographyQueryKeys = {
  states: ['geography', 'states'] as const,
  cities: (stateId: string) => ['geography', 'cities', stateId] as const,
  neighborhoods: (cityId: string) => ['geography', 'neighborhoods', cityId] as const,
  addressByZipCode: (zipCode: string) => ['geography', 'address', zipCode] as const
}

export function createGeographyHooks(repository: GeographyRepository) {
  function useStates() {
    return useQuery<StateProps[]>({
      queryKey: geographyQueryKeys.states,
      queryFn: () => repository.getStates(),
      staleTime: Infinity
    })
  }

  function useCities(stateId: string | undefined) {
    return useQuery<CityProps[]>({
      queryKey: geographyQueryKeys.cities(stateId ?? ''),
      queryFn: () => repository.getCities(stateId!),
      enabled: !!stateId,
      staleTime: Infinity
    })
  }

  function useNeighborhoods(cityId: string | undefined) {
    return useQuery<NeighborhoodProps[]>({
      queryKey: geographyQueryKeys.neighborhoods(cityId ?? ''),
      queryFn: () => repository.getNeighborhoods(cityId!),
      enabled: !!cityId,
      staleTime: Infinity
    })
  }

  function useAddressByZipCode(zipCode: string | undefined) {
    return useQuery<AddressProps>({
      queryKey: geographyQueryKeys.addressByZipCode(zipCode ?? ''),
      queryFn: () => repository.loadAddressByZipCode(zipCode!),
      enabled: !!zipCode && zipCode.length === 8
    })
  }

  return {
    useStates,
    useCities,
    useNeighborhoods,
    useAddressByZipCode
  }
}
