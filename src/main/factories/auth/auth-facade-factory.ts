import { AuthFacade } from '@/application/facades/auth-facade'
import { RemoteAuthentication } from '@/application/usecases/remote-authentication'
import { RemoteLogout } from '@/application/usecases/remote-logout'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { HttpAuthenticationRepository } from '@/infra/http/http-authentication-repository'
import { HttpLogoutRepository } from '@/infra/http/http-logout-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import { AccountModel } from '@/domain/models/account-model'
import { HttpClient } from '@/application/protocols/http/http-client'

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
