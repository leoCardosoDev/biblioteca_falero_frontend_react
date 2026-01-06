import { RemoteAddUser } from '@/infra/http/remote-add-user'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteAddUser = (): RemoteAddUser => {
  return new RemoteAddUser(makeHttpClient())
}
