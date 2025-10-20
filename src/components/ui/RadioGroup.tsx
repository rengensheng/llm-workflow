import {
  RadioGroup as HeadlessRadioGroup,
  Radio,
  Label,
  Description,
  Field,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<ComponentProps<typeof HeadlessRadioGroup>, 'className'> {
  label?: ReactNode;
  options: RadioOption[];
  size?: RadioSize;
  orientation?: 'vertical' | 'horizontal';
}

const sizeStyles: Record<RadioSize, { radio: string; dot: number }> = {
  sm: { radio: 'w-4 h-4', dot: 8 },
  md: { radio: 'w-5 h-5', dot: 10 },
  lg: { radio: 'w-6 h-6', dot: 12 },
};

export function RadioGroup({
  label,
  options,
  size = 'md',
  orientation = 'vertical',
  ...props
}: RadioGroupProps) {
  return (
    <HeadlessRadioGroup {...props}>
      {label && (
        <Label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {label}
        </Label>
      )}
      <div
        className={`
          flex gap-4
          ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        `}
      >
        {options.map((option) => (
          <Field key={option.value} className="flex items-start gap-3">
            <Radio
              value={option.value}
              disabled={option.disabled}
              className={`
                group relative inline-flex items-center justify-center
                ${sizeStyles[size].radio}
                rounded-full border-2
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
            >
              {({ checked }) => (
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="text-white"
                    >
                      <Circle size={sizeStyles[size].dot} fill="currentColor" strokeWidth={0} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Radio>
            <div className="flex-1">
              <Label
                className={`
                  block font-medium text-gray-900 dark:text-gray-100
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
                `}
              >
                {option.label}
              </Label>
              {option.description && (
                <Description
                  className={`
                    block text-gray-600 dark:text-gray-400 mt-0.5
                    ${option.disabled ? 'opacity-50' : ''}
                    ${size === 'sm' ? 'text-xs' : 'text-sm'}
                  `}
                >
                  {option.description}
                </Description>
              )}
            </div>
          </Field>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
}
