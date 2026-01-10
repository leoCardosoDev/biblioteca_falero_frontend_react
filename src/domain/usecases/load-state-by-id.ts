export type LoadStateByIdModel = {
  id: string
  name: string
  acronym: string
}

export interface LoadStateById {
  perform(id: string): Promise<LoadStateByIdModel>
}
