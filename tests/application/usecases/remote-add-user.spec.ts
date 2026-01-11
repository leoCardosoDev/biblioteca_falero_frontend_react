import { describe, test, expect, vi } from 'vitest'
import { RemoteAddUser } from '@/application/usecases/remote-add-user'
import type { UserRepository } from '@/domain/contracts/user-repository'
import type { User } from '@/domain/models/user'
import type { AddUserParams } from '@/domain/usecases/add-user'

const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async loadAll(): Promise<User[]> {
      return []
    }
    async add(params: AddUserParams): Promise<User> {
      return {
        id: 'any_id',
        name: params.name,
        email: params.email,
        rg: params.rg,
        cpf: params.cpf,
        role: params.role,
        status: params.status,
        gender: params.gender,
        address: params.address,
        createdAt: new Date().toISOString()
      }
    }
    async loadById(_id: string): Promise<User> {
      return {} as User
    }
    async update(_params: unknown): Promise<User> {
      return {} as User
    }
    async delete(_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UserRepositoryStub()
}

interface SutTypes {
  sut: RemoteAddUser
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepository()
  const sut = new RemoteAddUser(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
  }
}

describe('RemoteAddUser', () => {
  test('Should call UserRepository with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const addSpy = vi.spyOn(userRepositoryStub, 'add')
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_mail@mail.com',
      rg: 'any_rg',
      cpf: 'any_cpf',
      role: 'ADMIN',
      status: 'ACTIVE',
      gender: 'MALE',
      address: {
        street: 'any_street',
        number: 'any_number',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        zipCode: 'any_zip'
      }
    }
    await sut.perform(params)
    expect(addSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if UserRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    vi.spyOn(userRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_mail@mail.com',
      rg: 'any_rg',
      cpf: 'any_cpf',
      role: 'ADMIN',
      status: 'ACTIVE',
      gender: 'MALE',
      address: {
        street: 'any',
        number: 'any',
        neighborhood: 'any',
        city: 'any',
        state: 'any',
        zipCode: 'any'
      }
    }
    const promise = sut.perform(params)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a User on success', async () => {
    const { sut } = makeSut()
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_mail@mail.com',
      rg: 'any_rg',
      cpf: 'any_cpf',
      role: 'ADMIN',
      status: 'ACTIVE',
      gender: 'MALE',
      address: {
        street: 'any_street',
        number: 'any_number',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        zipCode: 'any_zip'
      }
    }
    const account = await sut.perform(params)
    expect(account).toEqual(
      expect.objectContaining({
        id: 'any_id',
        name: 'any_name',
        email: 'any_mail@mail.com'
      })
    )
  })
})
