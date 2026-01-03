import { describe, test, expect, vi } from 'vitest'
import { DbDeleteUser } from '@/application/usecases/db-delete-user'
import type { UserRepository } from '@/domain/contracts/user-repository'

// Mocks
const makeUserRepository = (): UserRepository => {
  return {
    loadAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(async () => Promise.resolve())
  } as unknown as UserRepository
}

type SutTypes = {
  sut: DbDeleteUser
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const sut = new DbDeleteUser(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('DbDeleteUser UseCase', () => {
  test('Should call UserRepository.delete with correct id', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const deleteSpy = vi.spyOn(userRepositoryStub, 'delete')
    await sut.perform('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if UserRepository.delete throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    vi.spyOn(userRepositoryStub, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.perform('any_id')
    await expect(promise).rejects.toThrow()
  })
})
