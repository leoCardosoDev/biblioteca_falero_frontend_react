// import React from 'react' - Removed unused import
import { AuthProvider } from '@/presentation/react/contexts/auth-context'
import type { AuthFacade } from '@/presentation/react/contexts/auth-context'
import { Router } from '@/presentation/react/router/router'
import type { PageFactories } from '@/presentation/react/router/types'

export type {
  FactoryComponent,
  FactoryElement
} from '@/presentation/react/router/types'

export interface AppProps extends PageFactories {
  authFacade: AuthFacade
}

export function App(props: AppProps) {
  const { authFacade, ...factories } = props

  return (
    <AuthProvider authFacade={authFacade}>
      <Router factories={factories} />
    </AuthProvider>
  )
}
