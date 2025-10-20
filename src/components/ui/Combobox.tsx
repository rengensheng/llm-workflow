import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';

export interface ComboboxOptionType {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<ComponentProps<typeof HeadlessCombobox>, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  options: ComboboxOptionType[];
  placeholder?: string;
}

export function Combobox({
  label,
  description,
  error,
  options,
  placeholder = 'Search...',
  disabled,
  value,
  onChange,
  ...props
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const hasError = !!error;

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Field className="w-full">
      {label && (
        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
          {label}
        </Label>
      )}
      <HeadlessCombobox disabled={disabled} value={value} onChange={onChange} {...props}>
        <div className="relative">
          <div className="relative">
            <ComboboxInput
              placeholder={placeholder}
              displayValue={(value: string) => options.find((opt) => opt.value === value)?.label || ''}
              onChange={(event) => setQuery(event.target.value)}
              className={`
                w-full h-10 px-4 pr-10
                border-2 border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                rounded-lg
                ${hasError ? 'border-red-500 dark:border-red-500' : 'focus:border-blue-500 dark:focus:border-blue-500'}
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
                disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900
              `}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom start"
            className="
              mt-1 w-[var(--input-width)]
              bg-white dark:bg-gray-800
              border-2 border-gray-200 dark:border-gray-700
              rounded-lg shadow-lg
              max-h-60 overflow-auto
              py-1
              focus:outline-none
              z-50
              empty:invisible
            "
          >
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-500 dark:text-gray-400">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
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
                          className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500 dark:text-blue-400"
                        >
                          <Check className="w-5 h-5" />
                        </motion.span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </HeadlessCombobox>
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
