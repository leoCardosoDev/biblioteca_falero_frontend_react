import React from 'react'
import { Icon } from '@/presentation/react/components/ui'

export function LoginHeader() {
  return (
    <div className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
          <Icon name="local_library" className="text-2xl" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Falero</h1>
      </div>
      <div className="space-y-2">
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
          Bem-vindo de volta
        </h2>
        <p className="text-lg text-slate-400">
          Por favor, insira suas credenciais para acessar o sistema.
        </p>
      </div>
    </div>
  )
}
