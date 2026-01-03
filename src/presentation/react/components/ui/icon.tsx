import React from 'react';
import { cn } from '@/lib/utils';

export const Icon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className, fill = false }) => (
  <span className={cn("material-symbols-outlined", fill && "icon-fill", className)}>
    {name}
  </span>
);
