export type LoadNeighborhoodByIdModel = {
  id: string
  name: string
}

export interface LoadNeighborhoodById {
  perform: (id: string) => Promise<LoadNeighborhoodByIdModel>
}
