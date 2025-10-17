import React from 'react';
import { cn, baseInputClasses } from './utils';
import type { ComponentProps } from './types';

interface TextareaProps extends Omit<ComponentProps, 'size'>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    helperText,
    className,
    size = 'md' as const,
    disabled,
    ...props
  }, ref) => {
    const hasError = !!error;
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm min-h-[80px]',
      md: 'px-4 py-3 text-base min-h-[100px]',
      lg: 'px-4 py-3 text-lg min-h-[120px]',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              hasError && 'text-red-600'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            baseInputClasses,
            sizeClasses[size as keyof typeof sizeClasses],
            'resize-vertical',
            hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1 text-sm',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';