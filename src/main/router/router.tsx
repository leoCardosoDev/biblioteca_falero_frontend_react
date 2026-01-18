import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './root-route'

const routeTree = rootRoute

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
