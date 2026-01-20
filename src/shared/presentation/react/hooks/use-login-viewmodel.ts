import { useState } from 'react'
import type { AccountModel } from '@/shared/domain/models'
import { InvalidCredentialsError } from '@/shared/domain/errors'
import { useAuthContext } from '@/shared/presentation/react/hooks/use-auth-context'
import type { LoginFormData } from '@/shared/presentation/dtos/login-form-dto'
import { ErrorMessages } from '@/shared/presentation/constants/messages'

export interface LoginViewModel {
  loginSubmit: (
    onSuccess: (account: AccountModel) => void
  ) => (data: LoginFormData) => Promise<void>
  isLoading: boolean
  error?: string
  isAuthenticated: boolean
}

export const useLoginViewModel = (): LoginViewModel => {
  const {
    login,
    isLoading: isContextLoading,
    isAuthenticated
  } = useAuthContext()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const performLogin = async (
    data: LoginFormData
  ): Promise<AccountModel | undefined> => {
    try {
      setIsLoading(true)
      setError(undefined)
      const account = await login(data)
      if (!account) {
        setError(ErrorMessages.UnexpectedLogin)
        return undefined
      }
      return account
    } catch (err: unknown) {
      if (err instanceof InvalidCredentialsError) {
        setError(err.message)
      } else {
        setError(ErrorMessages.UnexpectedTryAgain)
      }
      return undefined
    } finally {
      setIsLoading(false)
    }
  }

  const loginSubmit =
    (onSuccess: (account: AccountModel) => void) =>
    async (data: LoginFormData) => {
      const account = await performLogin(data)
      if (account) onSuccess(account)
    }

  return {
    loginSubmit,
    isLoading: isLoading || isContextLoading,
    error,
    isAuthenticated
  }
}
