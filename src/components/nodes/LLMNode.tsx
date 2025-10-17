import { Brain } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { LLMNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function LLMNode(props: NodeProps<LLMNodeData>) {
  const { data } = props;
  return (
    <BaseNode
      {...props}
      icon={<Brain className="w-5 h-5" />}
      title={data.label}
      subtitle={`${data.model} • Temp: ${data.temperature}`}
      gradient="from-blue-500 to-cyan-600"
    >
      <div className="text-xs text-gray-400 space-y-1">
        <div className="flex justify-between">
          <span>Tokens:</span>
          <span className="text-cyan-400">{data.maxTokens}</span>
        </div>
        {data.systemPrompt && (
          <div className="truncate" title={data.systemPrompt}>
            System: {data.systemPrompt.substring(0, 30)}...
          </div>
        )}
      </div>
    </BaseNode>
  );
}