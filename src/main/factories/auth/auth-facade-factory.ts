import { AuthFacade } from '@/shared/application/facades/auth-facade'
import { RemoteAuthentication } from '@/shared/application/usecases/remote-authentication'
import { RemoteLogout } from '@/shared/application/usecases/remote-logout'
import { LocalStorageAdapter } from '@/shared/infra/cache/local-storage-adapter'
import { HttpAuthenticationRepository } from '@/shared/infra/http/http-authentication-repository'
import { HttpLogoutRepository } from '@/shared/infra/http/http-logout-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import type { AccountModel } from '@/shared/domain/models/account-model'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'

export const makeAuthFacade = (): AuthFacade => {
  const httpClient = makeHttpClient()
  const cacheRepository = new LocalStorageAdapter()
  const httpAuthenticationRepository = new HttpAuthenticationRepository(
    httpClient as HttpClient<AccountModel>
  )
  const httpLogoutRepository = new HttpLogoutRepository(
    httpClient as HttpClient<void>
  )
  const remoteAuthentication = new RemoteAuthentication(
    httpAuthenticationRepository,
    cacheRepository
  )
  const remoteLogout = new RemoteLogout(httpLogoutRepository)
  return new AuthFacade(remoteAuthentication, remoteLogout, cacheRepository)
}
