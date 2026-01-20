import React from 'react'
import { Login } from '@/shared/presentation/react/pages/login'
import { useTanStackRouterAdapter } from '@/shared/presentation/adapters/router/tanstack-router-adapter'

export const MakeLogin: React.FC = () => {
  const router = useTanStackRouterAdapter()
  return <Login router={router} />
}
