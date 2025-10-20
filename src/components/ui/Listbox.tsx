import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export interface ListboxOptionType {
  value: string;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface ListboxProps extends Omit<ComponentProps<typeof HeadlessListbox>, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  options: ListboxOptionType[];
  placeholder?: string;
}

export function Listbox({
  label,
  description,
  error,
  options,
  placeholder = 'Select an option',
  disabled,
  value,
  ...props
}: ListboxProps) {
  const hasError = !!error;
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Field className="w-full">
      {label && (
        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
          {label}
        </Label>
      )}
      <HeadlessListbox disabled={disabled} value={value} {...props}>
        <div className="relative">
          <ListboxButton
            className={`
              relative w-full h-10 px-4 text-left
              border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              rounded-lg
              ${hasError ? 'border-red-500 dark:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
              text-gray-900 dark:text-gray-100
              transition-all duration-200
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
              disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900
            `}
          >
            <span className="block truncate">
              {selectedOption?.label || <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </span>
          </ListboxButton>

          <AnimatePresence>
            <ListboxOptions
              anchor="bottom start"
              className="
                mt-1 w-[var(--button-width)]
                bg-white dark:bg-gray-800
                border-2 border-gray-200 dark:border-gray-700
                rounded-lg shadow-lg
                max-h-60 overflow-auto
                py-1
                focus:outline-none
                z-50
              "
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="
                    relative cursor-pointer select-none py-2 pl-10 pr-4
                    text-gray-900 dark:text-gray-100
                    data-[focus]:bg-blue-50 dark:data-[focus]:bg-blue-900/20
                    data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50
                  "
                >
                  {({ selected }) => (
                    <>
                      <div className="flex flex-col">
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {option.description}
                          </span>
                        )}
                      </div>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500 dark:text-blue-400"
                        >
                          <Check className="w-5 h-5" />
                        </motion.span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </AnimatePresence>
        </div>
      </HeadlessListbox>
      {description && !hasError && (
        <Description className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </Description>
      )}
      {hasError && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </Field>
  );
}
