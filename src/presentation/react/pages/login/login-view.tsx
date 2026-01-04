import React from 'react'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { LoginForm } from '@/presentation/react/components/login-form'
import { AuthenticationParams } from '@/domain/usecases'

type Props = {
  register: UseFormRegister<AuthenticationParams>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  errors: FieldErrors<AuthenticationParams>
  isLoading: boolean
  error?: string
}

export const LoginView: React.FC<Props> = ({
  register,
  onSubmit,
  errors,
  isLoading,
  error
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      {/* Left Section - Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 bg-slate-950">
        <div className="max-w-md w-full mx-auto space-y-12">
          <LoginForm
            register={register}
            handleSubmit={onSubmit}
            errors={errors}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {/* Right Section - Image & Quote */}
      <div className="hidden md:flex md:w-[60%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(/library-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

        <div className="absolute bottom-16 left-16 right-16 z-20">
          <blockquote className="space-y-4">
            <p className="text-3xl lg:text-4xl font-light text-white leading-tight italic">
              "O conhecimento organizado é a base para a inovação."
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <cite className="text-slate-300 font-medium not-italic text-lg">Biblioteca Central</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
