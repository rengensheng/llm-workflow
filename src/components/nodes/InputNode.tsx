import { Upload } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { InputNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function InputNode(props: NodeProps<InputNodeData>) {
  const { data } = props;
  console.log('data', props)
  const getInputTypeLabel = (inputType: string) => {
    switch (inputType) {
      case 'text':
        return '文本输入';
      case 'file':
        return '文件输入';
      case 'url':
        return 'URL 输入';
      default:
        return '输入';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Upload className="w-5 h-5" />}
      title={data.label}
      subtitle={getInputTypeLabel(data.inputType)}
      gradient="from-yellow-500 to-orange-600"
      showInputHandle={false}
      showOutputHandle={true}
    >
      {data.defaultValue && (
        <div className="text-xs text-gray-400">
          <div className="truncate" title={data.defaultValue}>
            默认值: {data.defaultValue.substring(0, 25)}...
          </div>
        </div>
      )}
    </BaseNode>
  );
}