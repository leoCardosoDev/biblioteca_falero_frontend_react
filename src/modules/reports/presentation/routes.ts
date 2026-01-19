import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { ReportsPage } from './pages'

export function createReportsRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const reportsRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: 'reports',
    component: ReportsPage
  })

  return reportsRoute
}
