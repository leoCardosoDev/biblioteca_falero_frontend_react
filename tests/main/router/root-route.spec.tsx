import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
  Outlet
} from '@tanstack/react-router'

import { rootRoute } from '@/main/router/root-route'

describe('rootRoute', () => {
  it('should be defined', () => {
    expect(rootRoute).toBeDefined()
  })

  it('should have a component', () => {
    expect(rootRoute.options.component).toBeDefined()
  })

  it('should have a notFoundComponent', () => {
    expect(rootRoute.options.notFoundComponent).toBeDefined()
  })
})

describe('RootComponent', () => {
  it('should render Outlet for child routes', async () => {
    const testRootRoute = createRootRoute({
      component: () => (
        <div data-testid="root-layout">
          <Outlet />
        </div>
      )
    })

    const routeTree = testRootRoute
    const testRouter = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] })
    })

    render(<RouterProvider router={testRouter} />)

    await waitFor(() => {
      expect(screen.getByTestId('root-layout')).toBeInTheDocument()
    })
  })
})

describe('NotFoundComponent', () => {
  it('should render 404 message when route is not found', () => {
    const NotFoundComponent = rootRoute.options
      .notFoundComponent as React.ComponentType

    render(<NotFoundComponent />)

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument()
  })
})
