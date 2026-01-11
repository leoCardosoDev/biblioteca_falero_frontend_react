import { useState } from 'react'

import { User } from '@/domain/models'
import {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  AddUserLogin,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/domain/usecases'
import { useUserManagement } from '@/presentation/react/hooks/use-user-management'
import { UserListView } from '@/presentation/react/pages/user-list/user-list-view'
import { UserFormData } from '@/presentation/react/components/forms'
import { CredentialFormData } from '@/presentation/react/components/credential-modal/credential-modal'

interface UsersProps {
  loadUsers: LoadUsers
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
  addUserLogin: AddUserLogin
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
  addUserLogin,
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
    handleLoadUserById
  } = useUserManagement({
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
    loadUserById
  })

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [userForCredentials, setUserForCredentials] = useState<User | null>(
    null
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.cpf && user.cpf.includes(searchTerm)) ||
      (user.enrollmentId && user.enrollmentId.includes(searchTerm))

    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
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
      success = await handleUpdateUser({ id: selectedUser.id, ...data })
    } else {
      success = await handleAddUser(data)
    }

    if (success) {
      setIsUserModalOpen(false)
    }
  }

  const onSaveCredentials = async (data: CredentialFormData) => {
    try {
      if (data.role !== userForCredentials!.role) {
        await handleUpdateUser({
          id: userForCredentials!.id,
          role: data.role
        })
      }

      await addUserLogin.perform({
        userId: userForCredentials!.id,
        password: data.password
      })
      setIsCredentialModalOpen(false)
    } catch (_error) {
      // TODO: implement error handling
    }
  }

  const onDeleteClick = async (user: User) => {
    if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
      await handleDeleteUser(user.id)
    }
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
      }}
      onSaveUser={onSaveUser}
      onSaveCredentials={onSaveCredentials}
      loadAddressByZipCode={loadAddressByZipCode}
      loadCityById={loadCityById}
      loadStateById={loadStateById}
      loadNeighborhoodById={loadNeighborhoodById}
    />
  )
}
