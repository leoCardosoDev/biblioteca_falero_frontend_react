import React from 'react'
import { Button } from '@/presentation/react/components/ui'
import {
  Field,
  useCustomForm,
  Form
} from '@/presentation/react/components/ui/form'
import { LoginHeader } from '../login-header'
import { loginSchema, LoginFormData } from './login-schema'

export type { LoginFormData }

interface LoginFormProps {
  isLoading: boolean
  error?: string
  onSubmit: (data: LoginFormData) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  error,
  onSubmit
}) => {
  const methods = useCustomForm<LoginFormData>({
    schema: loginSchema,
    mode: 'onChange'
  })

  const {
    formState: { isValid }
  } = methods

  return (
    <div className="w-full">
      <LoginHeader />
      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
        noValidate
      >
        <Field
          name="email"
          label="Usuário"
          placeholder="Digite seu login"
          icon="person"
          required
        />
        <Field
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon="lock"
          required
        />

        {error && (
          <div className="rounded bg-red-100 p-2 text-center text-sm text-red-500 dark:bg-red-900/20">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="mt-2 h-12"
          icon={isLoading ? undefined : 'arrow_forward'}
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </div>
  )
}
