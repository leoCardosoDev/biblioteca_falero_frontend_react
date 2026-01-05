import { describe, test, expect, vi } from 'vitest'
import { DbAddUserLogin } from '@/application/usecases/db-add-user-login'
import type { UserLoginRepository } from '@/domain/contracts/user-login-repository'
import type { AddUserLoginParams } from '@/domain/usecases/add-user-login'

const makeUserLoginRepository = (): UserLoginRepository => {
  class UserLoginRepositoryStub implements UserLoginRepository {
    async addLogin(_params: AddUserLoginParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UserLoginRepositoryStub()
}

interface SutTypes {
  sut: DbAddUserLogin
  userLoginRepositoryStub: UserLoginRepository
}

const makeSut = (): SutTypes => {
  const userLoginRepositoryStub = makeUserLoginRepository()
  const sut = new DbAddUserLogin(userLoginRepositoryStub)
  return {
    sut,
    userLoginRepositoryStub
  }
}

describe('DbAddUserLogin', () => {
  test('Should call UserLoginRepository with correct values', async () => {
    const { sut, userLoginRepositoryStub } = makeSut()
    const addLoginSpy = vi.spyOn(userLoginRepositoryStub, 'addLogin')
    const params: AddUserLoginParams = {
      userId: 'any_user_id',
      username: 'any_username',
      password: 'any_password'
    }
    await sut.perform(params)
    expect(addLoginSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if UserLoginRepository throws', async () => {
    const { sut, userLoginRepositoryStub } = makeSut()
    vi.spyOn(userLoginRepositoryStub, 'addLogin').mockRejectedValueOnce(new Error())
    const params: AddUserLoginParams = {
      userId: 'any_user_id'
    }
    const promise = sut.perform(params)
    await expect(promise).rejects.toThrow()
  })
})
