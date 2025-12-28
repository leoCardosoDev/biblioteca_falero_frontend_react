import React from 'react';
import { Icon } from './Icon';

interface BaseInputProps {
  label?: string;
  icon?: string;
  error?: string;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseInputProps { }

export const Input: React.FC<InputProps> = ({ label, icon, error, rightElement, containerClassName = "", className = "", required, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label className="text-white text-sm font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon name={icon} className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
          </div>
        )}
        <input
          className={`w-full h-12 rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${icon ? 'pl-11' : 'px-4'} ${rightElement ? 'pr-10' : 'pr-4'} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps { }

export const Select: React.FC<SelectProps> = ({ label, icon, error, children, containerClassName = "", className = "", required, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label className="text-white text-sm font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon name={icon} className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
          </div>
        )}
        <select
          className={`w-full h-12 rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer transition-all ${icon ? 'pl-11' : 'px-4'} pr-10 ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#92adc9]">
          <Icon name="expand_more" />
        </div>
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps { }

export const TextArea: React.FC<TextAreaProps> = ({ label, error, containerClassName = "", className = "", required, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label className="text-white text-sm font-medium flex items-center justify-between">
          <span>
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </span>
          {!required && <span className="text-[#92adc9] text-xs font-normal opacity-70">Opcional</span>}
        </label>
      )}
      <div className="relative group">
        <textarea
          className={`w-full min-h-[100px] rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white p-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-[#58738e] resize-y transition-all ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
