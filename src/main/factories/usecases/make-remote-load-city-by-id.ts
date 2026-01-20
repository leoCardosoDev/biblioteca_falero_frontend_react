import { RemoteLoadCityById } from '@/shared/application/usecases/remote-load-city-by-id'
import type {
  LoadCityById,
  LoadCityByIdModel
} from '@/shared/domain/usecases/load-city-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'

export const makeRemoteLoadCityById = (): LoadCityById => {
  return new RemoteLoadCityById(
    '/cities',
    makeHttpClient() as HttpClient<LoadCityByIdModel>
  )
}
