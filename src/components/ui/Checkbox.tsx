import { Checkbox as HeadlessCheckbox, Field, Label, Description } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<ComponentProps<typeof HeadlessCheckbox>, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: number }> = {
  sm: { box: 'w-4 h-4', icon: 12 },
  md: { box: 'w-5 h-5', icon: 14 },
  lg: { box: 'w-6 h-6', icon: 16 },
};

export function Checkbox({
  label,
  description,
  size = 'md',
  indeterminate = false,
  disabled,
  ...props
}: CheckboxProps) {
  const content = (
    <HeadlessCheckbox
      disabled={disabled}
      className={`
        group relative inline-flex items-center justify-center
        ${sizeStyles[size].box}
        rounded-md border-2
        transition-all duration-200
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        disabled:cursor-not-allowed disabled:opacity-50
        data-[checked]:bg-blue-500 data-[checked]:border-blue-500
        data-[checked]:dark:bg-blue-600 data-[checked]:dark:border-blue-600
        data-[hover]:data-[checked]:bg-blue-600 data-[hover]:data-[checked]:dark:bg-blue-700
        border-gray-300 dark:border-gray-600
        data-[hover]:border-gray-400 dark:data-[hover]:border-gray-500
        bg-white dark:bg-gray-800
        cursor-pointer disabled:cursor-not-allowed
      `}
      {...props}
    >
      {({ checked }) => (
        <AnimatePresence mode="wait">
          {(checked || indeterminate) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="text-white"
            >
              {indeterminate ? (
                <Minus size={sizeStyles[size].icon} strokeWidth={3} />
              ) : (
                <Check size={sizeStyles[size].icon} strokeWidth={3} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </HeadlessCheckbox>
  );

  if (!label && !description) {
    return content;
  }

  return (
    <Field className="flex items-start gap-3">
      {content}
      <div className="flex-1">
        {label && (
          <Label
            className={`
              block font-medium text-gray-900 dark:text-gray-100
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
            `}
          >
            {label}
          </Label>
        )}
        {description && (
          <Description
            className={`
              block text-gray-600 dark:text-gray-400 mt-0.5
              ${disabled ? 'opacity-50' : ''}
              ${size === 'sm' ? 'text-xs' : 'text-sm'}
            `}
          >
            {description}
          </Description>
        )}
      </div>
    </Field>
  );
}
