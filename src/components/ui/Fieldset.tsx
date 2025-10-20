import { Fieldset as HeadlessFieldset, Legend } from '@headlessui/react';
import type { ComponentProps, ReactNode } from 'react';

export interface FieldsetProps extends Omit<ComponentProps<typeof HeadlessFieldset>, 'className'> {
  legend?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export function Fieldset({
  legend,
  description,
  disabled,
  children,
  ...props
}: FieldsetProps) {
  return (
    <HeadlessFieldset
      disabled={disabled}
      className={`
        border-2 border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        rounded-lg p-6
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      {...props}
    >
      {legend && (
        <Legend className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {legend}
        </Legend>
      )}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </HeadlessFieldset>
  );
}
