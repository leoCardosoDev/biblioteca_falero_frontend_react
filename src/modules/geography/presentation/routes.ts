import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { LocationsListPage } from './pages/LocationsListPage'

export function createGeographyRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const geographyRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: 'geography'
  })

  const locationsRoute = createRoute({
    getParentRoute: () => geographyRoute,
    path: 'locations',
    component: LocationsListPage
  })

  return { geographyRoute, locationsRoute }
}
