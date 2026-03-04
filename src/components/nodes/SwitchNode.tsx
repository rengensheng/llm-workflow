import { GitBranch } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { SwitchNodeData } from '../../types/workflow';

export default function SwitchNode({ data }: NodeProps<SwitchNodeData>) {
  const caseCount = data.cases?.length || 0;

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
              多分支选择 • {caseCount} 个分支
            </p>
          </div>
        </div>

        {/* 分支内容 */}
        {data.cases && data.cases.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-1.5">
              {data.cases.slice(0, 4).map((switchCase, index) => (
                <div key={switchCase.id} className="flex items-center text-xs">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: switchCase.color || getCaseColor(index) }}
                  />
                  <span className="text-gray-700 truncate flex-1" title={switchCase.label}>
                    {switchCase.label}
                  </span>
                </div>
              ))}
              {data.cases.length > 4 && (
                <div className="text-gray-400 text-xs pl-4">
                  +{data.cases.length - 4} 更多分支...
                </div>
              )}
              {data.defaultCase && (
                <div className="flex items-center text-xs text-gray-400 pt-1 border-t border-gray-50 mt-1">
                  <span className="w-2 h-2 rounded-full mr-2 bg-gray-300" />
                  默认分支
                </div>
              )}
            </div>
          </div>
        )}

        {data.inputVariable && (
          <div className="mt-2 text-xs text-gray-500">
            输入变量: {data.inputVariable}
          </div>
        )}
      </div>

      {/* 输出 Handle - 每个分支一个 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around px-2 pb-1">
        {data.cases?.slice(0, 5).map((switchCase, index) => (
          <Handle
            key={switchCase.id}
            type="source"
            position={Position.Bottom}
            id={`case-${switchCase.id}`}
            className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-purple-100 hover:!border-purple-400 hover:!scale-110 transition-all duration-150"
            style={{ 
              left: `${(index + 1) * (100 / (Math.min(data.cases.length, 5) + 1))}%`,
              position: 'absolute',
              transform: 'translateX(-50%)'
            } as React.CSSProperties}
          />
        ))}
        {data.defaultCase && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="default"
            className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-gray-100 hover:!border-gray-400 hover:!scale-110 transition-all duration-150"
            style={{ 
              right: '10%'
            } as React.CSSProperties}
          />
        )}
      </div>
    </div>
  );
}

function getCaseColor(index: number): string {
  const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  return colors[index % colors.length];
}