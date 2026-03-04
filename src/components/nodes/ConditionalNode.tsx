import { GitBranch } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ConditionalNodeData } from '../../types/workflow';

export default function ConditionalNode({ data }: NodeProps<ConditionalNodeData>) {
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
            flex items-center justify-center text-purple-600
            bg-purple-50 border border-purple-200
          ">
            <GitBranch className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              条件分支
            </p>
          </div>
        </div>

        {/* 条件内容 */}
        {data.condition && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-600">
              <div className="truncate" title={data.condition}>
                条件: {data.condition.substring(0, 30)}...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输出 Handle - 左右两个 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pb-1">
        <Handle
          type="source"
          position={Position.Left}
          id="true"
          className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-red-100 hover:!border-red-400 hover:!scale-110 transition-all duration-150"
        />
      </div>
    </div>
  );
}