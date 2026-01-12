import { describe, test, expect, vi } from 'vitest'
import { RemoteAddUserLogin } from '@/application/usecases/remote-add-user-login'
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
  sut: RemoteAddUserLogin
  userLoginRepositoryStub: UserLoginRepository
}

const makeSut = (): SutTypes => {
  const userLoginRepositoryStub = makeUserLoginRepository()
  const sut = new RemoteAddUserLogin(userLoginRepositoryStub)
  return {
    sut,
    userLoginRepositoryStub
  }
}

describe('RemoteAddUserLogin', () => {
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
    vi.spyOn(userLoginRepositoryStub, 'addLogin').mockRejectedValueOnce(
      new Error()
    )
    const params: AddUserLoginParams = {
      userId: 'any_user_id'
    }
    const promise = sut.perform(params)
    await expect(promise).rejects.toThrow()
  })
})
