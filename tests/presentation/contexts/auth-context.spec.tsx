import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, useAuthContext } from '@/presentation/contexts/auth-context'
import type { CacheRepository } from '@/application/protocols/cache-repository'

const makeCacheRepositorySpy = (): CacheRepository => {
  return {
    get: vi.fn(),
    set: vi.fn()
  }
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
  let cacheRepoSpy: CacheRepository

  beforeEach(() => {
    cacheRepoSpy = makeCacheRepositorySpy()
  })

  test('Should initialize with user from cache', async () => {
    const account = { name: 'any_name', role: 'any_role', accessToken: 'any_token' }
    vi.spyOn(cacheRepoSpy, 'get').mockResolvedValueOnce(JSON.stringify(account))

    render(
      <AuthProvider cacheRepository={cacheRepoSpy}>
        <TestComponent />
      </AuthProvider>
    )

    expect(await screen.findByTestId('user-name')).toHaveTextContent('any_name')
    expect(await screen.findByTestId('auth-status')).toHaveTextContent('true')
  })

  test('Should initialize with null if cache is empty', async () => {
    vi.spyOn(cacheRepoSpy, 'get').mockResolvedValueOnce(null)

    render(
      <AuthProvider cacheRepository={cacheRepoSpy}>
        <TestComponent />
      </AuthProvider>
    )

    expect(await screen.findByTestId('user-name')).toHaveTextContent('none')
    expect(await screen.findByTestId('auth-status')).toHaveTextContent('false')
  })
})
