import { useQuery } from '@tanstack/react-query'

import type { Book } from '@/modules/library/domain'
import {
  LoadBooksUseCase,
  type LibraryRepository
} from '@/modules/library/application'

export function createUseGetBooksQuery(repository: LibraryRepository) {
  const useCase = new LoadBooksUseCase(repository)

  return function useGetBooksQuery() {
    return useQuery<Book[], Error>({
      queryKey: ['library', 'books'],
      queryFn: () => useCase.execute()
    })
  }
}
