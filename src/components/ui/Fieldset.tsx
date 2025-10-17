import { cn } from './utils';
import type { ComponentProps } from './types';

interface FieldsetProps extends ComponentProps {
  legend?: string;
  description?: string;
}

export const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <fieldset
      className={cn(
        'border border-gray-300 rounded-lg p-4 space-y-4',
        className
      )}
      {...props}
    >
      {legend && (
        <legend className="px-2 text-lg font-semibold text-gray-900">
          {legend}
        </legend>
      )}
      {description && (
        <p className="text-sm text-gray-600 -mt-2">
          {description}
        </p>
      )}
      {children}
    </fieldset>
  );
};