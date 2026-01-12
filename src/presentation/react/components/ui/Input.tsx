import React, { type InputHTMLAttributes } from 'react'
import { Icon } from './icon'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: string
  error?: string
  inputClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, inputClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="group relative flex items-center">
          {icon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center">
              <Icon
                name={icon}
                className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary dark:text-slate-500"
              />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 transition-all placeholder:text-slate-500 focus:outline-none dark:border-slate-800 dark:bg-surface-highlight dark:text-white',
              icon && 'pl-11',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                : 'hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary/20 dark:hover:border-slate-700',
              inputClassName
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
