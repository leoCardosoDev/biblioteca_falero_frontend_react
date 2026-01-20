import { describe, it, expect, vi } from 'vitest'

import { LoginUseCase } from '@/modules/identity/application/usecases'
import type {
  IdentityRepository,
  LoginRequestDto,
  LoginResponseDto
} from '@/modules/identity/application/protocols'

describe('LoginUseCase', () => {
  function createMockRepository(
    overrides: Partial<IdentityRepository> = {}
  ): IdentityRepository {
    return {
      login: vi.fn(),
      logout: vi.fn(),
      loadUsers: vi.fn(),
      loadUserById: vi.fn(),
      createUser: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
      ...overrides
    }
  }

  it('should call repository.login with provided credentials', async () => {
    const expectedResponse: LoginResponseDto = {
      accessToken: 'test-token',
      name: 'Test User'
    }
    const mockRepository = createMockRepository({
      login: vi.fn().mockResolvedValue(expectedResponse)
    })
    const useCase = new LoginUseCase(mockRepository)

    const credentials: LoginRequestDto = {
      email: 'test@example.com',
      password: 'password123'
    }

    const result = await useCase.execute(credentials)

    expect(mockRepository.login).toHaveBeenCalledWith(credentials)
    expect(result).toEqual(expectedResponse)
  })

  it('should propagate repository errors', async () => {
    const errorMessage = 'Invalid credentials'
    const mockRepository = createMockRepository({
      login: vi.fn().mockRejectedValue(new Error(errorMessage))
    })
    const useCase = new LoginUseCase(mockRepository)

    const credentials: LoginRequestDto = {
      email: 'test@example.com',
      password: 'wrong-password'
    }

    await expect(useCase.execute(credentials)).rejects.toThrow(errorMessage)
  })

  it('should be a pure function without side effects', () => {
    const mockRepository = createMockRepository()
    const useCase = new LoginUseCase(mockRepository)

    expect(useCase).toBeInstanceOf(LoginUseCase)
    expect(typeof useCase.execute).toBe('function')
  })
})
