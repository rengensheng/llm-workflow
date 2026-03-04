import { Database } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { DatabaseNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function DatabaseNode(props: NodeProps<DatabaseNodeData>) {
  const { data } = props;

  const getDbTypeLabel = (type: string) => {
    switch (type) {
      case 'mysql':
        return 'MySQL';
      case 'postgresql':
        return 'PostgreSQL';
      case 'mongodb':
        return 'MongoDB';
      case 'redis':
        return 'Redis';
      case 'sqlite':
        return 'SQLite';
      default:
        return type || '数据库';
    }
  };

  const getDbTypeColor = (type: string) => {
    switch (type) {
      case 'mysql':
        return 'text-blue-600';
      case 'postgresql':
        return 'text-indigo-600';
      case 'mongodb':
        return 'text-green-600';
      case 'redis':
        return 'text-red-600';
      case 'sqlite':
        return 'text-cyan-600';
      default:
        return 'text-gray-600';
    }
  };

  const getOperationLabel = (operation: string) => {
    switch (operation) {
      case 'query':
        return '查询';
      case 'insert':
        return '插入';
      case 'update':
        return '更新';
      case 'delete':
        return '删除';
      default:
        return operation;
    }
  };

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'query':
        return '🔍';
      case 'insert':
        return '➕';
      case 'update':
        return '✏️';
      case 'delete':
        return '🗑️';
      default:
        return '⚙️';
    }
  };

  return (
    <BaseNode
      {...props}
      icon={<Database className="w-5 h-5" />}
      title={data.label}
      subtitle={
        <span className="flex items-center gap-1">
          <span className={getDbTypeColor(data.databaseType)}>
            {getDbTypeLabel(data.databaseType)}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span>{getOperationIcon(data.operation)} {getOperationLabel(data.operation)}</span>
        </span>
      }
      gradient="from-slate-500 to-gray-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.query && (
          <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-gray-700 font-mono max-h-12 overflow-hidden">
            {data.query.substring(0, 50)}
            {data.query.length > 50 && '...'}
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
            <span className="text-gray-600 truncate max-w-[100px]" title={data.outputVariable}>
              {data.outputVariable}
            </span>
          </div>
        )}

        {!data.connectionString && (
          <div className="text-amber-500 text-xs flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1" />
            未配置连接
          </div>
        )}
      </div>
    </BaseNode>
  );
}