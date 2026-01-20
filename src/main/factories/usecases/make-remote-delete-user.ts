import { RemoteDeleteUser } from '@/shared/application/usecases'
import { HttpUserRepository } from '@/shared/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteDeleteUser = (): RemoteDeleteUser => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteDeleteUser(repository)
}
