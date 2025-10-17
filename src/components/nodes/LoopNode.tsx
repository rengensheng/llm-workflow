import { Repeat } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { LoopNodeData } from '../../types/workflow';

export default function LoopNode({ data }: NodeProps<LoopNodeData>) {
  return (
    <div className="group relative">
      {/* 输入 Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !rounded-full !border-2 border-white !bg-blue-500 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-200 shadow-lg z-50"
        id="in"
      />
      
      {/* 主节点容器 */}
      <div className="
        relative bg-gray-900 rounded-xl p-4 min-w-[180px] 
        border border-gray-700 shadow-2xl
        hover:shadow-orange-500/20 hover:border-orange-400
        transition-all duration-300 transform
        backdrop-blur-sm bg-opacity-90
      ">
        {/* 渐变边框效果 */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 opacity-20 blur-sm -z-10" />
        
        {/* 内容区域 */}
        <div className="flex items-start space-x-3">
          {/* 图标区域 */}
          <div className="
            flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 
            flex items-center justify-center text-white shadow-lg
          ">
            <Repeat className="w-5 h-5" />
          </div>
          
          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-400 text-xs mt-1 truncate">
              循环节点
            </p>
          </div>
        </div>
        
        {/* 循环配置内容 */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>类型:</span>
              <span className="text-white">{data.loopType === 'count' ? '计数循环' : '条件循环'}</span>
            </div>
            {data.loopType === 'count' && data.maxIterations && (
              <div className="flex justify-between">
                <span>次数:</span>
                <span className="text-white">{data.maxIterations}</span>
              </div>
            )}
            {data.loopType === 'condition' && data.condition && (
              <div className="truncate" title={data.condition}>
                条件: {data.condition.substring(0, 25)}...
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 输出 Handle - 两个输出：循环体和循环结束 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pb-1">
        <Handle
          type="source"
          position={Position.Left}
          id="body"
          className="!w-2 !h-2 !rounded-full !border-2 border-white !bg-orange-500 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-200 shadow-lg"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="exit"
          className="!w-2 !h-2 !rounded-full !border-2 border-white !bg-green-500 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-200 shadow-lg"
        />
      </div>
    </div>
  );
}