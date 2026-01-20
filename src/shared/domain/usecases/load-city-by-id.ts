export type LoadCityByIdModel = {
  id: string
  name: string
  stateId: string
}

export interface LoadCityById {
  perform: (id: string) => Promise<LoadCityByIdModel>
}
