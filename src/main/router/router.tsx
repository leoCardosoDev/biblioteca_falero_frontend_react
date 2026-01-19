import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './root-route'
import { createIdentityRoutes } from '@/modules/identity/public'
import { createGeographyRoutes } from '@/modules/geography/public'
import { createDashboardRoutes } from '@/modules/dashboard/public'
import { createReportsRoutes } from '@/modules/reports/public'
import { createLibraryRoutes } from '@/modules/library/public'

const identityRouteTree = createIdentityRoutes(rootRoute)
const geographyRouteTree = createGeographyRoutes(rootRoute)
const dashboardRoute = createDashboardRoutes(rootRoute)
const reportsRoute = createReportsRoutes(rootRoute)
const libraryRouteTree = createLibraryRoutes(rootRoute)

const routeTree = rootRoute.addChildren([
  identityRouteTree,
  geographyRouteTree,
  dashboardRoute,
  reportsRoute,
  libraryRouteTree
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
