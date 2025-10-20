/**
 * 设计系统 - 现代化科技感扁平化UI
 * Design System - Modern Tech Flat UI
 */

// 间距体系 Spacing System
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
} as const;

// 字体体系 Typography System
export const typography = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

// 圆角体系 Border Radius System
export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
} as const;

// 阴影体系 Shadow System
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: '0 0 20px rgba(59, 130, 246, 0.5)',
} as const;

// 动画时长 Animation Duration
export const duration = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

// 动画缓动 Animation Easing
export const easing = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// 颜色系统 Color System
export const colors = {
  // 主色调 Primary Colors
  primary: {
    light: '#3b82f6',      // blue-500
    dark: '#60a5fa',       // blue-400
  },
  // 成功色 Success
  success: {
    light: '#10b981',      // green-500
    dark: '#34d399',       // green-400
  },
  // 警告色 Warning
  warning: {
    light: '#f59e0b',      // amber-500
    dark: '#fbbf24',       // amber-400
  },
  // 危险色 Danger
  danger: {
    light: '#ef4444',      // red-500
    dark: '#f87171',       // red-400
  },
  // 信息色 Info
  info: {
    light: '#06b6d4',      // cyan-500
    dark: '#22d3ee',       // cyan-400
  },
  // 中性色 Neutral
  neutral: {
    light: '#6b7280',      // gray-500
    dark: '#9ca3af',       // gray-400
  },
} as const;

// 组件尺寸 Component Sizes
export const sizes = {
  button: {
    sm: {
      height: '2rem',       // 32px
      padding: '0.5rem 0.75rem',
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '2.5rem',     // 40px
      padding: '0.625rem 1rem',
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '3rem',       // 48px
      padding: '0.75rem 1.5rem',
      fontSize: typography.fontSize.lg,
    },
  },
} as const;

// 交互状态透明度 Interaction State Opacity
export const opacity = {
  hover: '0.9',
  active: '0.8',
  disabled: '0.5',
} as const;
