import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/presentation/react/components/layout'
import { ErrorBoundary } from '@/presentation/react/components/ui'
import { Dashboard } from '@/presentation/react/pages/dashboard/dashboard'
import { Reservations } from '@/presentation/react/pages/reservations/reservations'
import { Reports } from '@/presentation/react/pages/reports/reports'
import { Settings } from '@/presentation/react/pages/settings/settings'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeUserList } from '@/main/factories/pages/user-list/user-list-factory'
import { MakeBooksCallback as MakeBooks } from '@/main/factories/pages/books/books-factory'
import { MakeLoansCallback as MakeLoans } from '@/main/factories/pages/loans/loans-factory'
import { PrivateRoute } from '@/presentation/react/components/private-route'
import { AuthProvider } from '@/presentation/react/contexts/auth-context'
import { makeAuthFacade } from '@/main/factories/auth/auth-facade-factory'

function App() {
  const authFacade = makeAuthFacade()

  return (
    <AuthProvider authFacade={authFacade}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<MakeLogin />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="books" element={<MakeBooks />} />
                <Route path="loans" element={<MakeLoans />} />
                <Route path="users" element={<MakeUserList />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
