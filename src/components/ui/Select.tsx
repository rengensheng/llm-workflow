import { Listbox as HeadlessListbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn, baseInputClasses, inputSizeClasses } from './utils';
import type { ComponentProps } from './types';
import { componentColors, themeClasses } from './theme';

interface SelectProps extends ComponentProps {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  name,
  className,
  size = 'md',
  disabled,
  ...props
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <HeadlessListbox value={value} onChange={onChange} disabled={disabled} name={name}>
      <div className={cn('relative', className)} {...props}>
        <HeadlessListbox.Button
          className={cn(
            baseInputClasses,
            inputSizeClasses[size],
            'text-left pr-10',
            disabled && themeClasses.interactive.disabled.opacity + ' ' + themeClasses.interactive.disabled.cursor
          )}
        >
          <span className={cn('block truncate', !selectedOption && themeClasses.text.placeholder)}>
            {selectedOption?.label || placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </HeadlessListbox.Button>

        <HeadlessListbox.Options className={cn(
          'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base focus:outline-none',
          componentColors.dropdown.options.background,
          themeClasses.shadow.dropdown
        )}>
          {options.map((option) => (
            <HeadlessListbox.Option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={({ active, selected, disabled }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                  active && cn(componentColors.dropdown.options.item.active.background, componentColors.dropdown.options.item.active.text),
                  selected && cn(componentColors.dropdown.options.item.selected.background, componentColors.dropdown.options.item.selected.text),
                  disabled && cn(componentColors.dropdown.options.item.disabled.opacity, componentColors.dropdown.options.item.disabled.cursor),
                  !active && !selected && !disabled && cn(componentColors.dropdown.options.item.default.background, componentColors.dropdown.options.item.default.text)
                )
              }
            >
              {({ selected }) => (
                <>
                  <span className={cn('block truncate', selected && 'font-semibold')}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  )}
                </>
              )}
            </HeadlessListbox.Option>
          ))}
        </HeadlessListbox.Options>
      </div>
    </HeadlessListbox>
  );
};