import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export interface DisclosureProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'bordered' | 'filled';
}

const variantStyles = {
  default: {
    container: 'border-b border-gray-200 dark:border-gray-700',
    button: 'w-full flex items-center justify-between py-4 text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
    panel: 'pb-4 text-gray-600 dark:text-gray-400',
  },
  bordered: {
    container: 'border-2 border-gray-200 dark:border-gray-700 rounded-lg mb-2',
    button: 'w-full flex items-center justify-between px-4 py-4 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg',
    panel: 'px-4 pb-4 text-gray-600 dark:text-gray-400',
  },
  filled: {
    container: 'bg-gray-50 dark:bg-gray-800 rounded-lg mb-2',
    button: 'w-full flex items-center justify-between px-4 py-4 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg',
    panel: 'px-4 pb-4 text-gray-600 dark:text-gray-400',
  },
};

export function Disclosure({ title, children, defaultOpen = false, variant = 'default' }: DisclosureProps) {
  const styles = variantStyles[variant];

  return (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={styles.container}>
          <DisclosureButton className={styles.button}>
            <span className="font-medium">{title}</span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </DisclosureButton>
          <DisclosurePanel
            transition
            className={`
              ${styles.panel}
              origin-top
              transition duration-200 ease-out
              data-[closed]:-translate-y-2 data-[closed]:opacity-0
            `}
          >
            {children}
          </DisclosurePanel>
        </div>
      )}
    </HeadlessDisclosure>
  );
}
