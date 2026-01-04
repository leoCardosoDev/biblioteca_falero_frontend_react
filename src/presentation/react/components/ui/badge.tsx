import React from 'react';
import { cn } from '@/lib/utils';

export const Badge: React.FC<{ label: string; color: 'success' | 'warning' | 'danger' | 'primary' | 'neutral' | 'purple' | 'cyan' }> = ({ label, color }) => {
  const styles = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    primary: "bg-primary/10 text-primary border-primary/20",
    neutral: "bg-slate-700/30 text-slate-400 border-slate-600/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border", styles[color])}>
      <span className={cn("size-1.5 rounded-full bg-current opacity-70")}></span>
      {label}
    </span>
  );
};
