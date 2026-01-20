import { useEffect } from 'react'

import { useLoginViewModel } from '@/shared/presentation/react/hooks/use-login-viewmodel'
import type { Router } from '@/shared/presentation/protocols/router-protocol'
import { LoginView } from '@/shared/presentation/react/pages/login/login-view'

type Props = {
  router: Router
}

export function LoginController({ router }: Props) {
  const { loginSubmit, isLoading, error, isAuthenticated } = useLoginViewModel()

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
