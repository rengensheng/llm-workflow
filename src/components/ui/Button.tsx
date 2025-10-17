import React from 'react';
import { cn, sizeClasses, disabledClasses, focusRingClasses } from './utils';
import type { ComponentProps } from './types';
import { componentColors } from './theme';

interface ButtonProps extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    const variantClasses = {
      primary: componentColors.button.primary,
      secondary: componentColors.button.secondary,
      ghost: componentColors.button.ghost,
      link: componentColors.button.link,
      success: componentColors.button.success,
      warning: componentColors.button.warning,
      error: componentColors.button.error,
    } as const;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150',
          sizeClasses[size],
          variantClasses[variant],
          focusRingClasses,
          isDisabled && disabledClasses,
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';