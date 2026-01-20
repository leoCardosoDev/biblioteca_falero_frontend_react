import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import type { LoadNeighborhoodById } from '@/shared/domain/usecases/load-neighborhood-by-id'
import {
  RemoteLoadNeighborhoodById,
  type RemoteNeighborhoodModel
} from '@/shared/application/usecases/remote-load-neighborhood-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadNeighborhoodById = (): LoadNeighborhoodById => {
  return new RemoteLoadNeighborhoodById(
    '/neighborhoods',
    makeHttpClient() as HttpClient<RemoteNeighborhoodModel>
  )
}
