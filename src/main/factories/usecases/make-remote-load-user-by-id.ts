import { RemoteLoadUserById } from '@/shared/application/usecases'
import type { LoadUserById } from '@/shared/domain/usecases'
import { HttpUserRepository } from '@/shared/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadUserById = (): LoadUserById => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteLoadUserById(repository)
}
