import { Database } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { MemoryNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function MemoryNode(props: NodeProps<MemoryNodeData>) {
  const { data } = props;

  const getMemoryTypeLabel = (type: string) => {
    switch (type) {
      case 'conversation':
        return '对话记忆';
      case 'vector':
        return '向量记忆';
      case 'summary':
        return '摘要记忆';
      case 'buffer':
        return '缓冲记忆';
      default:
        return '记忆';
    }
  };

  const getMemoryTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return '💬';
      case 'vector':
        return '🔢';
      case 'summary':
        return '📝';
      case 'buffer':
        return '📦';
      default:
        return '🧠';
    }
  };

  const getOperationLabel = (operation: string) => {
    switch (operation) {
      case 'save':
        return '保存';
      case 'retrieve':
        return '检索';
      case 'clear':
        return '清空';
      default:
        return operation;
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'save':
        return 'text-green-600';
      case 'retrieve':
        return 'text-blue-600';
      case 'clear':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Database className="w-5 h-5" />}
      title={data.label}
      subtitle={`${getMemoryTypeIcon(data.memoryType)} ${getMemoryTypeLabel(data.memoryType)}`}
      gradient="from-emerald-500 to-teal-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        <div className="flex justify-between items-center">
          <span>操作:</span>
          <span className={getOperationColor(data.operation)}>
            {getOperationLabel(data.operation)}
          </span>
        </div>

        {data.inputVariable && (
          <div className="flex justify-between items-center">
            <span>输入:</span>
            <span className="text-gray-600 truncate max-w-[100px]" title={data.inputVariable}>
              {data.inputVariable}
            </span>
          </div>
        )}

        {data.outputVariable && (
          <div className="flex justify-between items-center">
            <span>输出:</span>
            <span className="text-teal-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {data.memoryType === 'conversation' && data.maxMessages && (
          <div className="flex justify-between items-center">
            <span>最大消息数:</span>
            <span className="text-gray-600">{data.maxMessages}</span>
          </div>
        )}

        {data.memoryType === 'vector' && data.collectionName && (
          <div className="truncate text-gray-500" title={data.collectionName}>
            集合: {data.collectionName}
          </div>
        )}

        {data.memoryType === 'summary' && data.summaryModel && (
          <div className="truncate text-gray-500" title={data.summaryModel}>
            摘要模型: {data.summaryModel}
          </div>
        )}
      </div>
    </BaseNode>
  );
}