import { Binary } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { EmbeddingNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function EmbeddingNode(props: NodeProps<EmbeddingNodeData>) {
  const { data } = props;

  const getModelLabel = (model: string) => {
    if (model.includes('ada')) return 'OpenAI Ada';
    if (model.includes('bge')) return 'BGE';
    if (model.includes('bert')) return 'BERT';
    return model || '未选择模型';
  };

  return (
    <BaseNode
      {...props}
      icon={<Binary className="w-5 h-5" />}
      title={data.label}
      subtitle="向量嵌入"
      gradient="from-indigo-500 to-violet-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        <div className="flex justify-between items-center">
          <span>模型:</span>
          <span className="text-indigo-600 truncate max-w-[120px]" title={data.model}>
            {getModelLabel(data.model)}
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
            <span className="text-violet-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>维度:</span>
          <span className="text-gray-600">{data.dimensions || 1536}D</span>
        </div>

        {data.batchSize && (
          <div className="flex justify-between items-center">
            <span>批大小:</span>
            <span className="text-gray-600">{data.batchSize}</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
}