import React from 'react';
import { Icon } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, fullWidth = false, isLoading = false, className = "", disabled, ...props }) => {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101922]";

  const variants = {
    primary: "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20 focus:ring-primary",
    secondary: "bg-surface-dark hover:bg-surface-highlight text-white border border-white/10 focus:ring-slate-500",
    danger: "bg-danger hover:bg-red-600 text-white shadow-lg shadow-danger/20 focus:ring-danger",
    ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-white focus:ring-slate-500"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Icon name="progress_activity" className="animate-spin text-[20px]" />
      ) : (
        icon && <Icon name={icon} className="text-[20px]" />
      )}
      {children}
    </button>
  );
};
