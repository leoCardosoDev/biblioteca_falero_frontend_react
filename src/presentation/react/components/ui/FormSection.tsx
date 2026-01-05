import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <div className={cn("md:col-span-2 pt-2 border-t border-slate-200/10 dark:border-slate-800/50 mt-2", className)}>
      <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
};
