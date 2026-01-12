import { RemoteLoadUsers } from '@/application/usecases'
import { LoadUsers } from '@/domain/usecases'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadUsers = (): LoadUsers => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteLoadUsers(repository)
}
