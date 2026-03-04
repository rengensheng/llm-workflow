import { Split } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { SplitNodeData } from '../../types/workflow';

export default function SplitNode({ data }: NodeProps<SplitNodeData>) {
  const getSplitTypeLabel = (type: string) => {
    switch (type) {
      case 'delimiter':
        return '分隔符分割';
      case 'regex':
        return '正则分割';
      case 'lines':
        return '按行分割';
      case 'chunks':
        return '分块分割';
      default:
        return '数据拆分';
    }
  };

  return (
    <div className="group relative">
      {/* 输入 Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-blue-100 hover:!border-blue-400 hover:!scale-110 transition-all duration-150"
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
            flex items-center justify-center text-amber-600
            bg-amber-50 border border-amber-200
          ">
            <Split className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              {getSplitTypeLabel(data.splitType)}
            </p>
          </div>
        </div>

        {/* 分割配置内容 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-600 space-y-2">
            {data.inputVariable && (
              <div className="flex justify-between items-center">
                <span>输入变量:</span>
                <span className="text-amber-600 truncate max-w-[100px]" title={data.inputVariable}>
                  {data.inputVariable}
                </span>
              </div>
            )}

            {data.outputVariable && (
              <div className="flex justify-between items-center">
                <span>输出变量:</span>
                <span className="text-blue-600 truncate max-w-[100px]" title={data.outputVariable}>
                  {data.outputVariable}
                </span>
              </div>
            )}

            {data.splitType === 'delimiter' && data.delimiter && (
              <div className="flex justify-between items-center">
                <span>分隔符:</span>
                <span className="text-gray-800 font-mono bg-gray-100 px-1 rounded">
                  {data.delimiter === '\n' ? '\\n' : data.delimiter}
                </span>
              </div>
            )}

            {data.splitType === 'regex' && data.regex && (
              <div className="truncate text-gray-500" title={data.regex}>
                正则: {data.regex.substring(0, 20)}...
              </div>
            )}

            {data.splitType === 'chunks' && data.chunkSize && (
              <div className="flex justify-between items-center">
                <span>块大小:</span>
                <span className="text-amber-600">{data.chunkSize} 字符</span>
              </div>
            )}

            {data.maxItems && (
              <div className="flex justify-between items-center">
                <span>最大项数:</span>
                <span className="text-gray-600">{data.maxItems}</span>
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