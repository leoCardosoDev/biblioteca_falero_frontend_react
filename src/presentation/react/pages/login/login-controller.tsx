import React from 'react'

import { useAuth } from '@/presentation/react/hooks/use-auth'
import { Router } from '@/presentation/protocols/router-protocol'
import { LoginView } from '@/presentation/react/pages/login/login-view'

type Props = {
  router: Router
}

export const LoginController: React.FC<Props> = ({ router }: Props) => {
  const { methods, loginSubmit, isLoading, error } = useAuth()

  const handleLoginSuccess = () => {
    router.navigate('/')
  }

  return (
    <LoginView
      methods={methods}
      onSubmit={loginSubmit(handleLoginSuccess)}
      isLoading={isLoading}
      error={error}
    />
  )
}
