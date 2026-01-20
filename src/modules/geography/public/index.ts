// Geography Module Public API
// External modules should import from here only
export {
  // Domain Entities
  Address,
  State,
  City,
  Neighborhood,
  // Domain Types
  type AddressProps,
  type StateProps,
  type CityProps,
  type NeighborhoodProps,
  // Application Protocols
  type GeographyRepository,
  // Application Hooks
  createGeographyHooks,
  geographyQueryKeys,
  // Infrastructure
  HttpGeographyRepository
} from '../index'

export { createGeographyRoutes } from '../presentation/routes'
