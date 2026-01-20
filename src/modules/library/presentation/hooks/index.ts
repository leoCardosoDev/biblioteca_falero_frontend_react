import { apiClient } from '@/shared/infra/http/axios-adapter'
import { HttpLibraryRepository } from '@/modules/library/infra'
import {
  createUseGetBooksQuery,
  createUseGetLoansQuery,
  createUseGetBookByIdQuery,
  createUseCreateLoanMutation
} from '@/modules/library/infra'

const API_BASE_URL = '/api'

const libraryRepository = new HttpLibraryRepository(apiClient, API_BASE_URL)

export const useGetBooks = createUseGetBooksQuery(libraryRepository)
export const useGetLoans = createUseGetLoansQuery(libraryRepository)
export const useGetBookById = createUseGetBookByIdQuery(libraryRepository)
export const useCreateLoan = createUseCreateLoanMutation(libraryRepository)
