import { describe, test, expect, vi } from 'vitest'
import { DbAddUser } from '@/application/usecases/db-add-user'
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
        address: params.address
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

describe('DbAddUser', () => {
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
      address: {
        street: 'any', number: 'any', neighborhood: 'any', city: 'any', state: 'any', zipCode: 'any'
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
    expect(account).toEqual(expect.objectContaining({
      id: 'any_id',
      name: 'any_name',
      email: 'any_mail@mail.com'
    }))
  })
})
