import { HttpClient } from '@/application/protocols/http/http-client'
import { LoadNeighborhoodById } from '@/domain/usecases/load-neighborhood-by-id'
import { RemoteLoadNeighborhoodById, RemoteNeighborhoodModel } from '@/application/usecases/remote-load-neighborhood-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadNeighborhoodById = (): LoadNeighborhoodById => {
  return new RemoteLoadNeighborhoodById(
    '/neighborhoods',
    makeHttpClient() as HttpClient<RemoteNeighborhoodModel>
  )
}
