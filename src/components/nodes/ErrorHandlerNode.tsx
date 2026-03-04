import { AlertTriangle } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ErrorHandlerNodeData } from '../../types/workflow';

export default function ErrorHandlerNode({ data }: NodeProps<ErrorHandlerNodeData>) {
  const getActionLabel = (action: string) => {
    switch (action) {
      case 'continue':
        return '继续执行';
      case 'retry':
        return '重试';
      case 'fallback':
        return '使用回退值';
      case 'abort':
        return '中止流程';
      default:
        return action;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'continue':
        return '▶️';
      case 'retry':
        return '🔄';
      case 'fallback':
        return '🔀';
      case 'abort':
        return '⏹️';
      default:
        return '⚠️';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'continue':
        return 'text-green-600';
      case 'retry':
        return 'text-amber-600';
      case 'fallback':
        return 'text-blue-600';
      case 'abort':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getErrorTypeLabel = (type: string) => {
    switch (type) {
      case 'timeout':
        return '超时';
      case 'network':
        return '网络错误';
      case 'validation':
        return '验证错误';
      case 'custom':
        return '自定义';
      default:
        return type;
    }
  };

  return (
    <div className="group relative">
      {/* 输入 Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-blue-100 hover:!border-blue-400 hover:!scale-110 transition-all duration-150 z-50"
        id="in"
      />

      {/* 主节点容器 */}
      <div className="
        relative bg-white rounded-lg p-4 min-w-[180px]
        border border-gray-200 shadow-sm
        hover:shadow-md hover:border-gray-300
        transition-all duration-150
      ">
        {/* 内容区域 */}
        <div className="flex items-start space-x-3">
          {/* 图标区域 */}
          <div className="
            flex-shrink-0 w-10 h-10 rounded-md
            flex items-center justify-center text-red-600
            bg-red-50 border border-red-200
          ">
            <AlertTriangle className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              错误处理
            </p>
          </div>
        </div>

        {/* 错误类型 */}
        {data.errorTypes && data.errorTypes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1">捕获错误类型:</div>
            <div className="flex flex-wrap gap-1">
              {data.errorTypes.map((type, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-red-50 text-red-600"
                >
                  {getErrorTypeLabel(type)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 处理方式 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">处理方式:</span>
            <span className={`font-medium ${getActionColor(data.action)}`}>
              {getActionIcon(data.action)} {getActionLabel(data.action)}
            </span>
          </div>
        </div>

        {/* 回退值 */}
        {data.action === 'fallback' && (data.fallbackValue || data.fallbackVariable) && (
          <div className="mt-2 text-xs">
            <div className="text-gray-500">回退值:</div>
            <div className="text-gray-700 mt-1 bg-blue-50 border border-blue-100 rounded p-1 truncate">
              {data.fallbackVariable || data.fallbackValue}
            </div>
          </div>
        )}

        {/* 自定义错误模式 */}
        {data.customErrorPattern && (
          <div className="mt-2 text-xs">
            <div className="text-gray-500">自定义模式:</div>
            <div className="text-gray-700 font-mono mt-1 truncate">
              {data.customErrorPattern}
            </div>
          </div>
        )}

        {/* 错误变量输出 */}
        {data.errorVariable && (
          <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between text-xs">
            <span className="text-gray-500">错误变量:</span>
            <span className="text-red-600">{data.errorVariable}</span>
          </div>
        )}
      </div>

      {/* 正常输出 Handle */}
      <Handle
        type="source"
        position={Position.Left}
        id="success"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
      />

      {/* 错误输出 Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="error"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-red-100 hover:!border-red-400 hover:!scale-110 transition-all duration-150"
      />
    </div>
  );
}