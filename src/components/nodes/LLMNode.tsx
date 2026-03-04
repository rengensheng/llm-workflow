import { Brain } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { LLMNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function LLMNode(props: NodeProps<LLMNodeData>) {
  const { data } = props;
  
  const getOutputFormatIcon = (format: string) => {
    switch (format) {
      case 'json':
        return '📊';
      default:
        return '📝';
    }
  };

  const enabledToolsCount = data.tools?.filter(tool => tool.enabled).length || 0;

  return (
    <BaseNode
      {...props}
      icon={<Brain className="w-5 h-5" />}
      title={data.label}
      subtitle={`${data.model} • ${getOutputFormatIcon(data.outputFormat)}${data.outputFormat}`}
      gradient="from-blue-500 to-cyan-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        <div className="flex justify-between items-center">
          <span>温度:</span>
          <span className="text-blue-600">{data.temperature}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>最大令牌:</span>
          <span className="text-blue-600">{data.maxTokens}</span>
        </div>

        {data.enableToolCalls && enabledToolsCount > 0 && (
          <div className="flex justify-between items-center">
            <span>工具调用:</span>
            <span className="text-green-600">{enabledToolsCount} 个工具</span>
          </div>
        )}

        {data.systemPrompt && (
          <div className="truncate" title={data.systemPrompt}>
            系统提示: {data.systemPrompt.substring(0, 25)}...
          </div>
        )}
      </div>
    </BaseNode>
  );
}