import { RemoteLoadNeighborhoodById } from '@/data/usecases/remote-load-neighborhood-by-id'
import { LoadNeighborhoodById } from '@/domain/usecases/load-neighborhood-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

type RemoteNeighborhoodModel = {
  id: string
  name: string
  cityId: string
}

import { HttpClient } from '@/application/protocols/http/http-client'

export const makeRemoteLoadNeighborhoodById = (): LoadNeighborhoodById => {
  return new RemoteLoadNeighborhoodById(
    '/neighborhoods',
    makeHttpClient() as HttpClient<RemoteNeighborhoodModel>
  )
}
