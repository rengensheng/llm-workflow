import { Wrench } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { ToolNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function ToolNode(props: NodeProps<ToolNodeData>) {
  const { data } = props;
  const getToolTypeLabel = (toolType: string) => {
    switch (toolType) {
      case 'web_search':
        return '网页搜索';
      case 'calculator':
        return '计算器';
      case 'file_reader':
        return '文件读取';
      case 'api_call':
        return 'API 调用';
      default:
        return '工具';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Wrench className="w-5 h-5" />}
      title={data.label}
      subtitle={getToolTypeLabel(data.toolType)}
      gradient="from-green-500 to-emerald-600"
    />
  );
}