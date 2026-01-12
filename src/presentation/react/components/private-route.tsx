import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context'

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return null
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
