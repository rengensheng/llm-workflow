import { Filter } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { FilterNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function FilterNode(props: NodeProps<FilterNodeData>) {
  const { data } = props;

  const getFilterTypeLabel = (type: string) => {
    switch (type) {
      case 'condition':
        return '条件过滤';
      case 'jsonPath':
        return 'JSONPath 过滤';
      case 'expression':
        return '表达式过滤';
      default:
        return '数据过滤';
    }
  };

  const getFilterTypeIcon = (type: string) => {
    switch (type) {
      case 'condition':
        return '🔀';
      case 'jsonPath':
        return '🔍';
      case 'expression':
        return '📐';
      default:
        return '🔽';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Filter className="w-5 h-5" />}
      title={data.label}
      subtitle={`${getFilterTypeIcon(data.filterType)} ${getFilterTypeLabel(data.filterType)}`}
      gradient="from-rose-500 to-pink-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.inputVariable && (
          <div className="flex justify-between items-center">
            <span>输入:</span>
            <span className="text-rose-600 truncate max-w-[100px]" title={data.inputVariable}>
              {data.inputVariable}
            </span>
          </div>
        )}

        {data.outputVariable && (
          <div className="flex justify-between items-center">
            <span>输出:</span>
            <span className="text-pink-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {data.filterType === 'condition' && data.condition && (
          <div className="truncate text-gray-500" title={data.condition}>
            条件: {data.condition.substring(0, 25)}...
          </div>
        )}

        {data.filterType === 'jsonPath' && data.jsonPath && (
          <div className="truncate text-gray-500" title={data.jsonPath}>
            路径: {data.jsonPath}
          </div>
        )}

        {data.filterType === 'expression' && data.expression && (
          <div className="truncate text-gray-500" title={data.expression}>
            表达式: {data.expression.substring(0, 20)}...
          </div>
        )}
      </div>
    </BaseNode>
  );
}