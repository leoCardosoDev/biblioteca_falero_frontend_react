import { LoginController } from '@/presentation/react/pages/login/login-controller'
import { Router } from '@/presentation/protocols/router-protocol'

type Props = {
  router: Router
}

export function Login(props: Props) {
  return <LoginController {...props} />
}
