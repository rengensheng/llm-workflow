import { Webhook } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { WebhookNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function WebhookNode(props: NodeProps<WebhookNodeData>) {
  const { data } = props;

  const getWebhookTypeLabel = (type: string) => {
    return type === 'trigger' ? '触发器' : '响应';
  };

  const getMethodColor = (method?: string) => {
    switch (method) {
      case 'GET':
        return 'text-blue-600';
      case 'POST':
        return 'text-green-600';
      case 'PUT':
        return 'text-amber-600';
      case 'DELETE':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const isTrigger = data.webhookType === 'trigger';

  return (
    <BaseNode
      {...props}
      icon={<Webhook className="w-5 h-5" />}
      title={data.label}
      subtitle={getWebhookTypeLabel(data.webhookType)}
      gradient="from-fuchsia-500 to-pink-600"
      showInputHandle={!isTrigger}
      showOutputHandle={isTrigger}
    >
      <div className="text-xs text-gray-600 space-y-2">
        {isTrigger ? (
          <>
            {data.path && (
              <div className="flex justify-between items-center">
                <span>路径:</span>
                <span className="text-fuchsia-600 font-mono text-xs bg-fuchsia-50 px-1 rounded truncate max-w-[120px]">
                  {data.path}
                </span>
              </div>
            )}
            {data.method && (
              <div className="flex justify-between items-center">
                <span>方法:</span>
                <span className={`font-semibold ${getMethodColor(data.method)}`}>
                  {data.method}
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
          </>
        ) : (
          <>
            {data.statusCode && (
              <div className="flex justify-between items-center">
                <span>状态码:</span>
                <span className={`${data.statusCode < 400 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.statusCode}
                </span>
              </div>
            )}
            {data.responseBody && (
              <div className="truncate text-gray-500" title={data.responseBody}>
                响应: {data.responseBody.substring(0, 25)}...
              </div>
            )}
          </>
        )}
      </div>
    </BaseNode>
  );
}