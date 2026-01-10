// Removed invalid import
// User.ts had: address: { city: string, cityId: string }
// Let's create a minimal City model or use a generic one if not found.
// Actually, let's check for City model first in next step.
// For now, I will define the interface generic.

export type LoadCityByIdModel = {
  id: string
  name: string
  stateId: string
}

export interface LoadCityById {
  perform(id: string): Promise<LoadCityByIdModel>
}
