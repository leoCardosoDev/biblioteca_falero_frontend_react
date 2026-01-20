import React from 'react'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div
      className={cn(
        'mt-2 border-t border-slate-200/10 pt-2 dark:border-slate-800/50 md:col-span-2',
        className
      )}
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
    </div>
  )
}
