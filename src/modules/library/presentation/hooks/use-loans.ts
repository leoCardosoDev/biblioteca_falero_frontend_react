import { useQuery } from '@tanstack/react-query'

import type { LibraryRepository } from '@/modules/library/application'
import { LoadLoansUseCase } from '@/modules/library/application'

const LOANS_QUERY_KEY = ['library', 'loans'] as const

export function useLoans(repository: LibraryRepository) {
  const useCase = new LoadLoansUseCase(repository)

  return useQuery({
    queryKey: LOANS_QUERY_KEY,
    queryFn: () => useCase.execute()
  })
}
