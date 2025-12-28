import type { Authentication } from '@/domain/usecases/authentication'
import { useAuth } from '@/presentation/hooks/use-auth'
import { Loader2, Library, Lock, User } from 'lucide-react'

export type LoginProps = {
  authentication: Authentication
}

export const Login = ({ authentication }: LoginProps) => {
  const { register, handleSubmit, errors, isLoading } = useAuth(authentication)

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 bg-slate-950 text-slate-50">
      {/* Left Column: Form & Branding */}
      <div className="flex flex-col h-full p-8 lg:p-12 relative">
        {/* Main Content Centered */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* Header: Logo & System Title */}
            <div>
              <div className="flex items-center text-xl font-bold text-blue-500 mb-2">
                <div className="bg-blue-600 p-1.5 rounded-lg mr-2 text-white">
                  <Library className="h-5 w-5" />
                </div>
                Falero
              </div>
              <p className="text-sm text-slate-400 font-medium">Sistema de Gestão de Bibliotecas</p>
            </div>

            {/* Welcome Message */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-slate-400">
                Por favor, insira suas credenciais para acessar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Usuário
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    {...register('email')}
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-3 py-2 text-sm ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="admin"
                    id="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm font-medium text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none" htmlFor="password">
                    Senha
                  </label>
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-400 font-medium">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    {...register('password')}
                    type="password"
                    className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-3 py-2 text-sm ring-offset-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                    placeholder="••••••••"
                    id="password"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm font-medium text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar no Sistema
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
            </div>

            <p className="px-8 text-center text-sm text-slate-400">
              Não tem uma conta?{' '}
              <a href="#" className="underline underline-offset-4 hover:text-blue-500">
                Contate o administrador
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-none">
          <p className="text-center text-xs text-slate-600">
            Falero v1.0.4 @ 2023
          </p>
        </div>
      </div>

      {/* Right Column: Decorative Image & Quote */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-l border-slate-800">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2428&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

        <div className="relative z-20 flex flex-col justify-center h-full max-w-lg mx-auto">
          <div className="space-y-6">
            <div className="h-1 w-20 bg-blue-600 rounded-full" />
            <blockquote className="space-y-4">
              <p className="text-3xl font-bold leading-tight">
                "O conhecimento organizado é a base para a inovação."
              </p>
              <footer className="flex items-center gap-4 pt-4">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  HS
                </div>
                <div>
                  <div className="font-semibold">Dra. Helena Santos</div>
                  <div className="text-sm text-slate-400">Diretora da Biblioteca Central</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
