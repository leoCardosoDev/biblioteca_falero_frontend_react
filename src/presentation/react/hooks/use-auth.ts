import { useState } from 'react'
import { useCustomForm } from '@/presentation/react/components/ui/form'
import { z } from 'zod'
import type { AccountModel } from '@/domain/models'
import { InvalidCredentialsError } from '@/domain/errors'
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type LoginFormData = z.infer<typeof loginSchema>

export const useAuth = () => {
  const { login } = useAuthContext()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const methods = useCustomForm<LoginFormData>({
    schema: loginSchema,
    mode: 'onChange'
  })

  const {
    handleSubmit,
    formState: { errors, isValid }
  } = methods

  // Returns exact AccountModel or null on failure (error state is set)
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

  return {
    methods,
    performLogin, // New method for caller to trigger
    // Handler that wraps logic but does NOT wrap with handleSubmit (for use with Form component)
    loginSubmit:
      (onSuccess: (account: AccountModel) => void) =>
      async (data: LoginFormData) => {
        const account = await performLogin(data)
        if (account) onSuccess(account)
      },
    // Legacy handler that wraps with handleSubmit (for use with raw <form>)
    loginHandler: (onSuccess: (account: AccountModel) => void) =>
      handleSubmit(async (data) => {
        const account = await performLogin(data)
        if (account) onSuccess(account)
      }),
    errors,
    isValid,
    isLoading,
    error
  }
}
