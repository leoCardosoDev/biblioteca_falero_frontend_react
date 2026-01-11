import { useEffect } from 'react'

import { useAuth } from '@/presentation/react/hooks/use-auth'
import { Router } from '@/presentation/protocols/router-protocol'
import { LoginView } from '@/presentation/react/pages/login/login-view'

type Props = {
  router: Router
}

export function LoginController({ router }: Props) {
  const { loginSubmit, isLoading, error, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate('/')
    }
  }, [isAuthenticated, router])

  const handleLoginSuccess = () => {
    router.navigate('/')
  }

  if (isLoading && !error) {
    return null
  }

  return (
    <LoginView
      onSubmit={loginSubmit(handleLoginSuccess)}
      isLoading={isLoading}
      error={error}
    />
  )
}
