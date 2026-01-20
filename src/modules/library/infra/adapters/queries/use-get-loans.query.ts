import { useQuery } from '@tanstack/react-query'

import type { Loan } from '@/modules/library/domain'
import {
  LoadLoansUseCase,
  type LibraryRepository
} from '@/modules/library/application'

export function createUseGetLoansQuery(repository: LibraryRepository) {
  const useCase = new LoadLoansUseCase(repository)

  return function useGetLoansQuery() {
    return useQuery<Loan[], Error>({
      queryKey: ['library', 'loans'],
      queryFn: () => useCase.execute()
    })
  }
}
