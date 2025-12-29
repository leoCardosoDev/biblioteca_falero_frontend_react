import { describe, test, expect, vi } from 'vitest'
import { RemoteAuthentication } from '@/application/usecases/remote-authentication'
import type { AuthenticationParams } from '@/domain/usecases/authentication'
import type { AuthenticationRepository } from '@/domain/contracts/authentication-repository'
import type { CacheRepository } from '@/application/protocols/cache-repository'
import type { AccountModel } from '@/domain/models/account-model'

// Mocks
const makeAuthenticationRepository = (): AuthenticationRepository => {
  class AuthRepoStub implements AuthenticationRepository {
    async auth(_params: AuthenticationParams): Promise<AccountModel> {
      return {
        accessToken: 'any_token',
        name: 'any_name',
        role: 'any_role',
        refreshToken: 'any_refresh_token'
      }
    }
  }
  return new AuthRepoStub()
}

const makeCacheRepository = (): CacheRepository => {
  return {
    set: vi.fn(),
    get: vi.fn()
  }
}

type SutTypes = {
  sut: RemoteAuthentication
  authRepoStub: AuthenticationRepository
  cacheRepoSpy: CacheRepository
}

const makeSut = (): SutTypes => {
  const authRepoStub = makeAuthenticationRepository()
  const cacheRepoSpy = makeCacheRepository()
  const sut = new RemoteAuthentication(authRepoStub, cacheRepoSpy)
  return {
    sut,
    authRepoStub,
    cacheRepoSpy
  }
}

describe('RemoteAuthentication UseCase', () => {
  test('Should call AuthenticationRepository with correct values', async () => {
    const { sut, authRepoStub } = makeSut()
    const authSpy = vi.spyOn(authRepoStub, 'auth')
    const params = { email: 'any_email@mail.com', password: 'any_password' }
    await sut.auth(params)
    expect(authSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if AuthenticationRepository throws', async () => {
    const { sut, authRepoStub } = makeSut()
    vi.spyOn(authRepoStub, 'auth').mockRejectedValueOnce(new Error())
    const promise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })

  test('Should call CacheRepository with correct values on success', async () => {
    const { sut, cacheRepoSpy } = makeSut()
    const setSpy = vi.spyOn(cacheRepoSpy, 'set')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(setSpy).toHaveBeenCalledWith('accessToken', 'any_token')
  })

  test('Should return an AccountModel on success', async () => {
    const { sut } = makeSut()
    const account = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(account).toEqual({
      accessToken: 'any_token',
      name: 'any_name',
      role: 'any_role',
      refreshToken: 'any_refresh_token'
    })
  })
})
