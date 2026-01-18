import { createRoute } from '@tanstack/react-router'

import type { AnyRoute } from '@tanstack/react-router'

import { LoginPage } from './pages/LoginPage'

export function createIdentityRoutes<TParentRoute extends AnyRoute>(
  parentRoute: TParentRoute
) {
  const identityRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: 'identity'
  })

  const loginRoute = createRoute({
    getParentRoute: () => identityRoute,
    path: 'login',
    component: LoginPage
  })

  return { identityRoute, loginRoute }
}
