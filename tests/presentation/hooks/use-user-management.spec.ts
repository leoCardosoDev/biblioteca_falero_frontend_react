import { renderHook, act, waitFor } from '@testing-library/react'
import { useUserManagement } from '@/presentation/hooks/use-user-management'
import { describe, test, expect, vi } from 'vitest'
import type { LoadUsers } from '@/domain/usecases/load-users'
import type { AddUser } from '@/domain/usecases/add-user'
import type { UpdateUser } from '@/domain/usecases/update-user'
import type { DeleteUser } from '@/domain/usecases/delete-user'
import { UserModel } from '@/domain/models/user-model'

// Mocks
const makeLoadUsers = (): LoadUsers => {
  return {
    perform: vi.fn(async () => [])
  }
}

const makeAddUser = (): AddUser => {
  return {
    perform: vi.fn(async (params) => ({ id: 'new_id', ...params, status: 'active' } as UserModel))
  }
}

const makeUpdateUser = (): UpdateUser => {
  return {
    perform: vi.fn(async (params) => ({ id: params.id, name: 'updated', email: 'updated@mail.com', status: 'active' } as UserModel))
  }
}

const makeDeleteUser = (): DeleteUser => {
  return {
    perform: vi.fn(async () => Promise.resolve())
  }
}

describe('useUserManagement Hook', () => {
  test('Should start with initial state', async () => {
    const loadUsers = makeLoadUsers()
    const addUser = makeAddUser()
    const updateUser = makeUpdateUser()
    const deleteUser = makeDeleteUser()

    const { result } = renderHook(() => useUserManagement({
      loadUsers, addUser, updateUser, deleteUser
    }))

    expect(result.current.users).toEqual([])
    expect(result.current.isLoading).toBe(true) // Starts loading immediately due to useEffect
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  test('Should load users on mount', async () => {
    const loadUsers = makeLoadUsers()
    const mockUsers = [{ id: '1', name: 'User 1' }] as UserModel[]
    vi.spyOn(loadUsers, 'perform').mockResolvedValueOnce(mockUsers)

    const addUser = makeAddUser()
    const updateUser = makeUpdateUser()
    const deleteUser = makeDeleteUser()

    const { result } = renderHook(() => useUserManagement({
      loadUsers, addUser, updateUser, deleteUser
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

    const { result } = renderHook(() => useUserManagement({
      loadUsers, addUser, updateUser, deleteUser
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

    const { result } = renderHook(() => useUserManagement({
      loadUsers, addUser, updateUser, deleteUser
    }))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      const success = await result.current.handleAddUser({ name: 'New User', email: 'new@mail.com', role: 'user' })
      expect(success).toBe(true)
    })

    expect(addUser.perform).toHaveBeenCalled()
    expect(loadUsers.perform).toHaveBeenCalledTimes(2) // 1 initial + 1 after add
  })
})
