import { RemoteManageUserAccess } from '@/application/usecases/remote-manage-user-access'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import { HttpUserRepository } from '@/infra/http/http-user-repository'

export const makeRemoteManageUserAccess = (): RemoteManageUserAccess => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteManageUserAccess(repository)
}
