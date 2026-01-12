import React from 'react'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  icon?: string
}

const baseStyles =
  'flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20',
  secondary:
    'bg-surface-dark hover:bg-surface-highlight text-white border border-white/10',
  danger: 'bg-danger hover:bg-red-600 text-white shadow-lg shadow-danger/20',
  ghost: 'bg-transparent hover:bg-white/5 text-text-secondary hover:text-white'
}

export function Button({
  children,
  variant = 'primary',
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {icon && <Icon name={icon} className="h-5 w-5" />}
      {children}
    </button>
  )
}
