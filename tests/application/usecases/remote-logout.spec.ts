import { describe, test, expect, vi } from 'vitest'
import { RemoteLogout } from '@/application/usecases/remote-logout'
import type { LogoutRepository } from '@/domain/contracts/logout-repository'
import type { LogoutParams } from '@/domain/usecases/logout'

const makeLogoutRepository = (): LogoutRepository => ({
  logout: vi.fn(async () => Promise.resolve())
})

type SutTypes = {
  sut: RemoteLogout
  logoutRepoStub: LogoutRepository
}

const makeSut = (): SutTypes => {
  const logoutRepoStub = makeLogoutRepository()
  const sut = new RemoteLogout(logoutRepoStub)
  return {
    sut,
    logoutRepoStub
  }
}

describe('RemoteLogout UseCase', () => {
  test('Should call LogoutRepository with correct values', async () => {
    const { sut, logoutRepoStub } = makeSut()
    const logoutSpy = vi.spyOn(logoutRepoStub, 'logout')
    const params: LogoutParams = { refreshToken: 'any_refresh_token' }
    await sut.logout(params)
    expect(logoutSpy).toHaveBeenCalledWith(params)
  })

  test('Should throw if LogoutRepository throws', async () => {
    const { sut, logoutRepoStub } = makeSut()
    vi.spyOn(logoutRepoStub, 'logout').mockRejectedValueOnce(new Error())
    const promise = sut.logout({ refreshToken: 'any_refresh_token' })
    await expect(promise).rejects.toThrow()
  })
})
