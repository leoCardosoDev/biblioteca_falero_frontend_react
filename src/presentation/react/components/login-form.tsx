import React from 'react'
import { Button } from '@/presentation/react/components/ui'
import { Field } from '@/presentation/react/components/ui/form'

import { LoginHeader } from './login-header'

export const LoginForm: React.FC<{
  isLoading: boolean
  error?: string
  onSubmit?: never // Not used
}> = ({ isLoading, error }) => {
  return (
    <div className="w-full">
      <LoginHeader />
      <div className="flex flex-col gap-6">
        <Field
          name="email"
          label="Usuário"
          placeholder="Digite seu login"
          icon="person"
        />
        <Field
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon="lock"
        />

        {error && (
          <div className="rounded bg-red-100 p-2 text-center text-sm text-red-500 dark:bg-red-900/20">
            {error}
          </div>
        )}

        <Button
          className="mt-2 h-12"
          icon={isLoading ? undefined : 'arrow_forward'}
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </div>
  )
}
