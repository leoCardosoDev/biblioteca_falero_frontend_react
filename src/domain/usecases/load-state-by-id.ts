import { State } from '@/domain/models/state'

export type LoadStateByIdModel = State

export interface LoadStateById {
  perform(id: string): Promise<LoadStateByIdModel>
}
