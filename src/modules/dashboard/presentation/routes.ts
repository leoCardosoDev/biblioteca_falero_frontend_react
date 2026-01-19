import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { DashboardPage } from './pages'

export function createDashboardRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const dashboardRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: 'dashboard',
    component: DashboardPage
  })

  return dashboardRoute
}
