// 主题修改示例
// 这个文件展示了如何快速修改整个组件库的主题颜色

import { componentColors } from './theme';

// 示例1: 修改为紫色主题
export const purpleTheme = {
  ...componentColors,
  checkbox: {
    checked: {
      background: 'bg-purple-600',
      border: 'border-purple-600',
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
  dropdown: {
    ...componentColors.dropdown,
    options: {
      ...componentColors.dropdown.options,
      item: {
        ...componentColors.dropdown.options.item,
        active: {
          background: 'bg-purple-100',
          text: 'text-purple-900',
        },
        selected: {
          background: 'bg-purple-600',
          text: 'text-white',
        },
      },
    },
  },
};

// 示例2: 修改为绿色主题
export const greenTheme = {
  ...componentColors,
  checkbox: {
    checked: {
      background: 'bg-green-600',
      border: 'border-green-600',
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
  dropdown: {
    ...componentColors.dropdown,
    options: {
      ...componentColors.dropdown.options,
      item: {
        ...componentColors.dropdown.options.item,
        active: {
          background: 'bg-green-100',
          text: 'text-green-900',
        },
        selected: {
          background: 'bg-green-600',
          text: 'text-white',
        },
      },
    },
  },
};

// 示例3: 修改为深色主题
export const darkTheme = {
  ...componentColors,
  checkbox: {
    checked: {
      background: 'bg-indigo-600',
      border: 'border-indigo-600',
      icon: 'text-white',
    },
    unchecked: {
      background: 'bg-gray-800',
      border: 'border-gray-600',
      hover: {
        border: 'border-gray-500',
      },
    },
  },
  dropdown: {
    ...componentColors.dropdown,
    button: {
      background: 'bg-gray-800',
      border: 'border-gray-600',
      text: 'text-gray-100',
      placeholder: 'text-gray-400',
      icon: 'text-gray-400',
    },
    options: {
      background: 'bg-gray-800',
      item: {
        default: {
          background: 'bg-gray-800',
          text: 'text-gray-100',
        },
        active: {
          background: 'bg-indigo-900',
          text: 'text-indigo-100',
        },
        selected: {
          background: 'bg-indigo-600',
          text: 'text-white',
        },
        disabled: {
          opacity: 'opacity-50',
          cursor: 'cursor-not-allowed',
        },
      },
    },
  },
};

// 使用方法:
// 1. 在组件中导入想要的主题
// 2. 替换默认的 componentColors 导入
// 例如:
// import { purpleTheme } from './theme-example';
// 然后在组件中使用 purpleTheme 而不是 componentColors