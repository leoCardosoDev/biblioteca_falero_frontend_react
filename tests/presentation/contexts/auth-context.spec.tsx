import React, { useContext } from 'react'
import { render, act, waitFor, screen } from '@testing-library/react'
import { AuthProvider } from '@/presentation/react/contexts/auth-context'
import { AuthContext } from '@/presentation/react/contexts/auth-context-base'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import type { AuthFacade } from '@/application/facades/auth-facade'
import type { AccountModel } from '@/domain/models'

const makeAuthFacade = (): AuthFacade => ({
  login: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  authentication: {} as unknown,
  cacheRepository: {} as unknown
} as unknown as AuthFacade)

const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, signOut } = useContext(AuthContext)
  return (
    <div>
      <div data-testid="user">{user?.name || 'no-user'}</div>
      <div data-testid="auth">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="loading">{isLoading ? 'true' : 'false'}</div>
      <button onClick={() => login({ email: 'any_mail', password: 'any_password' })}>Login</button>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}

describe('AuthContext (AuthProvider)', () => {
  let authFacade: AuthFacade

  beforeEach(() => {
    authFacade = makeAuthFacade()
  })

  test('Should load user from cache on mount', async () => {
    const account: AccountModel = { accessToken: 'any_token', name: 'cached_user', role: 'STUDENT', refreshToken: 'any_refresh_token' }
    vi.spyOn(authFacade, 'getCurrentUser').mockResolvedValueOnce(account)

    render(
      <AuthProvider authFacade={authFacade}>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('true')

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('user')).toHaveTextContent('cached_user')
      expect(screen.getByTestId('auth')).toHaveTextContent('true')
    })
  })

  test('Should handle error when loading user from cache', async () => {
    vi.spyOn(authFacade, 'getCurrentUser').mockRejectedValueOnce(new Error())

    // Silence console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    render(
      <AuthProvider authFacade={authFacade}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    })

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  test('Should update user on successful login', async () => {
    vi.spyOn(authFacade, 'getCurrentUser').mockResolvedValueOnce(null)
    const account: AccountModel = { accessToken: 'new_token', name: 'new_user', role: 'STUDENT', refreshToken: 'any_refresh_token' }
    vi.spyOn(authFacade, 'login').mockResolvedValueOnce(account)

    render(
      <AuthProvider authFacade={authFacade}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))

    await act(async () => {
      screen.getByText('Login').click()
    })

    expect(screen.getByTestId('user')).toHaveTextContent('new_user')
    expect(screen.getByTestId('auth')).toHaveTextContent('true')
  })

  test('Should not update user on failed login (null return)', async () => {
    vi.spyOn(authFacade, 'getCurrentUser').mockResolvedValueOnce(null)
    vi.spyOn(authFacade, 'login').mockResolvedValueOnce(null)

    render(
      <AuthProvider authFacade={authFacade}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))

    await act(async () => {
      screen.getByText('Login').click()
    })

    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    expect(screen.getByTestId('auth')).toHaveTextContent('false')
  })

  test('Should clear user on signOut', async () => {
    const account: AccountModel = { accessToken: 'any_token', name: 'any_user', role: 'STUDENT', refreshToken: 'any_refresh_token' }
    vi.spyOn(authFacade, 'getCurrentUser').mockResolvedValueOnce(account)

    render(
      <AuthProvider authFacade={authFacade}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('any_user'))

    await act(async () => {
      screen.getByText('Logout').click()
    })

    expect(authFacade.logout).toHaveBeenCalled()
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    expect(screen.getByTestId('auth')).toHaveTextContent('false')
  })
})
