import { describe, test, expect, vi } from 'vitest'
import { DbUpdateUser } from '@/application/usecases/db-update-user'
import type { UserRepository } from '@/domain/contracts/user-repository'


import type { UpdateUserParams } from '@/domain/usecases/update-user'

// Mocks - simplified stub
const makeUserRepository = (): UserRepository => {
  return {
    loadAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(async (params) => ({
      id: params.id,
      name: params.name || 'original_name',
      email: params.email || 'original_email',
      role: params.role || 'user',
      status: params.status || 'active',
      enrollmentId: params.enrollmentId,
      avatarUrl: 'any_url',
      address: { street: 'st', number: '1', city: 'ct', state: 'st', zipCode: '000' }
    })),
    delete: vi.fn()
  } as unknown as UserRepository // Casting to avoid full implementation if strict
}

type SutTypes = {
  sut: DbUpdateUser
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const sut = new DbUpdateUser(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('DbUpdateUser UseCase', () => {
  test('Should call UserRepository.update with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const updateSpy = vi.spyOn(userRepositoryStub, 'update')
    const params: UpdateUserParams = {
      id: 'any_id',
      name: 'updated_name'
    }
    await sut.perform(params)
    expect(updateSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if UserRepository.update throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    vi.spyOn(userRepositoryStub, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.perform({ id: 'any_id', name: 'any_name' })
    await expect(promise).rejects.toThrow()
  })
})
