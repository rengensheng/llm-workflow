import { ScrollText } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { LoggerNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function LoggerNode(props: NodeProps<LoggerNodeData>) {
  const { data } = props;

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'debug':
        return 'text-gray-600 bg-gray-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      case 'warn':
        return 'text-amber-600 bg-amber-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'debug':
        return '🐛';
      case 'info':
        return 'ℹ️';
      case 'warn':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📝';
    }
  };

  const getLogToLabel = (logTo: string) => {
    switch (logTo) {
      case 'console':
        return '控制台';
      case 'file':
        return '文件';
      case 'variable':
        return '变量';
      default:
        return logTo;
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<ScrollText className="w-5 h-5" />}
      title={data.label}
      subtitle="日志记录"
      gradient="from-gray-500 to-slate-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {/* 日志级别 */}
        <div className="flex justify-between items-center">
          <span>级别:</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLogLevelColor(data.logLevel)}`}>
            {getLogLevelIcon(data.logLevel)} {data.logLevel.toUpperCase()}
          </span>
        </div>

        {/* 输入变量 */}
        {data.inputVariable && (
          <div className="flex justify-between items-center">
            <span>记录内容:</span>
            <span className="text-gray-600 truncate max-w-[100px]" title={data.inputVariable}>
              {data.inputVariable}
            </span>
          </div>
        )}

        {/* 输出目标 */}
        {data.logTo && data.logTo.length > 0 && (
          <div className="mt-2">
            <div className="text-gray-500 mb-1">输出到:</div>
            <div className="flex flex-wrap gap-1">
              {data.logTo.map((target, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                >
                  {getLogToLabel(target)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 输出变量 */}
        {data.outputVariable && (
          <div className="flex justify-between items-center">
            <span>输出变量:</span>
            <span className="text-blue-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {/* 格式配置 */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-gray-400">格式:</span>
          <span className="text-gray-500">
            {data.format === 'json' ? 'JSON' : '文本'}
            {data.includeTimestamp && ' + 时间戳'}
          </span>
        </div>
      </div>
    </BaseNode>
  );
}