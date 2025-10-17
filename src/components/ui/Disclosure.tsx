import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from './utils';
import type { ComponentProps } from './types';

interface DisclosureProps extends ComponentProps {
  title: string;
  defaultOpen?: boolean;
}

export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
  ...props
}) => {
  return (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={cn('w-full', className)} {...props}>
          <HeadlessDisclosure.Button
            className={cn(
              'flex w-full justify-between items-center px-4 py-2 text-left font-medium',
              'bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-150',
              'focus:outline-none'
            )}
          >
            <span>{title}</span>
            <ChevronDownIcon
              className={cn(
                'h-5 w-5 transform transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel
            className={cn(
              'px-4 py-3 text-gray-600 transition-all duration-200',
              'bg-white rounded-b-lg border border-gray-200'
            )}
          >
            {children}
          </HeadlessDisclosure.Panel>
        </div>
      )}
    </HeadlessDisclosure>
  );
};