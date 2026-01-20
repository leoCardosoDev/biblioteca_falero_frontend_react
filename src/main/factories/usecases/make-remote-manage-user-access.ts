import { RemoteManageUserAccess } from '@/shared/application/usecases/remote-manage-user-access'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import { HttpUserRepository } from '@/shared/infra/http/http-user-repository'

export const makeRemoteManageUserAccess = (): RemoteManageUserAccess => {
  const repository = new HttpUserRepository(makeHttpClient())
  return new RemoteManageUserAccess(repository)
}
