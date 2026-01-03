import { render, screen, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { AuthProvider } from '@/presentation/react/contexts/auth-context'
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context'
import { type AuthFacade } from '@/application/facades/auth-facade'
import { type AccountModel } from '@/domain/models'

const makeAuthFacadeSpy = (): AuthFacade => {
  return {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    logout: vi.fn()
  } as unknown as AuthFacade
}

const TestComponent = () => {
  const { user, isAuthenticated } = useAuthContext()
  return (
    <div>
      <span data-testid="user-name">{user?.name || 'none'}</span>
      <span data-testid="auth-status">{isAuthenticated ? 'true' : 'false'}</span>
    </div>
  )
}

describe('AuthContext', () => {
  let authFacadeSpy: AuthFacade

  beforeEach(() => {
    authFacadeSpy = makeAuthFacadeSpy()
  })

  test('Should initialize with user from cache (via facade)', async () => {
    const account = { name: 'any_name', role: 'any_role', accessToken: 'any_token' } as AccountModel
    vi.spyOn(authFacadeSpy, 'getCurrentUser').mockResolvedValueOnce(account)

    render(
      <AuthProvider authFacade={authFacadeSpy}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('any_name')
      expect(screen.getByTestId('auth-status')).toHaveTextContent('true')
    })
  })

  test('Should initialize with null if cache is empty (via facade)', async () => {
    vi.spyOn(authFacadeSpy, 'getCurrentUser').mockResolvedValueOnce(null)

    render(
      <AuthProvider authFacade={authFacadeSpy}>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('none')
      expect(screen.getByTestId('auth-status')).toHaveTextContent('false')
    })
  })
})
