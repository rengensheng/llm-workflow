import { Library } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { RAGNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function RAGNode(props: NodeProps<RAGNodeData>) {
  const { data } = props;

  return (
    <BaseNode
      {...props}
      icon={<Library className="w-5 h-5" />}
      title={data.label}
      subtitle="检索增强生成"
      gradient="from-sky-500 to-cyan-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.knowledgeBaseName ? (
          <div className="flex justify-between items-center">
            <span>知识库:</span>
            <span className="text-sky-600 truncate max-w-[120px]" title={data.knowledgeBaseName}>
              {data.knowledgeBaseName}
            </span>
          </div>
        ) : (
          <div className="text-gray-400 text-xs">未选择知识库</div>
        )}

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
            <span className="text-cyan-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {(data.topK || data.scoreThreshold) && (
          <div className="flex justify-between items-center">
            <span>检索:</span>
            <span className="text-gray-600">
              Top-{data.topK || 5}
              {data.scoreThreshold && ` @ ${(data.scoreThreshold * 100).toFixed(0)}%`}
            </span>
          </div>
        )}

        {data.embeddingModel && (
          <div className="truncate text-gray-500" title={data.embeddingModel}>
            向量模型: {data.embeddingModel}
          </div>
        )}

        {data.includeSource && (
          <div className="flex items-center text-xs text-green-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1" />
            包含来源信息
          </div>
        )}
      </div>
    </BaseNode>
  );
}