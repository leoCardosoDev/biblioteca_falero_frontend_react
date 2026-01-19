import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/infra/http/axios-adapter'
import { HttpLibraryRepository } from '@/modules/library/infra/HttpLibraryRepository'

const libraryRepository = new HttpLibraryRepository(apiClient)

export function useLoans() {
  return useQuery({
    queryKey: ['loans'],
    queryFn: () => libraryRepository.getLoans()
  })
}
