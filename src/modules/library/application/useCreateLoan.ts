import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/infra/http/axios-adapter'
import { HttpLibraryRepository } from '@/modules/library/infra/HttpLibraryRepository'

const libraryRepository = new HttpLibraryRepository(apiClient)

export function useCreateLoan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (vars: { bookId: string; userId: string }) =>
      libraryRepository.createLoan(vars.bookId, vars.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
      queryClient.invalidateQueries({ queryKey: ['books'] }) // Status might change
    }
  })
}
