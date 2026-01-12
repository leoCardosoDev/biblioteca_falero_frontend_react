import { Neighborhood } from '@/domain/models/neighborhood'

export type LoadNeighborhoodByIdModel = Neighborhood

export interface LoadNeighborhoodById {
  perform: (id: string) => Promise<LoadNeighborhoodByIdModel>
}
