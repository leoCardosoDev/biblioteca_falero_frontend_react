import { LoadStateById } from '@/domain/usecases/load-state-by-id'
import { State } from '@/domain/models/state'

export class LoadStateByIdSpy implements LoadStateById {
  result: State = {
    id: 'any_id',
    name: 'Any State',
    acronym: 'AS'
  }
  callsCount = 0
  id?: string

  async perform(id: string): Promise<State> {
    this.callsCount++
    this.id = id
    return this.result
  }
}
