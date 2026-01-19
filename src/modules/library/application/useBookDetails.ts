import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/infra/http/axios-adapter'
import { HttpLibraryRepository } from '@/modules/library/infra/HttpLibraryRepository'

const libraryRepository = new HttpLibraryRepository(apiClient)

export function useBookDetails(bookId: string) {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => libraryRepository.getBookById(bookId),
    enabled: !!bookId
  })
}
