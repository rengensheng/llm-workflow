import { Radio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';
import { cn } from './utils';
import type { ComponentProps } from './types';

interface RadioGroupProps extends ComponentProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  orientation = 'vertical',
  className,
  size = 'md',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <HeadlessRadioGroup
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={cn(
        'space-y-2',
        orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          disabled={option.disabled || disabled}
          className={cn(
            'group flex items-start gap-3 text-left',
            (option.disabled || disabled) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {({ checked, disabled: isDisabled }) => (
            <>
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 transition-colors duration-150',
                  sizeClasses[size],
                  checked
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-300 group-hover:border-gray-400',
                  isDisabled && 'cursor-not-allowed',
                  'focus:outline-none'
                )}
              >
                {checked && (
                  <CheckIcon
                    className={cn(
                      'text-white',
                      size === 'sm' && 'h-2 w-2',
                      size === 'md' && 'h-3 w-3',
                      size === 'lg' && 'h-4 w-4'
                    )}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-base',
                    size === 'lg' && 'text-lg',
                    checked && 'font-medium text-gray-900',
                    !checked && 'text-gray-700'
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span
                    className={cn(
                      'text-gray-500',
                      size === 'sm' && 'text-xs',
                      size === 'md' && 'text-sm',
                      size === 'lg' && 'text-base'
                    )}
                  >
                    {option.description}
                  </span>
                )}
              </div>
            </>
          )}
        </Radio>
      ))}
    </HeadlessRadioGroup>
  );
};