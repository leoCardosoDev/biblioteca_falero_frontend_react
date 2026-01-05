import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui';
import { Icon } from '../ui';

const credentialSchema = z.object({
  username: z.string().min(3, 'O usuário deve ter no mínimo 3 caracteres').optional().or(z.literal('')),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').regex(/[A-Z]/, 'Deve conter letra maiúscula').regex(/[0-9]/, 'Deve conter número'),
});

export type CredentialFormData = z.infer<typeof credentialSchema>;

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CredentialFormData) => void;
  userName: string;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({ isOpen, onClose, onSave, userName }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CredentialFormData>({
    resolver: zodResolver(credentialSchema),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configurar Credenciais"
      subtitle={`Defina o acesso para ${userName}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Nome de Usuário (Opcional)</label>
          <input {...register('username')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="username" />
          {errors.username && <span className="text-xs text-red-400">{errors.username.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Senha <span className="text-red-400">*</span></label>
          <div className="relative group">
            <input type="password" {...register('password')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="********" />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#92adc9]">
              <Icon name="lock" />
            </div>
          </div>
          {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#324d67]">
          <button type="button" onClick={onClose} className="px-4 h-10 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#192633] transition-colors font-medium">Cancelar</button>
          <button type="submit" className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all">
            Salvar Senha
          </button>
        </div>
      </form>
    </Modal>
  );
};
