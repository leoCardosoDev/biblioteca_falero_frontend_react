import { useState, useCallback, useEffect } from 'react'
import { User } from '@/domain/models/user'
import { LoadUsers } from '@/domain/usecases/load-users'
import { LoadUserById } from '@/domain/usecases/load-user-by-id'
import { AddUser, AddUserParams } from '@/domain/usecases/add-user'
import { UpdateUser, UpdateUserParams } from '@/domain/usecases/update-user'
import { DeleteUser } from '@/domain/usecases/delete-user'

export interface UseUserManagementProps {
  loadUsers: LoadUsers
  loadUserById: LoadUserById
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
}

type ApiError = {
  response?: {
    data?: {
      error?: string | { message?: string }
    }
  }
}

export const useUserManagement = ({
  loadUsers,
  loadUserById,
  addUser,
  updateUser,
  deleteUser
}: UseUserManagementProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await loadUsers.perform()
      setUsers(data)
    } catch (_err: unknown) {
      setError('Erro ao carregar usuários.')
    } finally {
      setIsLoading(false)
    }
  }, [loadUsers])

  const handleAddUser = async (params: AddUserParams) => {
    try {
      await addUser.perform(params)
      await fetchUsers()
      return true
    } catch (err) {
      let message = 'Erro ao criar usuário.'
      const error = err as ApiError
      if (error.response?.data?.error) {
        const errorData = error.response.data.error
        message =
          typeof errorData === 'string'
            ? errorData
            : errorData.message || 'Erro nos dados enviados.'
      }
      setError(message)
      return false
    }
  }

  const handleUpdateUser = async (params: UpdateUserParams) => {
    try {
      await updateUser.perform(params)
      await fetchUsers()
      return true
    } catch (err) {
      let message = 'Erro ao atualizar usuário.'
      const error = err as ApiError
      if (error.response?.data?.error) {
        const errorData = error.response.data.error
        message =
          typeof errorData === 'string'
            ? errorData
            : errorData.message || 'Erro nos dados enviados.'
      }
      setError(message)
      return false
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser.perform(id)
      await fetchUsers()
      return true
    } catch (_err: unknown) {
      setError('Erro ao excluir usuário.')
      return false
    }
  }

  const handleLoadUserById = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      return await loadUserById.perform(id)
    } catch (_err: unknown) {
      setError('Erro ao carregar detalhes do usuário.')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    isLoading,
    error,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    handleLoadUserById
  }
}
