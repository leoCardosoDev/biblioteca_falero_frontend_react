import { LoadCityById } from '@/domain/usecases/load-city-by-id'
import { City } from '@/domain/models/city'

export class LoadCityByIdSpy implements LoadCityById {
  result: City = {
    id: 'any_id',
    name: 'Any City',
    stateId: 'any_state_id'
  }
  callsCount = 0
  id?: string

  async perform(id: string): Promise<City> {
    this.callsCount++
    this.id = id
    return this.result
  }
}
