import { describe, test, expect, vi, beforeEach } from 'vitest'
import { RemoteLoadUserById } from '@/application/usecases/remote-load-user-by-id'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { User } from '@/domain/models/user'
import { faker } from '@faker-js/faker'

const makeUserRepositoryStub = (): UserRepository => {
  return {
    loadAll: vi.fn(),
    loadById: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  } as unknown as UserRepository
}

describe('RemoteLoadUserById', () => {
  let sut: RemoteLoadUserById
  let userRepositoryStub: UserRepository

  beforeEach(() => {
    userRepositoryStub = makeUserRepositoryStub()
    sut = new RemoteLoadUserById(userRepositoryStub)
  })

  test('Should call UserRepository.loadById with correct id', async () => {
    const id = faker.string.uuid()
    vi.spyOn(userRepositoryStub, 'loadById').mockResolvedValueOnce({} as User)

    await sut.perform(id)

    expect(userRepositoryStub.loadById).toHaveBeenCalledWith(id)
  })

  test('Should return user on success', async () => {
    const id = faker.string.uuid()
    const user = { id, name: faker.person.fullName() } as User
    vi.spyOn(userRepositoryStub, 'loadById').mockResolvedValueOnce(user)

    const result = await sut.perform(id)

    expect(result).toEqual(user)
  })

  test('Should throw if UserRepository.loadById throws', async () => {
    const id = faker.string.uuid()
    vi.spyOn(userRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())

    const promise = sut.perform(id)

    await expect(promise).rejects.toThrow()
  })
})
