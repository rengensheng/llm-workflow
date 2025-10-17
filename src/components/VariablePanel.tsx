import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { WorkflowVariable } from '../types/workflow';

interface VariablePanelProps {
  variables: WorkflowVariable[];
  isOpen: boolean;
  onClose: () => void;
  onCreateVariable: (variable: Omit<WorkflowVariable, 'id'>) => string;
  onUpdateVariable: (variableId: string, updates: Partial<WorkflowVariable>) => void;
  onDeleteVariable: (variableId: string) => void;
}

export default function VariablePanel({
  variables,
  isOpen,
  onClose,
  onCreateVariable,
  onDeleteVariable,
}: VariablePanelProps) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [newVariable, setNewVariable] = React.useState<Omit<WorkflowVariable, 'id'>>({
    name: '',
    type: 'string',
    description: '',
  });

  const handleCreate = () => {
    if (newVariable.name.trim()) {
      onCreateVariable(newVariable);
      setNewVariable({
        name: '',
        type: 'string',
        description: '',
      });
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">变量管理</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          管理工作流中的变量
        </div>
      </div>

      <div className="p-4">
        {/* 创建新变量 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">变量列表</h4>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus className="w-3 h-3" />
              <span>新建</span>
            </button>
          </div>

          {isCreating && (
            <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="变量名"
                  value={newVariable.name}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <select
                  value={newVariable.type}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="string">字符串</option>
                  <option value="number">数字</option>
                  <option value="boolean">布尔值</option>
                  <option value="array">数组</option>
                  <option value="object">对象</option>
                </select>
                <input
                  type="text"
                  placeholder="描述（可选）"
                  value={newVariable.description || ''}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleCreate}
                    className="flex-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    创建
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 变量列表 */}
        <div className="space-y-3">
          {variables.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">
              暂无变量
            </div>
          ) : (
            variables.map((variable) => (
              <div
                key={variable.id}
                className="p-3 border border-gray-200 rounded bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-blue-600 bg-blue-100 px-1 rounded">
                        {variable.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize px-1 bg-gray-100 rounded">
                        {variable.type}
                      </span>
                    </div>
                    {variable.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {variable.description}
                      </p>
                    )}
                    {variable.nodeId && (
                      <p className="text-xs text-gray-500 mt-1">
                        由节点创建
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteVariable(variable.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}