import { Button as HeadlessButton } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ComponentProps<typeof HeadlessButton>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-blue-500 text-white
    hover:bg-blue-600
    active:bg-blue-700
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800
    shadow-md hover:shadow-lg
    disabled:bg-blue-300 dark:disabled:bg-blue-900
  `,
  secondary: `
    bg-gray-200 text-gray-900
    hover:bg-gray-300
    active:bg-gray-400
    dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-500
    shadow-sm hover:shadow-md
    disabled:bg-gray-100 dark:disabled:bg-gray-800
  `,
  success: `
    bg-green-500 text-white
    hover:bg-green-600
    active:bg-green-700
    dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800
    shadow-md hover:shadow-lg
    disabled:bg-green-300 dark:disabled:bg-green-900
  `,
  warning: `
    bg-amber-500 text-white
    hover:bg-amber-600
    active:bg-amber-700
    dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-800
    shadow-md hover:shadow-lg
    disabled:bg-amber-300 dark:disabled:bg-amber-900
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600
    active:bg-red-700
    dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800
    shadow-md hover:shadow-lg
    disabled:bg-red-300 dark:disabled:bg-red-900
  `,
  ghost: `
    bg-transparent text-gray-700
    hover:bg-gray-100
    active:bg-gray-200
    dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700
    disabled:bg-transparent
  `,
  outline: `
    bg-transparent border-2 border-gray-300 text-gray-700
    hover:border-gray-400 hover:bg-gray-50
    active:border-gray-500 active:bg-gray-100
    dark:border-gray-600 dark:text-gray-300
    dark:hover:border-gray-500 dark:hover:bg-gray-800
    dark:active:border-gray-400 dark:active:bg-gray-700
    disabled:border-gray-200 dark:disabled:border-gray-700
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <HeadlessButton
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
      {...props}
    >
      <motion.span
        className="inline-flex items-center justify-center gap-inherit"
        whileTap={!isDisabled ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {loading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
          </motion.span>
        )}

        {!loading && leftIcon && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {leftIcon}
          </motion.span>
        )}

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {children}
        </motion.span>

        {!loading && rightIcon && (
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {rightIcon}
          </motion.span>
        )}
      </motion.span>
    </HeadlessButton>
  );
}
