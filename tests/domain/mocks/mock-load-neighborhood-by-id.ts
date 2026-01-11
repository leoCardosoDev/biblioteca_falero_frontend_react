import { LoadNeighborhoodById } from '@/domain/usecases/load-neighborhood-by-id'
import { Neighborhood } from '@/domain/models/neighborhood'

export class LoadNeighborhoodByIdSpy implements LoadNeighborhoodById {
  result: Neighborhood = {
    id: 'any_id',
    name: 'Any Neighborhood',
    cityId: 'any_city_id'
  }
  callsCount = 0
  id?: string

  async perform(id: string): Promise<Neighborhood> {
    this.callsCount++
    this.id = id
    return this.result
  }
}
