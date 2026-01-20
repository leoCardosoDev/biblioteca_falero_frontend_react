import { LoginController } from '@/shared/presentation/react/pages/login/login-controller'
import type { Router } from '@/shared/presentation/protocols/router-protocol'

type Props = {
  router: Router
}

export function Login(props: Props) {
  return <LoginController {...props} />
}
