import { RemoteLoadUsers } from '@/shared/application/usecases'
import type { LoadUsers } from '@/shared/domain/usecases'
import { HttpUserRepository } from '@/shared/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadUsers = (): LoadUsers => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteLoadUsers(repository)
}
