import { RemoteUpdateUser } from '@/infra/http/remote-update-user'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteUpdateUser = (): RemoteUpdateUser => {
  return new RemoteUpdateUser(makeHttpClient())
}
