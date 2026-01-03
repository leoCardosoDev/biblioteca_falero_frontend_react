import React from 'react'
import { Login } from '@/presentation/react/pages'

// Factory now simplified as dependencies are injected via Context
export const MakeLogin: React.FC = () => {
  return (
    <Login />
  )
}
