import React from 'react'
import { Login } from '@/presentation/react/pages/login'
import { useReactRouterAdapter } from '@/presentation/adapters/router/react-router-adapter'

export const MakeLogin: React.FC = () => {
  const router = useReactRouterAdapter()
  return <Login router={router} />
}
