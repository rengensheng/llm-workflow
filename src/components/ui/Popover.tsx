import { Popover as HeadlessPopover } from '@headlessui/react';
import { cn } from './utils';
import type { ComponentProps } from './types';
import { componentColors } from './theme';

interface PopoverProps extends ComponentProps {
  trigger: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  position = 'bottom',
  className,
  ...props
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <HeadlessPopover className={cn('relative', className)} {...props}>
      <HeadlessPopover.Button as="div" className="cursor-pointer">
        {trigger}
      </HeadlessPopover.Button>

      <HeadlessPopover.Panel
        className={cn(
          'absolute z-50 w-64 rounded-md p-4',
          componentColors.popover.panel.background,
          componentColors.popover.panel.shadow,
          positionClasses[position]
        )}
      >
        {children}
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
};