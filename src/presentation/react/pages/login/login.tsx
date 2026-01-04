import React from 'react'
import { LoginController } from '@/presentation/react/pages/login/login-controller'
import { Router } from '@/presentation/protocols/router-protocol'

type Props = {
  router: Router
}

export const Login: React.FC<Props> = (props: Props) => {
  return <LoginController {...props} />
}
