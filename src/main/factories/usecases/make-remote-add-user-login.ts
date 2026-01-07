import { RemoteAddUserLogin } from '@/infra/http/remote-add-user-login'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteAddUserLogin = (): RemoteAddUserLogin => {
  return new RemoteAddUserLogin(makeHttpClient())
}
