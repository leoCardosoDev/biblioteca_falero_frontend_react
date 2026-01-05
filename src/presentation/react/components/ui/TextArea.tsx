import React, { type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label htmlFor={props.id} className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[120px] rounded-lg border bg-slate-50 dark:bg-surface-highlight border-slate-200 dark:border-slate-800 p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none transition-all resize-y",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
            : "focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-700",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
