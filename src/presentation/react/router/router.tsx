import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from '@/presentation/react/components/private-route'
import { ErrorBoundary } from '@/presentation/react/components/ui'
import type { PageFactories, RouteConfig } from './types'
import { routes } from './routes'

interface RouterProps {
  factories: PageFactories
}

export function Router({ factories }: RouterProps) {
  const createRouteElement = (route: RouteConfig) => {
    const Component = route.factoryKey
      ? factories[route.factoryKey]
      : route.component

    const element = Component ? <Component /> : undefined

    const children = route.children?.map(createRouteElement)

    if (route.index) {
      return <Route index element={element} />
    }

    return (
      <Route path={route.path} element={element}>
        {children}
      </Route>
    )
  }

  const mapRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, i) => {
      if (route.isPrivate) {
        return (
          <Route key={i} element={<PrivateRoute />}>
            {createRouteElement(route)}
          </Route>
        )
      }
      return (
        <React.Fragment key={i}>{createRouteElement(route)}</React.Fragment>
      )
    })
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {mapRoutes(routes)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
