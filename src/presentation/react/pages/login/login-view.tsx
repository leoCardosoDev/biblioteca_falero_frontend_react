import { LoginForm } from '@/presentation/react/components/forms/login-form'
import { LoginFormData } from '@/presentation/react/components/forms/login-schema'

type Props = {
  onSubmit: (data: LoginFormData) => Promise<void>
  isLoading: boolean
  error?: string
}

export function LoginView({ onSubmit, isLoading, error }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 md:flex-row">
      <div className="z-10 flex w-full flex-col justify-center bg-slate-950 p-8 md:w-[40%] md:p-16 lg:p-24">
        <div className="mx-auto w-full max-w-md space-y-12">
          <LoginForm isLoading={isLoading} error={error} onSubmit={onSubmit} />
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
              "O conhecimento organizado é a base para a inovação."
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
