import React, { type InputHTMLAttributes } from 'react';
import { Icon } from './icon';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, icon, error, className, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="relative flex items-center group">
        {icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none">
            <Icon name={icon} className="text-slate-400 dark:text-slate-500 text-[20px] group-focus-within:text-primary transition-colors" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 rounded-lg border bg-slate-50 dark:bg-surface-highlight border-slate-200 dark:border-slate-800 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all",
            icon && "pl-11",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
              : "focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-700",
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
