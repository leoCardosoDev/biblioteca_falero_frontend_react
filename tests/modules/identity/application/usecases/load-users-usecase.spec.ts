import { describe, it, expect, vi } from 'vitest'

import { LoadUsersUseCase } from '@/modules/identity/application/usecases'
import type {
  IdentityRepository,
  UserDto
} from '@/modules/identity/application/protocols'

describe('LoadUsersUseCase', () => {
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

  function createMockUser(id: string): UserDto {
    return {
      id,
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

  it('should call repository.loadUsers and return the list of users', async () => {
    const expectedUsers: UserDto[] = [
      createMockUser('user-1'),
      createMockUser('user-2')
    ]
    const mockRepository = createMockRepository({
      loadUsers: vi.fn().mockResolvedValue(expectedUsers)
    })
    const useCase = new LoadUsersUseCase(mockRepository)

    const result = await useCase.execute()

    expect(mockRepository.loadUsers).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedUsers)
  })

  it('should propagate repository errors', async () => {
    const errorMessage = 'Failed to load users'
    const mockRepository = createMockRepository({
      loadUsers: vi.fn().mockRejectedValue(new Error(errorMessage))
    })
    const useCase = new LoadUsersUseCase(mockRepository)

    await expect(useCase.execute()).rejects.toThrow(errorMessage)
  })

  it('should return an empty array when no users exist', async () => {
    const mockRepository = createMockRepository({
      loadUsers: vi.fn().mockResolvedValue([])
    })
    const useCase = new LoadUsersUseCase(mockRepository)

    const result = await useCase.execute()

    expect(result).toEqual([])
  })
})
