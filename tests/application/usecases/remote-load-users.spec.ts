import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUsers } from '@/application/usecases/remote-load-users'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { User } from '@/domain/models/user'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'

const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async loadAll(): Promise<User[]> {
      return Promise.resolve([
        {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          rg: 'any_rg',
          cpf: 'any_cpf',
          role: 'STUDENT',
          status: 'ACTIVE',
          gender: 'MALE',
          createdAt: new Date().toISOString()
        }
      ])
    }
    async add(_params: AddUserParams): Promise<User> {
      return {} as User
    }
    async loadById(_id: string): Promise<User> {
      return {} as User
    }
    async update(_params: UpdateUserParams): Promise<User> {
      return {} as User
    }
    async delete(_id: string): Promise<void> {}
  }
  return new UserRepositoryStub()
}

interface SutTypes {
  sut: RemoteLoadUsers
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const sut = new RemoteLoadUsers(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('RemoteLoadUsers', () => {
  test('Should call UserRepository', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const loadAllSpy = vi.spyOn(userRepositoryStub, 'loadAll')
    await sut.perform()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of users on success', async () => {
    const { sut } = makeSut()
    const users = await sut.perform()
    expect(users).toEqual([
      {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        rg: 'any_rg',
        cpf: 'any_cpf',
        role: 'STUDENT',
        status: 'ACTIVE',
        gender: 'MALE',
        createdAt: expect.any(String)
      }
    ])
  })

  test('Should throw if UserRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    vi.spyOn(userRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })
})
