import { renderHook, act, waitFor } from '@testing-library/react'
import { useUserManagement } from '@/presentation/react/hooks/use-user-management'
import { describe, test, expect, vi } from 'vitest'
import type { LoadUsers } from '@/domain/usecases/load-users'
import type { LoadUserById } from '@/domain/usecases/load-user-by-id'
import type { AddUser, AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUser, UpdateUserParams } from '@/domain/usecases/update-user'
import type { DeleteUser } from '@/domain/usecases/delete-user'
import type { User } from '@/domain/models/user'

const makeUser = (id = 'any_id'): User => ({
  id,
  name: 'any_name',
  email: 'any_email',
  rg: 'any_rg',
  cpf: 'any_cpf',
  role: 'STUDENT',
  status: 'ACTIVE',
  address: {
    street: 'any_street',
    number: 'any_number',
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zip'
  }
})

const makeLoadUserById = (): LoadUserById => ({
  perform: vi.fn(async () => makeUser())
})

const makeLoadUsers = (): LoadUsers => ({
  perform: vi.fn(async () => [makeUser()])
})

const makeAddUser = (): AddUser => ({
  perform: vi.fn(async (params) => ({ id: 'new_id', ...params, status: 'ACTIVE' } as unknown as User))
})

const makeUpdateUser = (): UpdateUser => ({
  perform: vi.fn(async (params) => ({ ...makeUser(params.id), ...params } as unknown as User))
})

const makeDeleteUser = (): DeleteUser => ({
  perform: vi.fn(async () => Promise.resolve())
})

interface SutTypes {
  loadUsers: LoadUsers
  loadUserById: LoadUserById
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
}

const makeSut = (): SutTypes => ({
  loadUsers: makeLoadUsers(),
  loadUserById: makeLoadUserById(),
  addUser: makeAddUser(),
  updateUser: makeUpdateUser(),
  deleteUser: makeDeleteUser()
})

describe('useUserManagement Hook', () => {
  test('Should load users on mount', async () => {
    const { loadUsers, loadUserById, addUser, updateUser, deleteUser } = makeSut()
    const { result } = renderHook(() => useUserManagement({ loadUsers, loadUserById, addUser, updateUser, deleteUser }))

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => {
      expect(result.current.users).toHaveLength(1)
      expect(result.current.isLoading).toBe(false)
    })
  })

  test('Should handle error during initial load', async () => {
    const sut = makeSut()
    vi.spyOn(sut.loadUsers, 'perform').mockRejectedValueOnce(new Error())
    const { result } = renderHook(() => useUserManagement(sut))

    await waitFor(() => {
      expect(result.current.error).toBe('Erro ao carregar usuários.')
      expect(result.current.isLoading).toBe(false)
    })
  })

  test('Should add user and reload list', async () => {
    const sut = makeSut()
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const params: AddUserParams = {
      name: 'New User',
      email: 'new@mail.com',
      rg: '123',
      cpf: '123',
      role: 'STUDENT',
      status: 'ACTIVE',
      address: makeUser().address!
    }

    let success
    await act(async () => {
      success = await result.current.handleAddUser(params)
    })

    expect(success).toBe(true)
    expect(sut.addUser.perform).toHaveBeenCalledWith(params)
    expect(sut.loadUsers.perform).toHaveBeenCalledTimes(2)
  })

  test('Should handle error on add user', async () => {
    const sut = makeSut()
    vi.spyOn(sut.addUser, 'perform').mockRejectedValueOnce(new Error())
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let success
    await act(async () => {
      success = await result.current.handleAddUser({} as unknown as AddUserParams)
    })

    expect(success).toBe(false)
    expect(result.current.error).toBe('Erro ao criar usuário.')
  })

  test('Should update user and reload list', async () => {
    const sut = makeSut()
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const params: UpdateUserParams = { id: 'any_id', name: 'Updated Name' }
    let success
    await act(async () => {
      success = await result.current.handleUpdateUser(params)
    })

    expect(success).toBe(true)
    expect(sut.updateUser.perform).toHaveBeenCalledWith(params)
    expect(sut.loadUsers.perform).toHaveBeenCalledTimes(2)
  })

  test('Should handle error on update user', async () => {
    const sut = makeSut()
    vi.spyOn(sut.updateUser, 'perform').mockRejectedValueOnce(new Error())
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let success
    await act(async () => {
      success = await result.current.handleUpdateUser({ id: 'any_id' })
    })

    expect(success).toBe(false)
    expect(result.current.error).toBe('Erro ao atualizar usuário.')
  })

  test('Should delete user and reload list', async () => {
    const sut = makeSut()
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let success
    await act(async () => {
      success = await result.current.handleDeleteUser('any_id')
    })

    expect(success).toBe(true)
    expect(sut.deleteUser.perform).toHaveBeenCalledWith('any_id')
    expect(sut.loadUsers.perform).toHaveBeenCalledTimes(2)
  })

  test('Should handle error on delete user', async () => {
    const sut = makeSut()
    vi.spyOn(sut.deleteUser, 'perform').mockRejectedValueOnce(new Error())
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let success
    await act(async () => {
      success = await result.current.handleDeleteUser('any_id')
    })

    expect(success).toBe(false)
    expect(result.current.error).toBe('Erro ao excluir usuário.')
  })

  test('Should load user by id', async () => {
    const sut = makeSut()
    const user = makeUser('target_id')
    vi.spyOn(sut.loadUserById, 'perform').mockResolvedValueOnce(user)
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let loadedUser
    await act(async () => {
      loadedUser = await result.current.handleLoadUserById('target_id')
    })

    expect(loadedUser).toEqual(user)
    expect(sut.loadUserById.perform).toHaveBeenCalledWith('target_id')
  })

  test('Should handle error on load user by id', async () => {
    const sut = makeSut()
    vi.spyOn(sut.loadUserById, 'perform').mockRejectedValueOnce(new Error())
    const { result } = renderHook(() => useUserManagement(sut))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let loadedUser
    await act(async () => {
      loadedUser = await result.current.handleLoadUserById('any_id')
    })

    expect(loadedUser).toBeNull()
    expect(result.current.error).toBe('Erro ao carregar detalhes do usuário.')
  })
})
