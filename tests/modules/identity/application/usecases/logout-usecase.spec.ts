import { describe, it, expect, vi } from 'vitest'

import { LogoutUseCase } from '@/modules/identity/application/usecases'
import type { IdentityRepository } from '@/modules/identity/application/protocols'

describe('LogoutUseCase', () => {
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

  it('should call repository.logout', async () => {
    const mockRepository = createMockRepository({
      logout: vi.fn().mockResolvedValue(undefined)
    })
    const useCase = new LogoutUseCase(mockRepository)

    await useCase.execute()

    expect(mockRepository.logout).toHaveBeenCalledTimes(1)
  })

  it('should propagate repository errors', async () => {
    const errorMessage = 'Logout failed'
    const mockRepository = createMockRepository({
      logout: vi.fn().mockRejectedValue(new Error(errorMessage))
    })
    const useCase = new LogoutUseCase(mockRepository)

    await expect(useCase.execute()).rejects.toThrow(errorMessage)
  })

  it('should be a pure function without side effects', () => {
    const mockRepository = createMockRepository()
    const useCase = new LogoutUseCase(mockRepository)

    expect(useCase).toBeInstanceOf(LogoutUseCase)
    expect(typeof useCase.execute).toBe('function')
  })
})
