import React from 'react'

import { App } from '@/presentation/react/App'
import { makeAuthFacade } from '@/main/factories/auth/auth-facade-factory'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeUserList } from '@/main/factories/pages/user-list/user-list-factory'
import { MakeBooksCallback as MakeBooks } from '@/main/factories/pages/books/books-factory'
import { MakeLoansCallback as MakeLoans } from '@/main/factories/pages/loans/loans-factory'
import { MakeDashboard } from '@/main/factories/pages/dashboard/dashboard-factory'
import { MakeReservations } from '@/main/factories/pages/reservations/reservations-factory'
import { MakeReports } from '@/main/factories/pages/reports/reports-factory'
import { MakeSettings } from '@/main/factories/pages/settings/settings-factory'

export const MakeApp: React.FC = () => {
  return (
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
  )
}
