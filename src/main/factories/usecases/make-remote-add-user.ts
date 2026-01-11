import { RemoteAddUser } from '@/application/usecases'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteAddUser = (): RemoteAddUser => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteAddUser(repository)
}
