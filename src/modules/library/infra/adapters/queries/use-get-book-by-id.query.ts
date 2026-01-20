import { useQuery } from '@tanstack/react-query'

import type { Book } from '@/modules/library/domain'
import {
  LoadBookByIdUseCase,
  type LibraryRepository
} from '@/modules/library/application'

export function createUseGetBookByIdQuery(repository: LibraryRepository) {
  const useCase = new LoadBookByIdUseCase(repository)

  return function useGetBookByIdQuery(bookId: string) {
    return useQuery<Book | null, Error>({
      queryKey: ['library', 'book', bookId],
      queryFn: () => useCase.execute(bookId),
      enabled: Boolean(bookId)
    })
  }
}
