import { Dialog as HeadlessDialog } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { cn } from './utils';
import type { ComponentProps } from './types';
import { componentColors } from './theme';

interface DialogProps extends Omit<ComponentProps, 'size'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      <div className={cn('fixed inset-0', componentColors.dialog.overlay)} aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel
          className={cn(
            'w-full rounded-lg',
            componentColors.dialog.panel.background,
            componentColors.dialog.panel.shadow,
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {title && (
            <div className={cn('flex items-center justify-between p-6 border-b', componentColors.dialog.header.border)}>
              <HeadlessDialog.Title className={cn('text-lg font-semibold', componentColors.dialog.header.title)}>
                {title}
              </HeadlessDialog.Title>
              <button
                onClick={onClose}
                className={cn('transition-colors', componentColors.dialog.close.default, 'hover:' + componentColors.dialog.close.hover)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {description && (
            <HeadlessDialog.Description className={cn('p-6', componentColors.dialog.description)}>
              {description}
            </HeadlessDialog.Description>
          )}

          <div className={cn(!title && 'p-6', title && 'p-6')}>{children}</div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};