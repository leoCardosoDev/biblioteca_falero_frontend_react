import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { LoginPage } from './pages/LoginPage'

export function createIdentityRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const identityLayoutRoute = createRoute({
    getParentRoute: () => parentRoute,
    id: 'identity-layout'
  })

  const loginRoute = createRoute({
    getParentRoute: () => identityLayoutRoute,
    path: 'login',
    component: LoginPage
  })

  return identityLayoutRoute.addChildren([loginRoute])
}
