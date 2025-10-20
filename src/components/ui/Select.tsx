import { Select as HeadlessSelect, Field, Label, Description } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import type React from 'react';
import type { ComponentProps, ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<ComponentProps<typeof HeadlessSelect>, 'className' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  size?: SelectSize;
  options: SelectOption[];
  placeholder?: string;
  value?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
};

export function Select({
  label,
  description,
  error,
  size = 'md',
  options,
  placeholder,
  disabled,
  ...props
}: SelectProps) {
  const hasError = !!error;

  return (
    <Field className="w-full">
      {label && (
        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
          {label}
        </Label>
      )}
      <div className="relative">
        <HeadlessSelect
          disabled={disabled}
          className={`
            w-full appearance-none
            ${sizeStyles[size]}
            pr-10
            border-2 border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            rounded-lg
            ${hasError ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
            text-gray-900 dark:text-gray-100
            transition-all duration-200
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
            disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </HeadlessSelect>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
      {description && !hasError && (
        <Description className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </Description>
      )}
      {hasError && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </Field>
  );
}
