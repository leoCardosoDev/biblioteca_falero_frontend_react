import React from 'react';
import { Icon } from '@/presentation/react/components/ui';

export const BookCoverUpload: React.FC = () => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Capa da Obra</label>
      <div className="flex-1 min-h-[320px] lg:h-auto border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#151f2b] hover:bg-slate-100 dark:hover:bg-[#192633] transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon name="add_photo_alternate" className="text-primary text-3xl" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">Clique para fazer upload</p>
        <p className="text-xs text-slate-500 dark:text-[#92adc9] mt-1">ou arraste e solte o arquivo aqui</p>
        <p className="text-[10px] text-slate-400 dark:text-[#58738e] mt-4 uppercase tracking-wider">PNG, JPG ATÉ 5MB</p>
      </div>
    </div>
  );
};
