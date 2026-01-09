import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/presentation/react/hooks/use-auth'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { InvalidCredentialsError } from '@/domain/errors'
import type { AccountModel } from '@/domain/models'

// Mock the context hook
const mocks = vi.hoisted(() => ({
  login: vi.fn(),
  isLoading: false,
  isAuthenticated: false
}))

vi.mock('@/presentation/react/hooks/use-auth-context', () => ({
  useAuthContext: () => ({
    login: mocks.login,
    isLoading: mocks.isLoading || false,
    isAuthenticated: mocks.isAuthenticated || false
  })
}))

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Should return initial state', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.isAuthenticated).toBe(false)
  })

  test('Should call login with correct values', async () => {
    const { result } = renderHook(() => useAuth())
    const account: AccountModel = {
      accessToken: 'any_token',
      name: 'any_name',
      role: 'any_role',
      refreshToken: 'any_refresh_token'
    }
    mocks.login.mockResolvedValueOnce(account)

    let response
    await act(async () => {
      response = await result.current.performLogin({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })

    expect(mocks.login).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(response).toEqual(account)
  })

  test('Should set error if login fails (null response)', async () => {
    const { result } = renderHook(() => useAuth())
    mocks.login.mockResolvedValueOnce(null)

    await act(async () => {
      await result.current.performLogin({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })

    expect(result.current.error).toBe('Erro inesperado: Falha no login')
  })

  test('Should set error if login throws InvalidCredentialsError', async () => {
    const { result } = renderHook(() => useAuth())
    const error = new InvalidCredentialsError()
    mocks.login.mockRejectedValueOnce(error)

    await act(async () => {
      await result.current.performLogin({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })

    expect(result.current.error).toBe(error.message)
  })

  test('Should set error if login throws unexpected error', async () => {
    const { result } = renderHook(() => useAuth())
    mocks.login.mockRejectedValueOnce(new Error())

    await act(async () => {
      await result.current.performLogin({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })

    expect(result.current.error).toBe(
      'Erro inesperado. Tente novamente mais tarde.'
    )
  })

  test('Should call onSuccess if loginSubmit succeeds', async () => {
    const { result } = renderHook(() => useAuth())
    const account: AccountModel = {
      accessToken: 'any_token',
      name: 'any_name',
      role: 'any_role',
      refreshToken: 'any_refresh_token'
    }
    mocks.login.mockResolvedValueOnce(account)
    const onSuccess = vi.fn()

    const submit = result.current.loginSubmit(onSuccess)
    const data = { email: 'any_email@mail.com', password: 'any_password' }

    await act(async () => {
      await submit(data)
    })

    expect(onSuccess).toHaveBeenCalledWith(account)
  })

  test('Should not call onSuccess if loginSubmit fails', async () => {
    const { result } = renderHook(() => useAuth())
    mocks.login.mockResolvedValueOnce(null)
    const onSuccess = vi.fn()

    const submit = result.current.loginSubmit(onSuccess)
    const data = { email: 'any_email@mail.com', password: 'any_password' }

    await act(async () => {
      await submit(data)
    })

    expect(onSuccess).not.toHaveBeenCalled()
  })

  test('Should return isAuthenticated from context', () => {
    mocks.isAuthenticated = true
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(true)
  })

  test('Should return isLoading from context', () => {
    mocks.isLoading = true
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoading).toBe(true)
  })
})
