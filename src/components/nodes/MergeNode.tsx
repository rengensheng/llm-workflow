import { GitMerge } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { MergeNodeData } from '../../types/workflow';

export default function MergeNode({ data }: NodeProps<MergeNodeData>) {
  const getMergeStrategyLabel = (strategy: string) => {
    switch (strategy) {
      case 'object':
        return '对象合并';
      case 'array':
        return '数组合并';
      case 'concat':
        return '字符串拼接';
      default:
        return '数据合并';
    }
  };

  const inputCount = data.mergeFields?.length || 2;

  return (
    <div className="group relative">
      {/* 多个输入 Handle */}
      {Array.from({ length: Math.max(inputCount, 2) }).map((_, index) => (
        <Handle
          key={`in-${index}`}
          type="target"
          position={Position.Top}
          className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-blue-100 hover:!border-blue-400 hover:!scale-110 transition-all duration-150"
          id={`in-${index}`}
          style={{ left: `${(index + 1) * (100 / (inputCount + 1))}%` }}
        />
      ))}

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
            flex items-center justify-center text-teal-600
            bg-teal-50 border border-teal-200
          ">
            <GitMerge className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              {getMergeStrategyLabel(data.mergeStrategy)}
            </p>
          </div>
        </div>

        {/* 合并配置内容 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-600 space-y-2">
            <div className="flex justify-between items-center">
              <span>输入数量:</span>
              <span className="text-teal-600">{inputCount} 个</span>
            </div>

            {data.outputVariable && (
              <div className="flex justify-between items-center">
                <span>输出变量:</span>
                <span className="text-blue-600 truncate max-w-[100px]" title={data.outputVariable}>
                  {data.outputVariable}
                </span>
              </div>
            )}

            {data.mergeFields && data.mergeFields.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="text-gray-500">字段映射:</div>
                {data.mergeFields.slice(0, 3).map((field, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <span className="w-2 h-2 rounded-full bg-teal-400 mr-2" />
                    <span className="truncate">{field.fieldName}</span>
                  </div>
                ))}
                {data.mergeFields.length > 3 && (
                  <div className="text-gray-400 text-xs">
                    +{data.mergeFields.length - 3} 更多...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 输出 Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
        id="out"
      />
    </div>
  );
}