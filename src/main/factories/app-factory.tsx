import React, { Suspense } from 'react'

import { App } from '@/presentation/react/app'
import { makeAuthFacade } from '@/main/factories/auth/auth-facade-factory'
import { Spinner } from '@/presentation/react/components/ui'

const MakeLogin = React.lazy(() => import('@/main/factories/pages/login/login-factory').then(module => ({ default: module.MakeLogin })))
const MakeUserList = React.lazy(() => import('@/main/factories/pages/user-list/user-list-factory').then(module => ({ default: module.MakeUserList })))
const MakeBooks = React.lazy(() => import('@/main/factories/pages/books/books-factory').then(module => ({ default: module.MakeBooksCallback })))
const MakeLoans = React.lazy(() => import('@/main/factories/pages/loans/loans-factory').then(module => ({ default: module.MakeLoansCallback })))
const MakeDashboard = React.lazy(() => import('@/main/factories/pages/dashboard/dashboard-factory').then(module => ({ default: module.MakeDashboard })))
const MakeReservations = React.lazy(() => import('@/main/factories/pages/reservations/reservations-factory').then(module => ({ default: module.MakeReservations })))
const MakeReports = React.lazy(() => import('@/main/factories/pages/reports/reports-factory').then(module => ({ default: module.MakeReports })))
const MakeSettings = React.lazy(() => import('@/main/factories/pages/settings/settings-factory').then(module => ({ default: module.MakeSettings })))

export const MakeApp: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Spinner size="lg" /></div>}>
      <App
        makeLogin={MakeLogin}
        makeUserList={MakeUserList}
        makeBooks={MakeBooks}
        makeLoans={MakeLoans}
        makeDashboard={MakeDashboard}
        makeReservations={MakeReservations}
        makeReports={MakeReports}
        makeSettings={MakeSettings}
        authFacade={makeAuthFacade()}
      />
    </Suspense>
  )
}
