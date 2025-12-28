import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAuth } from '../../src/presentation/hooks/use-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Authentication, AuthenticationParams, AccountModel } from '../../src/domain/usecases/authentication'
import { faker } from '@faker-js/faker'

// Mock Authentication
class AuthenticationSpy implements Authentication {
  params!: AuthenticationParams
  callsCount = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
      refreshToken: faker.string.uuid(),
      role: 'user'
    }
  }
}

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient} >
    {children}
  </QueryClientProvider>
)

describe('useAuth Hook', () => {
  it('should start with correct initial state', () => {
    const authenticationSpy = new AuthenticationSpy()
    const { result } = renderHook(() => useAuth(authenticationSpy), { wrapper })

    expect(result.current.errors).toEqual({})
    expect(result.current.isLoading).toBe(false)
  })

  it('should call Authentication with correct values', async () => {
    const authenticationSpy = new AuthenticationSpy()
    const { result } = renderHook(() => useAuth(authenticationSpy), { wrapper })

    const params = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    await waitFor(async () => {
      await result.current.onSubmit(params)
    })

    expect(authenticationSpy.params).toEqual(params)
  })

  // Add more tests for error handling later
})
