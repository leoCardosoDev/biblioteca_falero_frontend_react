import { City } from '@/domain/models/city'

export type LoadCityByIdModel = City

export interface LoadCityById {
  perform(id: string): Promise<LoadCityByIdModel>
}
