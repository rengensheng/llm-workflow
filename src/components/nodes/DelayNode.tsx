import { Clock } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { DelayNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function DelayNode(props: NodeProps<DelayNodeData>) {
  const { data } = props;

  const getDelayTypeLabel = (type: string) => {
    switch (type) {
      case 'fixed':
        return '固定延迟';
      case 'variable':
        return '变量延迟';
      case 'cron':
        return '定时任务';
      default:
        return '延迟';
    }
  };

  const getDelayTypeIcon = (type: string) => {
    switch (type) {
      case 'fixed':
        return '⏱️';
      case 'variable':
        return '🔄';
      case 'cron':
        return '📆';
      default:
        return '⏰';
    }
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小时${minutes}分`;
  };

  return (
    <BaseNode
      {...props}
      icon={<Clock className="w-5 h-5" />}
      title={data.label}
      subtitle={`${getDelayTypeIcon(data.delayType)} ${getDelayTypeLabel(data.delayType)}`}
      gradient="from-slate-500 to-zinc-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.delayType === 'fixed' && data.delaySeconds !== undefined && (
          <div className="bg-slate-50 border border-slate-200 rounded p-2">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-700">
                {formatDuration(data.delaySeconds)}
              </span>
            </div>
          </div>
        )}

        {data.delayType === 'variable' && data.delayVariable && (
          <div className="flex justify-between items-center">
            <span>延迟变量:</span>
            <span className="text-slate-600 truncate max-w-[100px]" title={data.delayVariable}>
              {data.delayVariable}
            </span>
          </div>
        )}

        {data.delayType === 'cron' && data.cronExpression && (
          <div className="bg-slate-50 border border-slate-200 rounded p-2">
            <div className="text-xs text-gray-500 mb-1">Cron 表达式:</div>
            <div className="font-mono text-slate-700 text-sm">{data.cronExpression}</div>
          </div>
        )}
      </div>
    </BaseNode>
  );
}