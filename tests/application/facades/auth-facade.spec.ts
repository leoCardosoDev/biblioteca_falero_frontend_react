import { describe, it, expect, vi, beforeEach } from 'vitest'

import { AuthFacade } from '@/application/facades/auth-facade'
import { Authentication } from '@/domain/usecases/authentication'
import { CacheRepository } from '@/application/protocols/cache-repository'
import { AccountModel } from '@/domain/models/account-model'
import { Logout } from '@/domain/usecases/logout'

interface SutTypes {
  sut: AuthFacade
  authenticationStub: Authentication
  logoutStub: Logout
  cacheRepositoryStub: CacheRepository
}

const makeAuthentication = (): Authentication => {
  return {
    auth: vi.fn(async () => Promise.resolve(makeAccount()))
  }
}

const makeCacheRepository = (): CacheRepository => {
  return {
    set: vi.fn(async () => Promise.resolve()),
    get: vi.fn(async () => Promise.resolve('')),
    remove: vi.fn(async () => Promise.resolve())
  }
}

const makeLogout = (): Logout => ({
  logout: vi.fn(async () => Promise.resolve())
})

const makeAccount = (): AccountModel => ({
  accessToken: 'any_token',
  name: 'any_name',
  role: 'any_role',
  refreshToken: 'any_refresh_token'
})

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const logoutStub = makeLogout()
  const cacheRepositoryStub = makeCacheRepository()
  const sut = new AuthFacade(
    authenticationStub,
    logoutStub,
    cacheRepositoryStub
  )
  return {
    sut,
    authenticationStub,
    logoutStub,
    cacheRepositoryStub
  }
}

describe('AuthFacade', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('Should call Authentication.auth with correct values', async () => {
      const { sut, authenticationStub } = makeSut()
      const authParams = {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      await sut.login(authParams)
      expect(authenticationStub.auth).toHaveBeenCalledWith(authParams)
    })

    it('Should call CacheRepository.set with correct values on success', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      const account = makeAccount()
      await sut.login({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(cacheRepositoryStub.set).toHaveBeenCalledWith(
        'account',
        JSON.stringify(account)
      )
      expect(cacheRepositoryStub.set).toHaveBeenCalledWith(
        'accessToken',
        account.accessToken
      )
    })

    it('Should return account on success', async () => {
      const { sut } = makeSut()
      const account = await sut.login({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toEqual(makeAccount())
    })

    it('Should return null if authentication fails', async () => {
      const { sut, authenticationStub } = makeSut()
      vi.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
        Promise.resolve(null as unknown as AccountModel)
      )
      const account = await sut.login({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toBeNull()
    })

    it('Should NOT call CacheRepository.set if authentication fails', async () => {
      const { sut, authenticationStub, cacheRepositoryStub } = makeSut()
      vi.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
        Promise.resolve(null as unknown as AccountModel)
      )
      await sut.login({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(cacheRepositoryStub.set).not.toHaveBeenCalled()
    })
  })

  describe('logout', () => {
    it('Should call Logout.logout with correct values', async () => {
      const { sut, logoutStub, cacheRepositoryStub } = makeSut()
      const account = makeAccount()
      vi.spyOn(cacheRepositoryStub, 'get').mockReturnValueOnce(
        Promise.resolve(JSON.stringify(account))
      )
      await sut.logout()
      expect(logoutStub.logout).toHaveBeenCalledWith({
        refreshToken: account.refreshToken
      })
    })

    it('Should NOT call Logout.logout if refreshToken is not in cache', async () => {
      const { sut, logoutStub, cacheRepositoryStub } = makeSut()
      vi.spyOn(cacheRepositoryStub, 'get').mockReturnValueOnce(
        Promise.resolve(null)
      )
      await sut.logout()
      expect(logoutStub.logout).not.toHaveBeenCalled()
    })

    it('Should call CacheRepository.set with empty strings to clear session', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      await sut.logout()
      expect(cacheRepositoryStub.set).toHaveBeenCalledWith('accessToken', '')
      expect(cacheRepositoryStub.set).toHaveBeenCalledWith('account', '')
    })
  })

  describe('getCurrentUser', () => {
    it('Should call CacheRepository.get with correct key', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      await sut.getCurrentUser()
      expect(cacheRepositoryStub.get).toHaveBeenCalledWith('account')
    })

    it('Should return account if it exists in cache', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      const account = makeAccount()
      vi.spyOn(cacheRepositoryStub, 'get').mockReturnValueOnce(
        Promise.resolve(JSON.stringify(account))
      )
      const currentUser = await sut.getCurrentUser()
      expect(currentUser).toEqual(account)
    })

    it('Should return null if account does not exist in cache', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      vi.spyOn(cacheRepositoryStub, 'get').mockReturnValueOnce(
        Promise.resolve(null)
      )
      const currentUser = await sut.getCurrentUser()
      expect(currentUser).toBeNull()
    })

    it('Should return null if JSON parse fails', async () => {
      const { sut, cacheRepositoryStub } = makeSut()
      vi.spyOn(cacheRepositoryStub, 'get').mockReturnValueOnce(
        Promise.resolve('invalid_json')
      )
      const currentUser = await sut.getCurrentUser()
      expect(currentUser).toBeNull()
    })
  })
})
