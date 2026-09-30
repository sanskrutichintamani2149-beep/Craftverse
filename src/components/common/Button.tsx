import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withArrow?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  withArrow = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-xl gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-btn gap-2',
    lg: 'text-base px-6 py-3.5 rounded-btn gap-2.5',
  };

  const variantStyles = {
    primary: 'btn-gradient text-white hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_-2px_rgba(19,70,224,0.45),0_0_15px_-2px_rgba(25,227,192,0.3)]',
    secondary: 'glass-card text-typography-headingDark dark:text-white hover:border-brand-cyan/60 hover:bg-white/10 dark:hover:bg-white/5 disabled:opacity-50',
    ghost: 'text-typography-bodyDark hover:text-brand-cyan hover:bg-brand-cyan/10 rounded-xl disabled:opacity-50',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 disabled:opacity-50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {withArrow && !isLoading && (
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
      )}
    </button>
  );
};
