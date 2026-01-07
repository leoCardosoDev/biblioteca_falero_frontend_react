import { RemoteDeleteUser } from '@/infra/http/remote-delete-user'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteDeleteUser = (): RemoteDeleteUser => {
  return new RemoteDeleteUser(makeHttpClient())
}
