import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface BaseNodeProps extends NodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
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
    idle: 'bg-gray-400',
    running: 'bg-yellow-400 animate-pulse',
    success: 'bg-green-400',
    error: 'bg-red-400',
  };

  return (
    <div className="group relative">
      {/* 输入 Handle */}
      {showInputHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-2 !h-2 !rounded-full !border-2 border-white !bg-blue-500 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-200 shadow-lg z-50"
          id="in"
        />
      )}
      
      {/* 主节点容器 */}
      <div className={`
        relative bg-gray-900 rounded-xl p-4 min-w-[180px] 
        border border-gray-700 shadow-2xl
        hover:shadow-blue-500/20 hover:border-blue-400
        transition-all duration-300 transform
        backdrop-blur-sm bg-opacity-90
      `}>
        {/* 状态指示器 */}
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[status]} border-2 border-gray-900`} />
        
        {/* 渐变边框效果 */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-20 blur-sm -z-10`} />
        
        {/* 内容区域 */}
        <div className="flex items-start space-x-3">
          {/* 图标区域 */}
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r ${gradient} 
            flex items-center justify-center text-white shadow-lg
          `}>
            {icon}
          </div>
          
          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-gray-400 text-xs mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* 子内容 */}
        {children && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            {children}
          </div>
        )}
      </div>
      
      {/* 输出 Handle */}
      {showOutputHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-2 !h-2 !rounded-full !border-2 border-white !bg-green-500 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-200 shadow-lg"
          id="out"
        />
      )}
    </div>
  );
}