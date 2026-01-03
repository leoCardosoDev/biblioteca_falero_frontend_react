import React from 'react'
import { Login } from '@/presentation/react/pages'
import { useReactRouterAdapter } from '@/infra/router/react-router-adapter'

// Factory now simplified as dependencies are injected via Context
export const MakeLogin: React.FC = () => {
  const router = useReactRouterAdapter()
  return (
    <Login router={router} />
  )
}
