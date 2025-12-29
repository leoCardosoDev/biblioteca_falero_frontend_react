import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Authentication } from '@/domain/usecases'
import type { AccountModel } from '@/domain/models'
import { InvalidCredentialsError } from '@/domain/errors'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type LoginFormData = z.infer<typeof loginSchema>

export const useAuth = (authentication: Authentication) => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  // Returns exact AccountModel or null on failure (error state is set)
  const performLogin = async (data: LoginFormData): Promise<AccountModel | undefined> => {
    try {
      setIsLoading(true)
      setError(undefined)
      const account = await authentication.auth(data)
      if (!account?.accessToken) {
        setError('Erro inesperado: Token de acesso não recebido')
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
    register,
    handleSubmit: handleSubmit, // Expose raw handler if needed, but improved pattern below
    performLogin, // New method for caller to trigger
    loginHandler: (onSuccess: (account: AccountModel) => void) => handleSubmit(async (data) => {
      const account = await performLogin(data)
      if (account) onSuccess(account)
    }),
    errors,
    isValid,
    isLoading,
    error
  }
}
