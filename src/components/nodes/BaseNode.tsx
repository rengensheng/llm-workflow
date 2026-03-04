import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface BaseNodeProps extends NodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: any;
  status?: 'idle' | 'running' | 'success' | 'error';
  gradient?: string;
  children?: React.ReactNode;
  showInputHandle?: boolean;
  showOutputHandle?: boolean;
}

export default function BaseNode({
  icon,
  title,
  subtitle,
  status = 'idle',
  gradient = 'from-blue-500 to-purple-600',
  children,
  showInputHandle = true,
  showOutputHandle = true,
}: BaseNodeProps) {
  const statusColors = {
    idle: 'bg-gray-300',
    running: 'bg-yellow-400 animate-pulse',
    success: 'bg-green-400',
    error: 'bg-red-400',
  };

  // 根据 gradient 值获取图标背景色
  const getIconBgClass = () => {
    if (status === 'running') return 'bg-blue-50 border-blue-200 text-blue-600';

    if (gradient.includes('blue') || gradient.includes('cyan')) {
      return 'bg-blue-50 border-blue-200 text-blue-600';
    }
    if (gradient.includes('green') || gradient.includes('emerald')) {
      return 'bg-green-50 border-green-200 text-green-600';
    }
    if (gradient.includes('yellow') || gradient.includes('orange')) {
      return 'bg-orange-50 border-orange-200 text-orange-600';
    }
    if (gradient.includes('red') || gradient.includes('pink')) {
      return 'bg-red-50 border-red-200 text-red-600';
    }
    if (gradient.includes('purple') || gradient.includes('indigo')) {
      return 'bg-purple-50 border-purple-200 text-purple-600';
    }
    // 默认
    return 'bg-gray-50 border-gray-200 text-gray-600';
  };

  return (
    <div className="group relative">
      {/* 输入 Handle */}
      {showInputHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-blue-100 hover:!border-blue-400 hover:!scale-110 transition-all duration-150"
          id="in"
        />
      )}

      {/* 主节点容器 */}
      <div className={`
        relative bg-white rounded-lg p-4 min-w-[180px]
        border border-gray-200 shadow-sm
        hover:shadow-md hover:border-gray-300
        transition-all duration-150
      `}>
        {/* 状态指示器 */}
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[status]} border border-white`} />

        {/* 内容区域 */}
        <div className="flex items-start space-x-3">
          {/* 图标区域 */}
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-md
            flex items-center justify-center
            border ${getIconBgClass()}
          `}>
            {icon}
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-gray-500 text-xs mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 子内容 */}
        {children && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {children}
          </div>
        )}
      </div>

      {/* 输出 Handle */}
      {showOutputHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
          id="out"
        />
      )}
    </div>
  );
}