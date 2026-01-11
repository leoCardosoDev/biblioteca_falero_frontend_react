import { RouteConfig } from './types'
import { MainLayout } from '@/presentation/react/components/layout'

export const routes: RouteConfig[] = [
  {
    path: '/login',
    factoryKey: 'makeLogin',
    isPrivate: false
  },
  {
    path: '/',
    component: MainLayout,
    isPrivate: true,
    children: [
      {
        index: true,
        factoryKey: 'makeDashboard'
      },
      {
        path: 'books',
        factoryKey: 'makeBooks'
      },
      {
        path: 'loans',
        factoryKey: 'makeLoans'
      },
      {
        path: 'users',
        factoryKey: 'makeUserList'
      },
      {
        path: 'reservations',
        factoryKey: 'makeReservations'
      },
      {
        path: 'reports',
        factoryKey: 'makeReports'
      },
      {
        path: 'settings',
        factoryKey: 'makeSettings'
      }
    ]
  }
]
