import React from 'react'
import { Icon } from '@/presentation/react/components/ui'

export function BookCoverUpload() {
  return (
    <div className="flex flex-col gap-4 lg:col-span-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Capa da Obra
      </label>
      <div className="group flex min-h-[320px] flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#151f2b] dark:hover:bg-[#192633] lg:h-auto">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
          <Icon name="add_photo_alternate" className="text-3xl text-primary" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          Clique para fazer upload
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-[#92adc9]">
          ou arraste e solte o arquivo aqui
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-400 dark:text-[#58738e]">
          PNG, JPG ATÉ 5MB
        </p>
      </div>
    </div>
  )
}
