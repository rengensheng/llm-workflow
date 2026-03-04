import { ShieldCheck } from 'lucide-react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ValidatorNodeData, ValidatorRule } from '../../types/workflow';

export default function ValidatorNode({ data }: NodeProps<ValidatorNodeData>) {
  const ruleCount = data.rules?.length || 0;

  const getRuleTypeIcon = (type: string) => {
    switch (type) {
      case 'required':
        return '✓';
      case 'type':
        return 'T';
      case 'format':
        return '@';
      case 'range':
        return '#';
      case 'custom':
        return '⚡';
      default:
        return '?';
    }
  };

  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'required':
        return 'bg-red-100 text-red-600';
      case 'type':
        return 'bg-blue-100 text-blue-600';
      case 'format':
        return 'bg-purple-100 text-purple-600';
      case 'range':
        return 'bg-amber-100 text-amber-600';
      case 'custom':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
            flex items-center justify-center text-green-600
            bg-green-50 border border-green-200
          ">
            <ShieldCheck className="w-5 h-5" />
          </div>

          {/* 文本区域 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-sm truncate">
              {data.label}
            </h3>
            <p className="text-gray-500 text-xs mt-1 truncate">
              数据验证 • {ruleCount} 条规则
            </p>
          </div>
        </div>

        {/* 验证规则 */}
        {data.rules && data.rules.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-1.5">
              {data.rules.slice(0, 4).map((rule) => (
                <div key={rule.id} className="flex items-center text-xs">
                  <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center mr-2 ${getRuleTypeColor(rule.ruleType)}`}>
                    {getRuleTypeIcon(rule.ruleType)}
                  </span>
                  <span className="text-gray-700 truncate flex-1" title={rule.field}>
                    {rule.field}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {rule.ruleType === 'required' ? '必填' : rule.ruleType}
                  </span>
                </div>
              ))}
              {data.rules.length > 4 && (
                <div className="text-gray-400 text-xs pl-6">
                  +{data.rules.length - 4} 更多规则...
                </div>
              )}
            </div>
          </div>
        )}

        {/* 配置 */}
        <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between text-xs">
          <span className="text-gray-500">输入:</span>
          <span className="text-gray-700">{data.inputVariable || '未配置'}</span>
        </div>

        {data.stopOnError !== undefined && (
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">错误处理:</span>
            <span className={data.stopOnError ? 'text-red-600' : 'text-amber-600'}>
              {data.stopOnError ? '停止' : '继续'}
            </span>
          </div>
        )}
      </div>

      {/* 验证通过输出 */}
      <Handle
        type="source"
        position={Position.Left}
        id="valid"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-green-100 hover:!border-green-400 hover:!scale-110 transition-all duration-150"
      />

      {/* 验证失败输出 */}
      <Handle
        type="source"
        position={Position.Right}
        id="invalid"
        className="!w-2 !h-2 !rounded-full !border !border-gray-300 !bg-white hover:!bg-red-100 hover:!border-red-400 hover:!scale-110 transition-all duration-150"
      />
    </div>
  );
}