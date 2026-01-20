import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  CreateLoanUseCase,
  type LibraryRepository,
  type CreateLoanParams
} from '@/modules/library/application'

export function createUseCreateLoanMutation(repository: LibraryRepository) {
  const useCase = new CreateLoanUseCase(repository)

  return function useCreateLoanMutation() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, CreateLoanParams>({
      mutationFn: (params) => useCase.execute(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['library', 'loans'] })
        queryClient.invalidateQueries({ queryKey: ['library', 'books'] })
      }
    })
  }
}
