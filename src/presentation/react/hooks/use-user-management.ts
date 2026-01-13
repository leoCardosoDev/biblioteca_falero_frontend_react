import { useState, useCallback, useEffect } from 'react'

import { User } from '@/domain/models'
import {
  LoadUsers,
  LoadUserById,
  AddUser,
  AddUserParams,
  UpdateUser,
  UpdateUserParams,
  DeleteUser
} from '@/domain/usecases'
import {
  ManageUserAccess,
  ManageUserAccessParams
} from '@/domain/usecases/manage-user-access'

export interface UseUserManagementProps {
  loadUsers: LoadUsers
  loadUserById: LoadUserById
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
  manageUserAccess: ManageUserAccess
}

export function useUserManagement({
  loadUsers,
  loadUserById,
  addUser,
  updateUser,
  deleteUser,
  manageUserAccess
}: UseUserManagementProps) {
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
    } catch (_err: unknown) {
      setError('Erro ao criar usuário.')
      return false
    }
  }

  const handleUpdateUser = async (params: UpdateUserParams) => {
    try {
      await updateUser.perform(params)
      await fetchUsers()
      return true
    } catch (_err: unknown) {
      setError('Erro ao atualizar usuário.')
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

  const handleManageAccess = async (params: ManageUserAccessParams) => {
    try {
      await manageUserAccess.perform(params)
      await fetchUsers()
      return { success: true }
    } catch (err: unknown) {
      let errorMessage =
        err instanceof Error ? err.message : 'Erro ao atualizar acesso.'
      if (errorMessage === 'Login not found') {
        errorMessage =
          'Para alterar o perfil, é necessário definir uma senha primeiro.'
      }
      return { success: false, error: errorMessage }
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
    handleManageAccess,
    handleLoadUserById
  }
}
