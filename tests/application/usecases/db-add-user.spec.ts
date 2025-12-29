import { describe, test, expect, vi } from 'vitest'
import { DbAddUser } from '@/application/usecases/db-add-user'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { UserModel } from '@/domain/models/user-model'
import type { AddUserParams } from '@/domain/usecases/add-user'


// Mocks
const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async loadAll(): Promise<UserModel[]> {
      return []
    }
    async add(params: AddUserParams): Promise<UserModel> {
      return {
        id: 'any_id',
        name: params.name,
        email: params.email,
        role: params.role,
        enrollmentId: params.enrollmentId,
        status: 'active',
        avatarUrl: 'any_url',
        address: {
          street: 'any_street',
          number: 'any_number',
          city: 'any_city',
          state: 'any_state',
          zipCode: 'any_zip'
        }
      }
    }
    // Implement placeholders for other methods
    async update(_params: unknown): Promise<UserModel> { // loose typing for mock
      return {} as UserModel
    }
    async delete(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UserRepositoryStub()
}

type SutTypes = {
  sut: DbAddUser
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const sut = new DbAddUser(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call UserRepository.add with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const addSpy = vi.spyOn(userRepositoryStub, 'add')
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'user',
      enrollmentId: '123'
    }
    await sut.perform(params)
    expect(addSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if UserRepository.add throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    vi.spyOn(userRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'user'
    }
    const promise = sut.perform(params)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a UserModel on success', async () => {
    const { sut } = makeSut()
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'user'
    }
    const user = await sut.perform(params)
    expect(user).toEqual(expect.objectContaining({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com'
    }))
  })
})
