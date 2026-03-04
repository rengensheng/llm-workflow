import { RefreshCw } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { RetryNodeData } from '../../types/workflow';

export default function RetryNode({ data }: NodeProps<RetryNodeData>) {
  const getBackoffLabel = (type?: string) => {
    switch (type) {
      case 'fixed':
        return '固定间隔';
      case 'linear':
        return '线性退避';
      case 'exponential':
        return '指数退避';
      default:
        return '固定间隔';
    }
  };

  const getRetryOnLabel = (types?: string[]) => {
    if (!types || types.length === 0) return '所有错误';
    if (types.length === 3) return '所有错误';
    return types.map(t => {
      switch (t) {
        case 'timeout': return '超时';
        case 'network': return '网络错误';
        case 'custom': return '自定义';
        default: return t;
      }
    }).join(', ');
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
            flex items-center justify-center text-orange-600
            bg-orange-50 border border-orange-200
          ">
            <RefreshCw className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              重试机制
            </p>
          </div>
        </div>

        {/* 重试配置 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-600 space-y-2">
            {/* 最大重试次数 */}
            <div className="flex justify-between items-center">
              <span>最大重试:</span>
              <div className="flex items-center">
                <span className="text-orange-600 font-semibold text-sm mr-1">
                  {data.maxRetries}
                </span>
                <span className="text-gray-400">次</span>
              </div>
            </div>

            {/* 重试间隔 */}
            {data.retryInterval && (
              <div className="flex justify-between items-center">
                <span>初始间隔:</span>
                <span className="text-gray-600">{data.retryInterval}ms</span>
              </div>
            )}

            {/* 退避策略 */}
            <div className="flex justify-between items-center">
              <span>退避策略:</span>
              <span className="text-orange-600">{getBackoffLabel(data.backoffType)}</span>
            </div>

            {/* 退避倍数 */}
            {data.backoffType === 'exponential' && data.backoffMultiplier && (
              <div className="flex justify-between items-center">
                <span>退避倍数:</span>
                <span className="text-gray-600">{data.backoffMultiplier}x</span>
              </div>
            )}

            {/* 重试条件 */}
            {data.retryOn && (
              <div className="mt-2 pt-2 border-t border-gray-50">
                <div className="text-gray-500 mb-1">重试条件:</div>
                <div className="text-gray-700">{getRetryOnLabel(data.retryOn)}</div>
              </div>
            )}

            {/* 自定义条件 */}
            {data.customCondition && (
              <div className="truncate text-gray-500" title={data.customCondition}>
                自定义: {data.customCondition.substring(0, 20)}...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 成功输出 Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="success"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
        style={{ left: '30%' } as React.CSSProperties}
      />

      {/* 失败输出 Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="failure"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-red-100 hover:!border-red-400 hover:!scale-110 transition-all duration-150"
        style={{ left: '70%' } as React.CSSProperties}
      />
    </div>
  );
}