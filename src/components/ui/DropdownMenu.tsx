import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSection,
  MenuHeading,
  MenuSeparator,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export interface DropdownMenuItemType {
  label: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuSectionType {
  heading?: string;
  items: DropdownMenuItemType[];
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  sections: DropdownMenuSectionType[];
}

export function DropdownMenu({ trigger, sections }: DropdownMenuProps) {
  return (
    <Menu>
      <MenuButton as="div">{trigger}</MenuButton>

      <MenuItems
        anchor="bottom end"
        transition
        className="
          mt-2 w-56
          origin-top-right
          bg-white dark:bg-gray-800
          border-2 border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg
          py-1
          focus:outline-none
          z-50
          transition duration-200 ease-out
          data-[closed]:scale-95 data-[closed]:opacity-0
        "
      >
        {sections.map((section, sectionIdx) => (
          <MenuSection key={sectionIdx}>
            {section.heading && (
              <MenuHeading className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.heading}
              </MenuHeading>
            )}
            {section.items.map((item, itemIdx) => (
              <MenuItem key={itemIdx} disabled={item.disabled}>
                {({ focus, active }) => (
                  <button
                    onClick={item.onClick}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 text-sm
                      ${
                        item.destructive
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }
                      ${
                        focus || active
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : ''
                      }
                      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      transition-colors duration-150
                    `}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0 w-5 h-5">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.selected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </motion.span>
                    )}
                  </button>
                )}
              </MenuItem>
            ))}
            {sectionIdx < sections.length - 1 && (
              <MenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
            )}
          </MenuSection>
        ))}
      </MenuItems>
    </Menu>
  );
}
