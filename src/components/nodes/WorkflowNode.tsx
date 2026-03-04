import { Workflow } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function WorkflowNode(props: NodeProps<WorkflowNodeData>) {
  const { data } = props;

  const inputCount = data.inputMappings ? Object.keys(data.inputMappings).length : 0;
  const outputCount = data.outputMappings ? Object.keys(data.outputMappings).length : 0;

  return (
    <BaseNode
      {...props}
      icon={<Workflow className="w-5 h-5" />}
      title={data.label}
      subtitle={data.workflowName || '未选择工作流'}
      gradient="from-purple-500 to-pink-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.description && (
          <div className="truncate" title={data.description}>
            {data.description}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>输入映射:</span>
          <span className="text-purple-600">{inputCount} 个变量</span>
        </div>

        <div className="flex justify-between items-center">
          <span>输出映射:</span>
          <span className="text-pink-600">{outputCount} 个变量</span>
        </div>
      </div>
    </BaseNode>
  );
}
