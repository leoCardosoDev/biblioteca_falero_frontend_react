import { RemoteDeleteUser } from '@/application/usecases'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteDeleteUser = (): RemoteDeleteUser => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteDeleteUser(repository)
}
