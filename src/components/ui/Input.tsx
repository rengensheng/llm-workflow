import { Input as HeadlessInput, Field, Label, Description } from '@headlessui/react';
import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'flushed';

export interface InputProps extends Omit<ComponentProps<typeof HeadlessInput>, 'className' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  size?: InputSize;
  variant?: InputVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
};

const variantStyles: Record<InputVariant, string> = {
  default: `
    border-2 border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-800
    rounded-lg
    focus:border-blue-500 dark:focus:border-blue-500
  `,
  filled: `
    border-2 border-transparent
    bg-gray-100 dark:bg-gray-700
    rounded-lg
    focus:border-blue-500 dark:focus:border-blue-500
    focus:bg-white dark:focus:bg-gray-800
  `,
  flushed: `
    border-0 border-b-2 border-gray-300 dark:border-gray-600
    bg-transparent
    rounded-none
    focus:border-blue-500 dark:focus:border-blue-500
    px-0
  `,
};

export function Input({
  label,
  description,
  error,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: InputProps) {
  const hasError = !!error;

  return (
    <Field className="w-full">
      {label && (
        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
          {label}
        </Label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <HeadlessInput
          disabled={disabled}
          className={`
            w-full
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            ${leftIcon && variant !== 'flushed' ? 'pl-10' : ''}
            ${rightIcon && variant !== 'flushed' ? 'pr-10' : ''}
            ${hasError ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : ''}
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            transition-all duration-200
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
            disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {description && !hasError && (
        <Description className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </Description>
      )}
      {hasError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-red-500 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </Field>
  );
}
