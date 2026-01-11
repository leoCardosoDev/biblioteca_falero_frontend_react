import { RemoteLoadUserById } from '@/application/usecases'
import { LoadUserById } from '@/domain/usecases'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadUserById = (): LoadUserById => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteLoadUserById(repository)
}
