import { createRootRoute } from '@tanstack/react-router'

import { RootComponent, NotFoundComponent } from './components'

export const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent
})
