import { useState } from 'react'
import type { AccountModel } from '@/domain/models'
import { InvalidCredentialsError } from '@/domain/errors'
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context'
import { LoginFormData } from '@/presentation/react/components/forms/login-schema'

export const useAuth = () => {
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
        setError('Erro inesperado: Falha no login')
        return undefined
      }
      return account
    } catch (error: unknown) {
      if (error instanceof InvalidCredentialsError) {
        setError(error.message)
      } else {
        setError('Erro inesperado. Tente novamente mais tarde.')
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
    performLogin,
    loginSubmit,
    isLoading: isLoading || isContextLoading,
    error,
    isAuthenticated
  }
}
