import React from 'react';
import { cn, baseInputClasses, inputSizeClasses } from './utils';
import type { ComponentProps } from './types';
import { componentColors, themeClasses } from './theme';

interface InputProps extends Omit<ComponentProps, 'size'>, React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className,
    size = 'md' as const,
    disabled,
    ...props
  }, ref) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'block text-sm font-medium mb-1',
              hasError ? componentColors.input.label.error : componentColors.input.label.default
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className={componentColors.input.icon.default}>{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              baseInputClasses,
              inputSizeClasses[size as keyof typeof inputSizeClasses],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              hasError && cn(componentColors.input.field.error.border, componentColors.input.field.error.focus),
              disabled && cn(themeClasses.interactive.disabled.opacity, themeClasses.interactive.disabled.cursor),
              className
            )}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className={componentColors.input.icon.default}>{rightIcon}</span>
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1 text-sm',
              error ? componentColors.input.helper.error : componentColors.input.helper.default
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';