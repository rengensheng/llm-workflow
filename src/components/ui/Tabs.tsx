import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cn } from './utils';
import type { ComponentProps } from './types';

interface TabsProps extends Omit<ComponentProps, 'variant'> {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  defaultIndex?: number;
  variant?: 'underline' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  variant = 'underline',
  className,
  ...props
}) => {
  const tabVariantClasses = {
    underline: {
      base: 'border-b border-gray-200',
      tab: cn(
        'border-b-2 border-transparent px-4 py-2 text-sm font-medium',
        'text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'data-[selected]:border-blue-500 data-[selected]:text-blue-600',
        'focus:outline-none'
      ),
    },
    pills: {
      base: 'space-x-1',
      tab: cn(
        'rounded-md px-3 py-2 text-sm font-medium',
        'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        'data-[selected]:bg-blue-100 data-[selected]:text-blue-700',
        'focus:outline-none'
      ),
    },
  };

  return (
    <TabGroup defaultIndex={defaultIndex} className={cn('w-full', className)} {...props}>
      <TabList className={cn('flex', tabVariantClasses[variant].base)}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            disabled={tab.disabled}
            className={cn(
              tabVariantClasses[variant].tab,
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-4">
        {tabs.map((tab, index) => (
          <TabPanel key={index} className="focus:outline-none">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};