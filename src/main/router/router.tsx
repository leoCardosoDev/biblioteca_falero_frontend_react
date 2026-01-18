import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './root-route'
import { createIdentityRoutes } from '@/modules/identity/public'
import { createGeographyRoutes } from '@/modules/geography/public'

const identityRouteTree = createIdentityRoutes(rootRoute)
const geographyRouteTree = createGeographyRoutes(rootRoute)

const routeTree = rootRoute.addChildren([identityRouteTree, geographyRouteTree])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
