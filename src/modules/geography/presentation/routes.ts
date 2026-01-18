import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { LocationsListPage } from './pages/LocationsListPage'

export function createGeographyRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const geographyLayoutRoute = createRoute({
    getParentRoute: () => parentRoute,
    id: 'geography-layout'
  })

  const locationsRoute = createRoute({
    getParentRoute: () => geographyLayoutRoute,
    path: 'locations',
    component: LocationsListPage
  })

  return geographyLayoutRoute.addChildren([locationsRoute])
}
