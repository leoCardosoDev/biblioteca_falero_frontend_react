// @vitest-environment jsdom
import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useUserManagement } from '@/shared/presentation/react/hooks/use-user-management'
import type {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  ManageUserAccess,
  LoadUserById
} from '@/shared/domain/usecases'
import type { User } from '@/shared/domain/models/user'

describe('useUserManagement', () => {
  const mockLoadUsers: LoadUsers = {
    perform: vi.fn().mockResolvedValue([{ id: '1' }])
  }
  const mockAddUser: AddUser = { perform: vi.fn() }
  const mockUpdateUser: UpdateUser = { perform: vi.fn() }
  const mockDeleteUser: DeleteUser = { perform: vi.fn() }
  const mockManageUserAccess: ManageUserAccess = { perform: vi.fn() }
  const mockLoadUserById: LoadUserById = { perform: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const defaultProps = {
    loadUsers: mockLoadUsers,
    loadUserById: mockLoadUserById,
    addUser: mockAddUser,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
    manageUserAccess: mockManageUserAccess
  }

  test('Should load users on mount', async () => {
    const { result } = renderHook(() => useUserManagement(defaultProps))

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1)
    })
    expect(mockLoadUsers.perform).toHaveBeenCalled()
  })

  test('Should handle manage access success', async () => {
    const { result } = renderHook(() => useUserManagement(defaultProps))

    await act(async () => {
      const response = await result.current.handleManageAccess({
        id: '1',
        role: 'ADMIN'
      })
      expect(response.success).toBe(true)
    })

    expect(mockManageUserAccess.perform).toHaveBeenCalledWith({
      id: '1',
      role: 'ADMIN'
    })
    expect(mockLoadUsers.perform).toHaveBeenCalledTimes(2) // mount + refetch
  })

  test('Should handle manage access error', async () => {
    const errorWithMsg = new Error('Erro ao atualizar acesso.')
    const errorMock = {
      ...mockManageUserAccess,
      perform: vi.fn().mockRejectedValue(errorWithMsg)
    }
    const { result } = renderHook(() =>
      useUserManagement({ ...defaultProps, manageUserAccess: errorMock })
    )

    await act(async () => {
      const response = await result.current.handleManageAccess({ id: '1' })
      expect(response.success).toBe(false)
      expect(response.error).toBe('Erro ao atualizar acesso.')
    })
  })

  test('Should translate "Login not found" error', async () => {
    vi.mocked(mockManageUserAccess.perform).mockRejectedValueOnce(
      new Error('Login not found')
    )
    const { result } = renderHook(() => useUserManagement(defaultProps))

    const response = await act(async () => {
      return await result.current.handleManageAccess({
        id: 'any_id',
        role: 'ADMIN',
        status: 'ACTIVE'
      })
    })

    expect(response).toEqual({
      success: false,
      error: 'Para alterar o perfil, é necessário definir uma senha primeiro.'
    })
  })

  test('Should filter out deleted users', async () => {
    const deletedUser = { id: '2', deletedAt: '2025-01-01' }
    const activeUser = { id: '1' }
    vi.mocked(mockLoadUsers.perform).mockResolvedValue([
      activeUser,
      deletedUser
    ] as unknown as User[])

    const { result } = renderHook(() => useUserManagement(defaultProps))

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1)
      expect(result.current.users[0].id).toBe('1')
    })
  })
})
