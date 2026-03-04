import { Globe } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { APINodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function APINode(props: NodeProps<APINodeData>) {
  const { data } = props;

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-600';
      case 'POST':
        return 'text-green-600';
      case 'PUT':
        return 'text-amber-600';
      case 'DELETE':
        return 'text-red-600';
      case 'PATCH':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
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
            <span className="text-xs text-gray-500 truncate max-w-[120px]">
              {data.url}
            </span>
          )}
        </span>
      }
      gradient="from-indigo-500 to-purple-600"
    >
      {data.timeout && (
        <div className="text-xs text-gray-600">
          超时: {data.timeout}ms
        </div>
      )}
      {data.outputVariable && (
        <div className="text-xs text-gray-600">
          输出: {data.outputVariable}
        </div>
      )}
    </BaseNode>
  );
}
