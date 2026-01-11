import { RemoteLoadStateById } from '@/application/usecases/remote-load-state-by-id'
import { LoadStateById } from '@/domain/usecases/load-state-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadStateById = (): LoadStateById => {
  return new RemoteLoadStateById('/states', makeHttpClient())
}
