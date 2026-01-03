import React from 'react';
import { Icon } from '@/presentation/react/components/ui';

export const LoginHeader: React.FC = () => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
        <Icon name="local_library" className="text-2xl" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white">Falero</h1>
    </div>
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Bem-vindo de volta</h2>
      <p className="text-slate-400 text-lg">Por favor, insira suas credenciais para acessar o sistema.</p>
    </div>
  </div>
);
