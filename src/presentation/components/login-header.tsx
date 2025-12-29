import React from 'react';
import { Icon } from '@/presentation/components/UI/Components';

export const LoginHeader: React.FC = () => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
        <Icon name="local_library" className="text-xl" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Falero</h1>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Sistema de Gestão de Bibliotecas</p>
    <div className="mt-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Bem-vindo de volta</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Por favor, insira suas credenciais.</p>
    </div>
  </div>
);
