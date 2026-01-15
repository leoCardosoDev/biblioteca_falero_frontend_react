import { RemoteLoadStateById, type RemoteStateModel } from '@/application/usecases/remote-load-state-by-id'
import type { LoadStateById } from '@/domain/usecases/load-state-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import type { HttpClient } from '@/application/protocols/http/http-client'

export const makeRemoteLoadStateById = (): LoadStateById => {
  return new RemoteLoadStateById('/states', makeHttpClient() as HttpClient<RemoteStateModel>)
}
