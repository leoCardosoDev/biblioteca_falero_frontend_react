import { RemoteLoadCityById } from '@/application/usecases/remote-load-city-by-id'
import { LoadCityById } from '@/domain/usecases/load-city-by-id'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadCityById = (): LoadCityById => {
  return new RemoteLoadCityById('/cities', makeHttpClient())
}
