import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';
import { cn } from './utils';
import type { ComponentProps } from './types';
import { componentColors } from './theme';

interface CheckboxProps extends ComponentProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  name?: string;
  value?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
  value,
  className,
  disabled,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <HeadlessCheckbox
      checked={checked}
      onChange={onChange}
      name={name}
      value={value}
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
              'flex items-center justify-center rounded border-2 transition-colors duration-150',
              sizeClasses[size],
              isChecked
                ? cn(componentColors.checkbox.checked.background, componentColors.checkbox.checked.border)
                : cn(componentColors.checkbox.unchecked.background, componentColors.checkbox.unchecked.border, 'group-hover:' + componentColors.checkbox.unchecked.hover.border),
              'focus:outline-none'
            )}
          >
            {isChecked && (
              <CheckIcon
                className={cn(
                  componentColors.checkbox.checked.icon,
                  size === 'sm' && 'h-3 w-3',
                  size === 'md' && 'h-4 w-4',
                  size === 'lg' && 'h-5 w-5'
                )}
              />
            )}
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
    </HeadlessCheckbox>
  );
};