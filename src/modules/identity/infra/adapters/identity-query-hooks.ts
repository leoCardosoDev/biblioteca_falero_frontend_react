import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  IdentityRepository,
  LoginRequestDto,
  CreateUserDto,
  UpdateUserDto
} from '../../application/protocols'
import { useAuthStore } from '../store'

const USERS_QUERY_KEY = ['users']
const USER_QUERY_KEY = (id: string) => ['user', id]

export function createIdentityHooks(repository: IdentityRepository) {
  function useLogin() {
    const setCredentials = useAuthStore((state) => state.setCredentials)

    return useMutation({
      mutationFn: async (dto: LoginRequestDto) => {
        const response = await repository.login(dto)
        setCredentials(response.accessToken, response.name)
        return response
      }
    })
  }

  function useLogout() {
    const clearCredentials = useAuthStore((state) => state.clearCredentials)
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async () => {
        await repository.logout()
        clearCredentials()
        queryClient.clear()
      }
    })
  }

  function useUsers() {
    return useQuery({
      queryKey: USERS_QUERY_KEY,
      queryFn: () => repository.loadUsers()
    })
  }

  function useUserById(id: string) {
    return useQuery({
      queryKey: USER_QUERY_KEY(id),
      queryFn: () => repository.loadUserById(id),
      enabled: !!id
    })
  }

  function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (dto: CreateUserDto) => repository.createUser(dto),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      }
    })
  }

  function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (dto: UpdateUserDto) => repository.updateUser(dto),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY(data.id) })
      }
    })
  }

  function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id: string) => repository.deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      }
    })
  }

  return {
    useLogin,
    useLogout,
    useUsers,
    useUserById,
    useCreateUser,
    useUpdateUser,
    useDeleteUser
  }
}
