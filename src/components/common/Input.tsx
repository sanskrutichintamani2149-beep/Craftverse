import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      isPassword = false,
      rightElement,
      className = '',
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-typography-headingDark dark:text-white/90 light:text-[#0B1B4A]"
            style={{ color: 'var(--text-heading)' }}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-brand-cyan/70 dark:text-[#7F92B8] pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={actualType}
            className={`w-full py-3.5 text-sm transition-all duration-200 glass-input
              ${icon ? 'pl-11' : 'pl-4'}
              ${isPassword || rightElement ? 'pr-12' : 'pr-4'}
              text-typography-headingDark dark:text-white placeholder:text-typography-muted dark:placeholder:text-[#64789F]
              ${error ? '!border-red-500/80 focus:!ring-red-500/30' : ''}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-brand-cyan/70 dark:text-[#7F92B8] hover:text-brand-cyan transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {!isPassword && rightElement && (
            <div className="absolute right-4 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs font-medium text-red-400 mt-0.5">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-typography-muted dark:text-[#7F92B8] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
