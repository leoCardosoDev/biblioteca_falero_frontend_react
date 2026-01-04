import { renderHook, act, waitFor } from '@testing-library/react'
import { useUserManagement } from '@/presentation/react/hooks/use-user-management'
import { describe, test, expect, vi } from 'vitest'
import type { LoadUsers } from '@/domain/usecases/load-users'
import type { LoadUserById } from '@/domain/usecases/load-user-by-id'
import type { AddUser } from '@/domain/usecases/add-user'
import type { UpdateUser } from '@/domain/usecases/update-user'
import type { DeleteUser } from '@/domain/usecases/delete-user'
import type { User } from '@/domain/models/user'

// Mocks
const makeLoadUserById = (): LoadUserById => {
  return {
    perform: vi.fn(async () => ({ id: 'any_id', name: 'any_name' } as User))
  }
}

const makeLoadUsers = (): LoadUsers => {
  return {
    perform: vi.fn(async () => [])
  }
}

const makeAddUser = (): AddUser => {
  return {
    perform: vi.fn(async (params) => ({ id: 'new_id', ...params, status: 'active' } as User))
  }
}

const makeUpdateUser = (): UpdateUser => {
  return {
    perform: vi.fn(async (params) => ({ id: params.id, name: 'updated', email: 'updated@mail.com', status: 'active' } as User))
  }
}

const makeDeleteUser = (): DeleteUser => {
  return {
    perform: vi.fn(async () => Promise.resolve())
  }
}

describe('useUserManagement Hook', () => {
  test('Should start with empty state and load data', async () => {
    const loadUsers = makeLoadUsers()
    const loadUserById = makeLoadUserById()
    const addUser = makeAddUser()
    const updateUser = makeUpdateUser()
    const deleteUser = makeDeleteUser()

    const { result } = renderHook(() => useUserManagement({
      loadUsers, loadUserById, addUser, updateUser, deleteUser
    }))

    expect(result.current.users).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })
})

test('Should load users on mount', async () => {
  const loadUsers = makeLoadUsers()
  const mockUsers = [{ id: '1', name: 'User 1' }] as User[]
  vi.spyOn(loadUsers, 'perform').mockResolvedValueOnce(mockUsers)

  const addUser = makeAddUser()
  const updateUser = makeUpdateUser()
  const deleteUser = makeDeleteUser()

  const loadUserById = makeLoadUserById()
  const { result } = renderHook(() => useUserManagement({
    loadUsers, loadUserById, addUser, updateUser, deleteUser
  }))

  await waitFor(() => {
    expect(result.current.users).toEqual(mockUsers)
  })
})

test('Should handle error during load', async () => {
  const loadUsers = makeLoadUsers()
  vi.spyOn(loadUsers, 'perform').mockRejectedValueOnce(new Error('Load error'))

  const addUser = makeAddUser()
  const updateUser = makeUpdateUser()
  const deleteUser = makeDeleteUser()

  const loadUserById = makeLoadUserById()
  const { result } = renderHook(() => useUserManagement({
    loadUsers, loadUserById, addUser, updateUser, deleteUser
  }))

  await waitFor(() => {
    expect(result.current.error).toBe('Erro ao carregar usuários.')
    expect(result.current.isLoading).toBe(false)
  })
})

test('Should add user and reload list', async () => {
  const loadUsers = makeLoadUsers()
  const addUser = makeAddUser()
  const updateUser = makeUpdateUser()
  const deleteUser = makeDeleteUser()

  const loadUserById = makeLoadUserById()
  const { result } = renderHook(() => useUserManagement({
    loadUsers, loadUserById, addUser, updateUser, deleteUser
  }))

  await waitFor(() => expect(result.current.isLoading).toBe(false))

  await act(async () => {
    const success = await result.current.handleAddUser({
      name: 'New User',
      email: 'new@mail.com',
      rg: '123',
      cpf: '123',
      birthDate: '2000-01-01',
      address: { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' },
      role: 'PROFESSOR',
      status: 'ACTIVE'
    })
    expect(success).toBe(true)
  })

  expect(addUser.perform).toHaveBeenCalled()
  expect(loadUsers.perform).toHaveBeenCalledTimes(2) // 1 initial + 1 after add
})

test('Should load user by id correctly', async () => {
  const loadUsers = makeLoadUsers()
  const loadUserById = makeLoadUserById()
  const addUser = makeAddUser()
  const updateUser = makeUpdateUser()
  const deleteUser = makeDeleteUser()

  const mockUser = { id: 'any_id', name: 'Full User Profile' } as User
  vi.spyOn(loadUserById, 'perform').mockResolvedValueOnce(mockUser)

  const { result } = renderHook(() => useUserManagement({
    loadUsers, loadUserById, addUser, updateUser, deleteUser
  }))

  await waitFor(() => expect(result.current.isLoading).toBe(false))

  let loadedUser
  await act(async () => {
    loadedUser = await result.current.handleLoadUserById('any_id')
  })

  expect(loadedUser).toEqual(mockUser)
  expect(loadUserById.perform).toHaveBeenCalledWith('any_id')
})
