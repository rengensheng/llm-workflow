// 主题颜色配置
// 在这里统一管理所有组件的颜色，方便快速修改主题

export const themeColors = {
  // 主色调
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  
  // 中性色
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // 状态色
  state: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

// 组件特定的颜色类名
// 使用 Tailwind CSS 类名，便于直接应用
export const themeClasses = {
  // 基础背景和边框
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    overlay: 'bg-white',
  },
  
  // 边框
  border: {
    default: 'border-gray-300',
    hover: 'border-gray-400',
    focus: 'border-blue-500 ring-blue-500',
    checked: 'border-blue-600',
  },
  
  // 文本
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-500',
    placeholder: 'text-gray-500',
    disabled: 'text-gray-400',
    white: 'text-white',
  },
  
  // 交互状态
  interactive: {
    // 选中状态
    selected: {
      background: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-600',
    },
    
    // 激活状态
    active: {
      background: 'bg-blue-100',
      text: 'text-blue-900',
    },
    
    // 悬停状态
    hover: {
      background: 'bg-gray-50',
      border: 'border-gray-400',
    },
    
    // 禁用状态
    disabled: {
      background: 'bg-gray-100',
      text: 'text-gray-400',
      border: 'border-gray-300',
      opacity: 'opacity-50',
      cursor: 'cursor-not-allowed',
    },
  },
  
  // 阴影
  shadow: {
    dropdown: 'shadow-lg ring-1 ring-gray-300 ring-opacity-5',
  },
} as const;

// 组件特定的颜色组合
export const componentColors = {
  // Checkbox 组件
  checkbox: {
    checked: {
      background: 'bg-blue-600',
      border: 'border-blue-600',
      icon: 'text-white',
    },
    unchecked: {
      background: 'bg-white',
      border: 'border-gray-300',
      hover: {
        border: 'border-gray-400',
      },
    },
  },
  
  // 下拉选择组件 (Listbox, Combobox, Select)
  dropdown: {
    button: {
      background: 'bg-white',
      border: 'border-gray-300',
      text: 'text-gray-900',
      placeholder: 'text-gray-500',
      icon: 'text-gray-400',
    },
    options: {
      background: 'bg-white',
      item: {
        default: {
          background: 'bg-white',
          text: 'text-gray-900',
        },
        active: {
          background: 'bg-blue-100',
          text: 'text-blue-900',
        },
        selected: {
          background: 'bg-blue-600',
          text: 'text-white',
        },
        disabled: {
          opacity: 'opacity-50',
          cursor: 'cursor-not-allowed',
        },
      },
    },
  },
  
  // Popover 组件
  popover: {
    panel: {
      background: 'bg-white',
      shadow: 'shadow-lg ring-1 ring-black ring-opacity-5',
    },
  },
  
  // Input 组件
  input: {
    label: {
      default: 'text-gray-700',
      error: 'text-red-600',
    },
    field: {
      default: {
        border: 'border-gray-300',
        focus: 'border-blue-500 ring-blue-500',
      },
      error: {
        border: 'border-red-500',
        focus: 'border-red-500 ring-red-500',
      },
    },
    icon: {
      default: 'text-gray-400',
    },
    helper: {
      default: 'text-gray-500',
      error: 'text-red-600',
    },
  },
  
  // Button 组件
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    link: 'bg-transparent text-blue-600 hover:text-blue-700 underline focus:ring-blue-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
  
  // Dialog 组件
  dialog: {
    overlay: 'bg-black/30',
    panel: {
      background: 'bg-white',
      shadow: 'shadow-xl',
    },
    header: {
      border: 'border-gray-200',
      title: 'text-gray-900',
    },
    close: {
      default: 'text-gray-400',
      hover: 'text-gray-600',
    },
    description: 'text-gray-600',
  },
} as const;

// 导出类型
export type ThemeColors = typeof themeColors;
export type ThemeClasses = typeof themeClasses;
export type ComponentColors = typeof componentColors;