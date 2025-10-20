import { Textarea as HeadlessTextarea, Field, Label, Description } from '@headlessui/react';
import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

export type TextareaVariant = 'default' | 'filled';

export interface TextareaProps extends Omit<ComponentProps<typeof HeadlessTextarea>, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  variant?: TextareaVariant;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  value?: string | null;
  placeholder?: string;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

const variantStyles: Record<TextareaVariant, string> = {
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
};

const resizeStyles: Record<string, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export function Textarea({
  label,
  description,
  error,
  variant = 'default',
  resize = 'vertical',
  disabled,
  ...props
}: TextareaProps) {
  const hasError = !!error;

  return (
    <Field className="w-full">
      {label && (
        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
          {label}
        </Label>
      )}
      <HeadlessTextarea
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-base
          ${variantStyles[variant]}
          ${resizeStyles[resize]}
          ${hasError ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : ''}
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          transition-all duration-200
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
          disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900
        `}
        {...props}
      />
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
