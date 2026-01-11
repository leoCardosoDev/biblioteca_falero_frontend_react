import React, { type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
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
        <textarea
          ref={ref}
          className={cn(
            'min-h-[120px] w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-4 text-base text-slate-900 transition-all placeholder:text-slate-500 focus:outline-none dark:border-slate-800 dark:bg-surface-highlight dark:text-white',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
              : 'hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary/20 dark:hover:border-slate-700',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
