import type { HttpClient } from '@/application/protocols/http/http-client'
import type { LoadNeighborhoodById } from '@/domain/usecases/load-neighborhood-by-id'
import { RemoteLoadNeighborhoodById, type RemoteNeighborhoodModel } from '@/application/usecases/remote-load-neighborhood-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadNeighborhoodById = (): LoadNeighborhoodById => {
  return new RemoteLoadNeighborhoodById(
    '/neighborhoods',
    makeHttpClient() as HttpClient<RemoteNeighborhoodModel>
  )
}
