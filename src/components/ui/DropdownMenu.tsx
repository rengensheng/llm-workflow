import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from './utils';
import type { ComponentProps } from './types';

interface DropdownMenuProps extends ComponentProps {
  items: Array<{
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  trigger?: React.ReactNode;
  align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  trigger,
  align = 'left',
  className,
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  return (
    <Menu as="div" className={cn('relative inline-block text-left', className)} {...props}>
      <MenuButton
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-base',
          size === 'lg' && 'h-12 px-6 text-lg',
          variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'secondary' && 'bg-gray-600 text-white hover:bg-gray-700',
          variant === 'ghost' && 'bg-transparent text-gray-700 hover:bg-gray-100',
          'focus:outline-none'
        )}
      >
        {trigger || (
          <>
            Options
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </>
        )}
      </MenuButton>

      <MenuItems
        className={cn(
          'absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          align === 'left' && 'left-0',
          align === 'right' && 'right-0'
        )}
      >
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem key={index} disabled={item.disabled}>
              {({ active, disabled }) => (
                <button
                  onClick={item.onClick}
                  disabled={disabled}
                  className={cn(
                    'flex w-full items-center px-4 py-2 text-sm text-left',
                    active && 'bg-gray-100 text-gray-900',
                    disabled && 'opacity-50 cursor-not-allowed',
                    !disabled && !active && 'text-gray-700'
                  )}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};