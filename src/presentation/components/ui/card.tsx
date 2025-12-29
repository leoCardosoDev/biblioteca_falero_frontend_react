import React from 'react';
import { cn } from '@/lib/utils';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("bg-card-dark rounded-xl border border-white/5 shadow-sm", className)}>
    {children}
  </div>
);
