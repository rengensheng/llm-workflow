import { Switch as HeadlessSwitch } from '@headlessui/react';
import { cn } from './utils';
import type { ComponentProps } from './types';

interface SwitchProps extends ComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  name?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  name,
  className,
  disabled,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-4 w-7',
      thumb: 'h-3 w-3',
      translate: 'translate-x-3',
    },
    md: {
      container: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
    },
    lg: {
      container: 'h-8 w-14',
      thumb: 'h-7 w-7',
      translate: 'translate-x-6',
    },
  };

  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={cn(
        'group flex items-center gap-3 text-left',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {({ checked: isChecked }) => (
        <>
          <div
            className={cn(
              'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out',
              sizeClasses[size].container,
              isChecked ? 'bg-blue-600' : 'bg-gray-200',
              'focus:outline-none'
            )}
          >
            <span
              className={cn(
                'inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                sizeClasses[size].thumb,
                isChecked ? sizeClasses[size].translate : 'translate-x-1'
              )}
            />
          </div>
          {label && (
            <span
              className={cn(
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg'
              )}
            >
              {label}
            </span>
          )}
        </>
      )}
    </HeadlessSwitch>
  );
};