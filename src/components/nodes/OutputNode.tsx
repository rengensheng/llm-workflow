import { Download } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { OutputNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function OutputNode(props: NodeProps<OutputNodeData>) {
  const { data } = props;
  const getOutputTypeLabel = (outputType: string) => {
    switch (outputType) {
      case 'text':
        return '文本输出';
      case 'file':
        return '文件输出';
      case 'json':
        return 'JSON 输出';
      default:
        return '输出';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Download className="w-5 h-5" />}
      title={data.label}
      subtitle={getOutputTypeLabel(data.outputType)}
      gradient="from-red-500 to-pink-600"
      showInputHandle={true}
      showOutputHandle={false}
    />
  );
}