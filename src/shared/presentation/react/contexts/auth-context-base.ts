import { createContext } from 'react'
import type { AccountModel } from '@/shared/domain/models/account-model'

import type { AuthenticationParams } from '@/shared/domain/usecases/authentication'

export type AuthContextData = {
  user: AccountModel | undefined
  isAuthenticated: boolean
  isLoading: boolean
  login: (params: AuthenticationParams) => Promise<AccountModel | null>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)
