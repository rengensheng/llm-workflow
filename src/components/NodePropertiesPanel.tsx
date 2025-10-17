import { X } from 'lucide-react';
import type { WorkflowNode } from '../types/workflow';

interface NodePropertiesPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onClose: () => void;
}

export default function NodePropertiesPanel({
  selectedNode,
  onUpdateNode,
  onClose,
}: NodePropertiesPanelProps) {
  if (!selectedNode) {
    return null;
  }

  const handleLabelChange = (label: string) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, label },
    });
  };

  const handlePropertyChange = (key: string, value: any) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, [key]: value },
    });
  };

  const renderNodeProperties = () => {
    switch (selectedNode.type) {
      case 'llm':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                模型
              </label>
              <select
                value={selectedNode.data.model || 'gpt-4'}
                onChange={(e) => handlePropertyChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude-3</option>
                <option value="gemini-pro">Gemini Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                温度
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedNode.data.temperature || 0.7}
                onChange={(e) => handlePropertyChange('temperature', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {selectedNode.data.temperature || 0.7}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最大令牌数
              </label>
              <input
                type="number"
                value={selectedNode.data.maxTokens || 1000}
                onChange={(e) => handlePropertyChange('maxTokens', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                系统提示
              </label>
              <textarea
                value={selectedNode.data.systemPrompt || ''}
                onChange={(e) => handlePropertyChange('systemPrompt', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入系统提示..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                用户提示
              </label>
              <textarea
                value={selectedNode.data.userPrompt || ''}
                onChange={(e) => handlePropertyChange('userPrompt', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入用户提示..."
              />
            </div>
          </div>
        );

      case 'tool':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工具类型
              </label>
              <select
                value={selectedNode.data.toolType || 'web_search'}
                onChange={(e) => handlePropertyChange('toolType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="web_search">网页搜索</option>
                <option value="calculator">计算器</option>
                <option value="file_reader">文件读取</option>
                <option value="api_call">API 调用</option>
              </select>
            </div>
          </div>
        );

      case 'conditional':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                条件表达式
              </label>
              <input
                type="text"
                value={selectedNode.data.condition || ''}
                onChange={(e) => handlePropertyChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如: input.length > 10"
              />
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输入类型
              </label>
              <select
                value={selectedNode.data.inputType || 'text'}
                onChange={(e) => handlePropertyChange('inputType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">文本</option>
                <option value="file">文件</option>
                <option value="url">URL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                默认值
              </label>
              <input
                type="text"
                value={selectedNode.data.defaultValue || ''}
                onChange={(e) => handlePropertyChange('defaultValue', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入默认值..."
              />
            </div>
          </div>
        );

      case 'output':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输出类型
              </label>
              <select
                value={selectedNode.data.outputType || 'text'}
                onChange={(e) => handlePropertyChange('outputType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">文本</option>
                <option value="file">文件</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-sm">
            该节点类型暂无可配置属性
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">节点属性</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {selectedNode.type.toUpperCase()} 节点
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            节点名称
          </label>
          <input
            type="text"
            value={selectedNode.data.label || ''}
            onChange={(e) => handleLabelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入节点名称..."
          />
        </div>

        {renderNodeProperties()}
      </div>
    </div>
  );
}