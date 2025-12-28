import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-secondary ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-surface border-2 border-transparent rounded-lg py-2.5 transition-all outline-none focus:border-primary/50 text-white placeholder:text-text-secondary/50 ${icon ? 'pl-10' : 'pl-4'} ${error ? 'border-status-danger/50' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-status-danger ml-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
