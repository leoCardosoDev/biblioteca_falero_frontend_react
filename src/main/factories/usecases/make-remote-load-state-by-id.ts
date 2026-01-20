import {
  RemoteLoadStateById,
  type RemoteStateModel
} from '@/shared/application/usecases/remote-load-state-by-id'
import type { LoadStateById } from '@/shared/domain/usecases/load-state-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'

export const makeRemoteLoadStateById = (): LoadStateById => {
  return new RemoteLoadStateById(
    '/states',
    makeHttpClient() as HttpClient<RemoteStateModel>
  )
}
