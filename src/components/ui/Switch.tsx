import { Switch as HeadlessSwitch, Field, Label, Description } from '@headlessui/react';
import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<ComponentProps<typeof HeadlessSwitch>, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  size?: SwitchSize;
}

const sizeStyles: Record<SwitchSize, { track: string; thumb: string; translateX: number }> = {
  sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translateX: 16 },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translateX: 20 },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translateX: 28 },
};

export function Switch({
  label,
  description,
  size = 'md',
  disabled,
  ...props
}: SwitchProps) {
  const content = (
    <HeadlessSwitch
      disabled={disabled}
      className={`
        group relative inline-flex ${sizeStyles[size].track} shrink-0
        rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        disabled:cursor-not-allowed disabled:opacity-50
        data-[checked]:bg-blue-500 data-[checked]:dark:bg-blue-600
        data-[hover]:data-[checked]:bg-blue-600 data-[hover]:data-[checked]:dark:bg-blue-700
        bg-gray-200 dark:bg-gray-700
        data-[hover]:bg-gray-300 dark:data-[hover]:bg-gray-600
        cursor-pointer disabled:cursor-not-allowed
      `}
      {...props}
    >
      {({ checked }) => (
        <motion.span
          initial={false}
          animate={{
            x: checked ? sizeStyles[size].translateX : 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={`
            ${sizeStyles[size].thumb}
            inline-block rounded-full
            bg-white shadow-lg
            ring-0
            pointer-events-none
          `}
        />
      )}
    </HeadlessSwitch>
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
