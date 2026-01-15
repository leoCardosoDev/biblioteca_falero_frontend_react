import React, { type SelectHTMLAttributes } from 'react';
import { Icon } from './icon';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, icon, error, className, children, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label htmlFor={props.id} className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="relative flex items-center group">
        {icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none">
            <Icon name={icon} className="text-slate-400 dark:text-slate-500 text-[20px] group-focus-within:text-primary transition-colors" />
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full h-12 rounded-lg border bg-slate-50 dark:bg-surface-highlight border-slate-200 dark:border-slate-800 px-4 text-base text-slate-900 dark:text-white appearance-none focus:outline-none transition-all cursor-pointer",
            icon && "pl-11",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
              : "focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-700",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Icon name="expand_more" />
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
