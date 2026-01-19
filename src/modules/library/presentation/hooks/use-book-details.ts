import { useQuery } from '@tanstack/react-query'

import type { LibraryRepository } from '@/modules/library/application'
import { LoadBookByIdUseCase } from '@/modules/library/application'

const BOOK_DETAIL_QUERY_KEY = (id: string) => ['library', 'books', id] as const

export function useBookDetails(repository: LibraryRepository, bookId: string) {
  const useCase = new LoadBookByIdUseCase(repository)

  return useQuery({
    queryKey: BOOK_DETAIL_QUERY_KEY(bookId),
    queryFn: () => useCase.execute(bookId),
    enabled: !!bookId
  })
}
