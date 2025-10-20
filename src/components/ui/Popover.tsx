import {
  Popover as HeadlessPopover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const placementStyles = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

export function Popover({ trigger, children, placement = 'bottom' }: PopoverProps) {
  return (
    <HeadlessPopover className="relative">
      {({ open }) => (
        <>
          <PopoverButton as="div">
            {trigger}
          </PopoverButton>

          <AnimatePresence>
            {open && (
              <PopoverPanel
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                anchor={placement === 'bottom' ? 'bottom start' : placement === 'top' ? 'top start' : undefined}
                className="
                  z-50 w-80
                  bg-white dark:bg-gray-800
                  border-2 border-gray-200 dark:border-gray-700
                  rounded-lg shadow-xl
                  p-4
                "
              >
                {children}
              </PopoverPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </HeadlessPopover>
  );
}
