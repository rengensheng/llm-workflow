import { FileText } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { PromptTemplateNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function PromptTemplateNode(props: NodeProps<PromptTemplateNodeData>) {
  const { data } = props;

  const variableCount = data.variables?.length || 0;

  return (
    <BaseNode
      {...props}
      icon={<FileText className="w-5 h-5" />}
      title={data.label}
      subtitle={`提示词模板 • ${variableCount} 个变量`}
      gradient="from-violet-500 to-purple-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.template && (
          <div className="bg-violet-50 border border-violet-100 rounded p-2 text-xs text-gray-700 max-h-16 overflow-hidden">
            <div className="line-clamp-3 whitespace-pre-wrap">
              {data.template.substring(0, 100)}
              {data.template.length > 100 && '...'}
            </div>
          </div>
        )}

        {data.variables && data.variables.length > 0 && (
          <div className="space-y-1">
            <div className="text-gray-500">变量:</div>
            <div className="flex flex-wrap gap-1">
              {data.variables.slice(0, 4).map((variable, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-700"
                >
                  {'{'}{variable.name}{'}'}
                </span>
              ))}
              {data.variables.length > 4 && (
                <span className="text-gray-400 text-xs">
                  +{data.variables.length - 4} 更多
                </span>
              )}
            </div>
          </div>
        )}

        {data.outputVariable && (
          <div className="flex justify-between items-center">
            <span>输出:</span>
            <span className="text-purple-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}
      </div>
    </BaseNode>
  );
}