import { describe, it, expect, vi } from 'vitest'

import { LoadUserByIdUseCase } from '@/modules/identity/application/usecases'
import type {
  IdentityRepository,
  UserDto
} from '@/modules/identity/application/protocols'

describe('LoadUserByIdUseCase', () => {
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

  function createMockUser(): UserDto {
    return {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      rg: '12.345.678-9',
      cpf: '529.982.247-25',
      role: 'STUDENT',
      status: 'ACTIVE',
      gender: 'MALE',
      createdAt: '2024-01-01T00:00:00Z'
    }
  }

  it('should call repository.loadUserById with the provided id', async () => {
    const expectedUser = createMockUser()
    const mockRepository = createMockRepository({
      loadUserById: vi.fn().mockResolvedValue(expectedUser)
    })
    const useCase = new LoadUserByIdUseCase(mockRepository)

    const result = await useCase.execute('user-123')

    expect(mockRepository.loadUserById).toHaveBeenCalledWith('user-123')
    expect(result).toEqual(expectedUser)
  })

  it('should return undefined when user is not found', async () => {
    const mockRepository = createMockRepository({
      loadUserById: vi.fn().mockResolvedValue(undefined)
    })
    const useCase = new LoadUserByIdUseCase(mockRepository)

    const result = await useCase.execute('non-existent-id')

    expect(mockRepository.loadUserById).toHaveBeenCalledWith('non-existent-id')
    expect(result).toBeUndefined()
  })

  it('should propagate repository errors', async () => {
    const errorMessage = 'Failed to load user'
    const mockRepository = createMockRepository({
      loadUserById: vi.fn().mockRejectedValue(new Error(errorMessage))
    })
    const useCase = new LoadUserByIdUseCase(mockRepository)

    await expect(useCase.execute('user-123')).rejects.toThrow(errorMessage)
  })
})
