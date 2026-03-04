import { FolderOpen } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { FileSystemNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function FileSystemNode(props: NodeProps<FileSystemNodeData>) {
  const { data } = props;

  const getOperationLabel = (operation: string) => {
    switch (operation) {
      case 'read':
        return '读取文件';
      case 'write':
        return '写入文件';
      case 'delete':
        return '删除文件';
      case 'list':
        return '列出目录';
      case 'append':
        return '追加内容';
      default:
        return '文件操作';
    }
  };

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'read':
        return '📖';
      case 'write':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'list':
        return '📋';
      case 'append':
        return '➕';
      default:
        return '📁';
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'read':
        return 'text-blue-600';
      case 'write':
        return 'text-green-600';
      case 'delete':
        return 'text-red-600';
      case 'list':
        return 'text-amber-600';
      case 'append':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<FolderOpen className="w-5 h-5" />}
      title={data.label}
      subtitle={`${getOperationIcon(data.operation)} ${getOperationLabel(data.operation)}`}
      gradient="from-amber-500 to-orange-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.filePath && (
          <div className="flex justify-between items-center">
            <span>路径:</span>
            <span className={getOperationColor(data.operation) + ' truncate max-w-[100px]'} title={data.filePath}>
              {data.filePath}
            </span>
          </div>
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
            <span className="text-orange-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {data.encoding && data.encoding !== 'utf-8' && (
          <div className="flex justify-between items-center">
            <span>编码:</span>
            <span className="text-gray-500">{data.encoding}</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
}