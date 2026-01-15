import { useState } from 'react'

import type { User } from '@/domain/models'
import type {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById,
  ManageUserAccess
} from '@/domain/usecases'
import { useUserManagement, useUserFilter } from '@/presentation/react/hooks'
import { UserListView } from '@/presentation/react/pages/user-list/user-list-view'
import type { UserFormData } from '@/presentation/react/components/forms'
import type { CredentialFormData } from '@/presentation/react/components/credential-modal/credential-modal'

interface UsersProps {
  loadUsers: LoadUsers
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
  manageUserAccess: ManageUserAccess
  loadUserById: LoadUserById
  loadAddressByZipCode: LoadAddressByZipCode
  loadCityById: LoadCityById
  loadStateById: LoadStateById
  loadNeighborhoodById: LoadNeighborhoodById
}

export function UserListController({
  loadUsers,
  addUser,
  updateUser,
  deleteUser,
  manageUserAccess,
  loadUserById,
  loadAddressByZipCode,
  loadCityById,
  loadStateById,
  loadNeighborhoodById
}: UsersProps) {
  const {
    users,
    isLoading,
    error,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    handleManageAccess,
    handleLoadUserById
  } = useUserManagement({
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
    manageUserAccess,
    loadUserById
  })

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [userForCredentials, setUserForCredentials] = useState<User | null>(
    null
  )
  const [credentialError, setCredentialError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const filteredUsers = useUserFilter({
    users,
    searchTerm,
    statusFilter,
    roleFilter
  })

  const handleOpenCreate = () => {
    setSelectedUser(undefined)
    setIsUserModalOpen(true)
  }

  const handleOpenEdit = async (user: User) => {
    const fullUser = await handleLoadUserById(user.id)
    if (fullUser) {
      setSelectedUser(fullUser)
      setIsUserModalOpen(true)
    }
  }

  const handleOpenCredentials = (user: User) => {
    setUserForCredentials(user)
    setIsCredentialModalOpen(true)
  }

  const onSaveUser = async (data: UserFormData) => {
    let success = false
    if (selectedUser) {
      success = await handleUpdateUser({
        id: selectedUser.id,
        ...data,
        address: {
          ...data.address,
          neighborhoodId: data.address.neighborhoodId ?? undefined,
          cityId: data.address.cityId ?? undefined,
          stateId: data.address.stateId ?? undefined
        }
      })
    } else {
      success = await handleAddUser({
        ...data,
        address: {
          ...data.address,
          neighborhoodId: data.address.neighborhoodId ?? undefined,
          cityId: data.address.cityId ?? undefined,
          stateId: data.address.stateId ?? undefined
        }
      })
    }

    if (success) {
      setIsUserModalOpen(false)
    }
  }

  const onSaveCredentials = async (data: CredentialFormData) => {
    if (!userForCredentials) return

    const result = await handleManageAccess({
      id: userForCredentials.id,
      role: data.role === userForCredentials.role ? undefined : data.role,
      status: data.status,
      password: data.password || undefined
    })

    if (result.success) {
      setIsCredentialModalOpen(false)
      setCredentialError(null)
    } else {
      setCredentialError(result.error || 'Erro ao salvar credenciais')
    }
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const onDeleteClick = (user: User) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  const onConfirmDelete = async () => {
    if (userToDelete) {
      const success = await handleDeleteUser(userToDelete.id)
      if (success) {
        // Modal will close automatically after success animation
        setUserToDelete(null)
      }
    }
  }

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  return (
    <UserListView
      users={filteredUsers}
      isLoading={isLoading}
      error={error}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      roleFilter={roleFilter}
      isUserModalOpen={isUserModalOpen}
      isCredentialModalOpen={isCredentialModalOpen}
      selectedUser={selectedUser}
      userForCredentials={userForCredentials}
      onSearchChange={setSearchTerm}
      onStatusFilterChange={setStatusFilter}
      onRoleFilterChange={setRoleFilter}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onOpenCredentials={handleOpenCredentials}
      onDeleteClick={onDeleteClick}
      onCloseUserModal={() => setIsUserModalOpen(false)}
      onCloseCredentialModal={() => {
        setIsCredentialModalOpen(false)
        setUserForCredentials(null)
        setCredentialError(null)
      }}
      onSaveUser={onSaveUser}
      onSaveCredentials={onSaveCredentials}
      credentialError={credentialError}
      loadAddressByZipCode={loadAddressByZipCode}
      loadCityById={loadCityById}
      loadStateById={loadStateById}
      loadNeighborhoodById={loadNeighborhoodById}
      isDeleteModalOpen={isDeleteModalOpen}
      userToDelete={userToDelete}
      onCloseDeleteModal={onCloseDeleteModal}
      onConfirmDelete={onConfirmDelete}
    />
  )
}
