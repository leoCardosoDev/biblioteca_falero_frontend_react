import React, { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { LoginForm } from '../components/LoginForm'
import type { LoginFormData } from '../../application/dtos/login-form-dto'

import { useAuthStore, createIdentityHooks } from '../../infra'
import type { IdentityRepository } from '../../application/protocols'

interface LoginPageProps {
  repository: IdentityRepository
}

export function LoginPage({ repository }: LoginPageProps): React.JSX.Element {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { useLogin } = createIdentityHooks(repository)
  const loginMutation = useLogin()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(data: LoginFormData): Promise<void> {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password
    })
    navigate({ to: '/' })
  }

  if (loginMutation.isPending && !loginMutation.error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 md:flex-row">
      <div className="z-10 flex w-full flex-col justify-center bg-slate-950 p-8 md:w-[40%] md:p-16 lg:p-24">
        <div className="mx-auto w-full max-w-md space-y-12">
          <LoginForm
            isLoading={loginMutation.isPending}
            error={loginMutation.error?.message}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="relative hidden w-full overflow-hidden md:flex md:w-[60%]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(/library-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

        <div className="absolute bottom-16 left-16 right-16 z-20">
          <blockquote className="space-y-4">
            <p className="text-3xl font-light italic leading-tight text-white lg:text-4xl">
              &quot;O conhecimento organizado é a base para a inovação.&quot;
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <cite className="text-lg font-medium not-italic text-slate-300">
                Biblioteca Central
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
