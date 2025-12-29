import React from 'react';
import { cn } from '@/lib/utils';

// --- Icon Helper ---
export const Icon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className, fill = false }) => (
    <span className={cn("material-symbols-outlined", fill && "icon-fill", className)}>
        {name}
    </span>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    icon?: string;
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className, ...props }) => {
    const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20",
        secondary: "bg-surface-dark hover:bg-surface-highlight text-white border border-white/10",
        danger: "bg-danger hover:bg-red-600 text-white shadow-lg shadow-danger/20",
        ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-white"
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {icon && <Icon name={icon} className="text-[20px]" />}
            {children}
        </button>
    );
};

// --- Badge ---
export const Badge: React.FC<{ label: string; color: 'success' | 'warning' | 'danger' | 'primary' | 'neutral' }> = ({ label, color }) => {
    const styles = {
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        danger: "bg-danger/10 text-danger border-danger/20",
        primary: "bg-primary/10 text-primary border-primary/20",
        neutral: "bg-slate-700/30 text-slate-400 border-slate-600/30"
    };

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border", styles[color])}>
            <span className={cn("size-1.5 rounded-full bg-current opacity-70")}></span>
            {label}
        </span>
    );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("bg-card-dark rounded-xl border border-white/5 shadow-sm", className)}>
        {children}
    </div>
);

// --- Avatar ---
export const Avatar: React.FC<{ src: string; alt?: string; size?: 'sm' | 'md' | 'lg' }> = ({ src, alt = "Avatar", size = 'md' }) => {
    const sizes = { sm: "size-8", md: "size-10", lg: "size-16" };
    return (
        <div
            className={cn(sizes[size], "rounded-full bg-cover bg-center border border-white/10")}
            style={{ backgroundImage: `url('${src}')` }}
            aria-label={alt}
        />
    );
};

// --- Switch ---
interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
}
export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-white">{label}</span>}
            {description && <span className="text-xs text-slate-400">{description}</span>}
        </div>
        <label className="flex items-center cursor-pointer relative">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-700'}`}></div>
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </label>
    </div>
);