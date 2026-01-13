import { describe, test, expect, vi } from 'vitest'
import { RemoteManageUserAccess } from '@/application/usecases/remote-manage-user-access'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { ManageUserAccessParams } from '@/domain/usecases/manage-user-access'

describe('RemoteManageUserAccess', () => {
  test('Should call UserRepository.manageAccess with correct values', async () => {
    const userRepositoryStub = {
      manageAccess: vi.fn(),
      loadAll: vi.fn(),
      loadById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    } as unknown as UserRepository

    const sut = new RemoteManageUserAccess(userRepositoryStub)

    const params: ManageUserAccessParams = {
      id: 'any_id',
      role: 'ADMIN',
      status: 'ACTIVE',
      password: 'any_password'
    }

    await sut.perform(params)

    expect(userRepositoryStub.manageAccess).toHaveBeenCalledWith(params)
    expect(userRepositoryStub.manageAccess).toHaveBeenCalledTimes(1)
  })

  test('Should throw if UserRepository.manageAccess throws', async () => {
    const userRepositoryStub = {
      manageAccess: vi.fn(),
      loadAll: vi.fn(),
      loadById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    } as unknown as UserRepository

    vi.mocked(userRepositoryStub.manageAccess).mockRejectedValueOnce(
      new Error('any_error')
    )

    const sut = new RemoteManageUserAccess(userRepositoryStub)

    const params: ManageUserAccessParams = {
      id: 'any_id'
    }

    const promise = sut.perform(params)

    await expect(promise).rejects.toThrow('any_error')
  })
})
