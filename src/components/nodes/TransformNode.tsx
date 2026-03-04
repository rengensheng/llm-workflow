import { Shuffle } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { TransformNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function TransformNode(props: NodeProps<TransformNodeData>) {
  const { data } = props;

  const getTransformTypeLabel = (type: string) => {
    switch (type) {
      case 'jsonPath':
        return 'JSONPath 提取';
      case 'template':
        return '模板转换';
      case 'expression':
        return '表达式计算';
      case 'mapping':
        return '字段映射';
      default:
        return '数据转换';
    }
  };

  const getTransformTypeIcon = (type: string) => {
    switch (type) {
      case 'jsonPath':
        return '🔍';
      case 'template':
        return '📝';
      case 'expression':
        return '🔢';
      case 'mapping':
        return '🗺️';
      default:
        return '🔄';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Shuffle className="w-5 h-5" />}
      title={data.label}
      subtitle={`${getTransformTypeIcon(data.transformType)} ${getTransformTypeLabel(data.transformType)}`}
      gradient="from-cyan-500 to-blue-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.inputVariable && (
          <div className="flex justify-between items-center">
            <span>输入:</span>
            <span className="text-cyan-600 truncate max-w-[100px]" title={data.inputVariable}>
              {data.inputVariable}
            </span>
          </div>
        )}

        {data.outputVariable && (
          <div className="flex justify-between items-center">
            <span>输出:</span>
            <span className="text-blue-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {data.transformType === 'jsonPath' && data.jsonPath && (
          <div className="truncate text-gray-500" title={data.jsonPath}>
            路径: {data.jsonPath}
          </div>
        )}

        {data.transformType === 'template' && data.template && (
          <div className="truncate text-gray-500" title={data.template}>
            模板: {data.template.substring(0, 20)}...
          </div>
        )}

        {data.transformType === 'expression' && data.expression && (
          <div className="truncate text-gray-500" title={data.expression}>
            表达式: {data.expression.substring(0, 20)}...
          </div>
        )}

        {data.transformType === 'mapping' && data.mappings && (
          <div className="flex justify-between items-center">
            <span>映射数:</span>
            <span className="text-purple-600">{data.mappings.length} 个字段</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
}