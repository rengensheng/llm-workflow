import { Globe } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { APINodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function APINode(props: NodeProps<APINodeData>) {
  const { data } = props;

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-400';
      case 'POST':
        return 'text-green-400';
      case 'PUT':
        return 'text-yellow-400';
      case 'DELETE':
        return 'text-red-400';
      case 'PATCH':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Globe className="w-5 h-5" />}
      title={data.label}
      subtitle={
        <span className="flex items-center gap-1">
          <span className={`font-semibold ${getMethodColor(data.method)}`}>
            {data.method}
          </span>
          {data.url && (
            <span className="text-xs text-gray-400 truncate max-w-[120px]">
              {data.url}
            </span>
          )}
        </span>
      }
      gradient="from-indigo-500 to-purple-600"
    >
      {data.timeout && (
        <div className="text-xs text-gray-400">
          超时: {data.timeout}ms
        </div>
      )}
      {data.outputVariable && (
        <div className="text-xs text-gray-400">
          输出: {data.outputVariable}
        </div>
      )}
    </BaseNode>
  );
}
