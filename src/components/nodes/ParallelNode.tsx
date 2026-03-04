import { GitFork } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ParallelNodeData } from '../../types/workflow';

export default function ParallelNode({ data }: NodeProps<ParallelNodeData>) {
  const branchCount = data.branches?.length || 0;

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
            flex items-center justify-center text-blue-600
            bg-blue-50 border border-blue-200
          ">
            <GitFork className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              并行执行 • {branchCount} 个分支
            </p>
          </div>
        </div>

        {/* 分支列表 */}
        {data.branches && data.branches.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-1.5">
              {data.branches.map((branch, index) => (
                <div key={branch.id} className="flex items-center text-xs">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: getBranchColor(index) }}
                  />
                  <span className="text-gray-700 truncate">{branch.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 配置 */}
        <div className="mt-2 pt-2 border-t border-gray-50 text-xs text-gray-500 space-y-1">
          <div className="flex justify-between items-center">
            <span>等待模式:</span>
            <span className={data.waitForAll ? 'text-blue-600' : 'text-amber-600'}>
              {data.waitForAll ? '等待全部' : '任一完成'}
            </span>
          </div>
          {data.timeout && (
            <div className="flex justify-between items-center">
              <span>超时:</span>
              <span className="text-gray-600">{data.timeout}ms</span>
            </div>
          )}
        </div>
      </div>

      {/* 输出 Handle - 每个分支一个 */}
      <div className="absolute left-0 right-0 flex justify-around px-2">
        {data.branches?.map((branch, index) => (
          <Handle
            key={branch.id}
            type="source"
            position={Position.Right}
            id={`branch-${branch.id}`}
            className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-blue-100 hover:!border-blue-400 hover:!scale-110 transition-all duration-150"
            style={{ 
              top: `${(index + 1) * (100 / (data.branches!.length + 1))}%`,
              position: 'absolute',
              transform: 'translateY(-50%)'
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function getBranchColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  return colors[index % colors.length];
}