import React from 'react'
import { useAuth } from '@/presentation/hooks/use-auth'
import type { Authentication } from '@/domain/usecases'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LoginForm } from '@/presentation/components/login-form'

type Props = {
  authentication: Authentication
  className?: string
}

export const Login: React.FC<Props> = ({ authentication, className }) => {
  const navigate = useNavigate()
  const { register, loginHandler, isLoading, error, errors } = useAuth(authentication)

  const handleLoginSuccess = () => {
    navigate('/')
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-gray-50", className)}>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <LoginForm
          register={register}
          handleSubmit={loginHandler(handleLoginSuccess)}
          errors={errors}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}
