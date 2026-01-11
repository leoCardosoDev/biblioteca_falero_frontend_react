import { RemoteAddUserLogin } from '@/application/usecases'
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteAddUserLogin = (): RemoteAddUserLogin => {
  const repository = new HttpUserLoginRepository(makeHttpClient())
  return new RemoteAddUserLogin(repository)
}
