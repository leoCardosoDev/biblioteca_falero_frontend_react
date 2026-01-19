import { useQuery } from '@tanstack/react-query'

import type { LibraryRepository } from '@/modules/library/application'
import { LoadBooksUseCase } from '@/modules/library/application'

const BOOKS_QUERY_KEY = ['library', 'books'] as const

export function useBooks(repository: LibraryRepository) {
  const useCase = new LoadBooksUseCase(repository)

  return useQuery({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: () => useCase.execute()
  })
}
