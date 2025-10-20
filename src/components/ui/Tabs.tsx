import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface TabItem {
  label: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  variant?: 'default' | 'pills' | 'underline';
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

const variantStyles = {
  default: {
    list: 'flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1',
    tab: `
      w-full rounded-md py-2.5 px-3 text-sm font-medium
      transition-all duration-200
      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100
      dark:focus:ring-offset-gray-800
      data-[selected]:bg-white data-[selected]:shadow
      dark:data-[selected]:bg-gray-700
      data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400
      data-[hover]:bg-white/[0.5] dark:data-[hover]:bg-gray-700/50
      text-gray-600 dark:text-gray-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
    `,
    content: 'inline-flex items-center justify-center gap-2',
  },
  pills: {
    list: 'flex space-x-2',
    tab: `
      rounded-full py-2.5 px-4 text-sm font-medium
      transition-all duration-200
      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2
      data-[selected]:bg-blue-500 dark:data-[selected]:bg-blue-600
      data-[selected]:text-white
      data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700
      data-[selected]:data-[hover]:bg-blue-600 dark:data-[selected]:data-[hover]:bg-blue-700
      text-gray-600 dark:text-gray-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
    `,
    content: 'inline-flex items-center justify-center gap-2',
  },
  underline: {
    list: 'flex space-x-6 border-b-2 border-gray-200 dark:border-gray-700',
    tab: `
      relative py-3 px-1 text-sm font-medium
      transition-all duration-200
      focus:outline-none
      data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400
      data-[hover]:text-gray-900 dark:data-[hover]:text-gray-100
      text-gray-600 dark:text-gray-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
    `,
    content: 'relative inline-flex items-center gap-2',
  },
};

export function Tabs({ items, variant = 'default', defaultIndex = 0, onChange }: TabsProps) {
  const styles = variantStyles[variant];

  return (
    <TabGroup defaultIndex={defaultIndex} onChange={onChange}>
      <TabList className={styles.list}>
        {items.map((item, index) => (
          <Tab key={index} disabled={item.disabled} className={styles.tab}>
            {({ selected }) => (
              <div className={styles.content}>
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
                {variant === 'underline' && selected && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[14px] left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-4">
        {items.map((item, index) => (
          <TabPanel
            key={index}
            className="
              focus:outline-none
              transition-opacity duration-200
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.content}
            </motion.div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
