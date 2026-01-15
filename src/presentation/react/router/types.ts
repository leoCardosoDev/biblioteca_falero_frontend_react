import type React from 'react'

export type FactoryComponent = React.ComponentType
export type FactoryElement = React.ReactNode

export interface PageFactories {
  makeLogin: FactoryComponent
  makeUserList: FactoryComponent
  makeBooks: FactoryComponent
  makeLoans: FactoryComponent
  makeDashboard: FactoryComponent
  makeReservations: FactoryComponent
  makeReports: FactoryComponent
  makeSettings: FactoryComponent
}

export type RouteConfig = {
  path?: string
  index?: boolean
  factoryKey?: keyof PageFactories
  component?: React.ComponentType
  isPrivate?: boolean
  children?: RouteConfig[]
}
