import React from 'react'
import { Login } from '@/presentation/react/pages'
import { useReactRouterAdapter } from '@/infra/router/react-router-adapter'

export const MakeLogin: React.FC = () => {
  const router = useReactRouterAdapter()
  return <Login router={router} />
}
