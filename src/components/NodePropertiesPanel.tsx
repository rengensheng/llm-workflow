import { X } from 'lucide-react';
import { Input, Select, Switch, Textarea } from './ui';
import type { WorkflowNode } from '../types/workflow';
import JsonSchemaConfig from './JsonSchemaConfig';

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
            <Select
              label="模型"
              value={selectedNode.data.model || 'gpt-4'}
              onChange={(value) => handlePropertyChange('model', value)}
              options={[
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                { value: 'claude-3', label: 'Claude-3' },
                { value: 'gemini-pro', label: 'Gemini Pro' },
                { value: 'qwen', label: 'Qwen' },
                { value: 'ernie', label: '文心一言' },
              ]}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  温度: {selectedNode.data.temperature || 0.7}
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
              </div>

              <Input
                label="最大令牌数"
                type="number"
                value={selectedNode.data.maxTokens || 1000}
                onChange={(value) => handlePropertyChange('maxTokens', parseInt(value))}
              />
            </div>

            {/* 输出格式配置 */}
            <Select
              label="输出格式"
              value={selectedNode.data.outputFormat || 'text'}
              onChange={(value) => handlePropertyChange('outputFormat', value)}
              options={[
                { value: 'text', label: '文本' },
                { value: 'json', label: 'JSON' },
              ]}
            />

            {selectedNode.data.outputFormat === 'json' && (
              <JsonSchemaConfig config={{
                title: selectedNode.data.jsonSchema?.title || '',
                description: selectedNode.data.jsonSchema?.description || '',
                fields: selectedNode.data.jsonSchema?.fields || [],
              }} onChange={() => {}} />
            )}

            {/* 工具调用配置 */}
            <div className="border-t pt-4">
              <Switch
                checked={selectedNode.data.enableToolCalls || false}
                onChange={(checked) => handlePropertyChange('enableToolCalls', checked)}
                label="工具调用"
                description="启用工具调用功能"
              />

              {selectedNode.data.enableToolCalls && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-2">
                    可用的工具:
                  </div>
                  
                  {/* 预设工具 */}
                  {[
                    { name: 'web_search', description: '网页搜索', enabled: false },
                    { name: 'calculator', description: '计算器', enabled: false },
                    { name: 'file_reader', description: '文件读取', enabled: false },
                    { name: 'api_call', description: 'API 调用', enabled: false },
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 border border-gray-200 rounded">
                      <input
                        type="checkbox"
                        checked={selectedNode.data.tools?.some((t: any) => t.name === tool.name && t.enabled) || false}
                        onChange={(e) => {
                          const currentTools = selectedNode.data.tools || [];
                          const updatedTools = e.target.checked
                            ? [...currentTools.filter((t: any) => t.name !== tool.name), { ...tool, enabled: true, parameters: {} }]
                            : currentTools.filter((t: any) => t.name !== tool.name);
                          handlePropertyChange('tools', updatedTools);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{tool.description}</div>
                        <div className="text-xs text-gray-500">{tool.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 高级配置 */}
            <div className="border-t pt-4">
              <div className="text-sm font-medium text-gray-700 mb-3">高级配置</div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Top P"
                  type="number"
                  value={selectedNode.data.topP || 1.0}
                  onChange={(value) => handlePropertyChange('topP', parseFloat(value))}
                  min={0}
                  max={1}
                  step={0.1}
                  className="text-sm"
                />

                <Input
                  label="频率惩罚"
                  type="number"
                  value={selectedNode.data.frequencyPenalty || 0}
                  onChange={(value) => handlePropertyChange('frequencyPenalty', parseFloat(value))}
                  min={-2}
                  max={2}
                  step={0.1}
                  className="text-sm"
                />
              </div>
            </div>

            <Textarea
              label="系统提示"
              value={selectedNode.data.systemPrompt || ''}
              onChange={(value) => handlePropertyChange('systemPrompt', value)}
              rows={3}
              placeholder="输入系统提示..."
            />

            <Textarea
              label="用户提示"
              value={selectedNode.data.userPrompt || ''}
              onChange={(value) => handlePropertyChange('userPrompt', value)}
              rows={3}
              placeholder="输入用户提示..."
            />
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
        <Input
          label="节点名称"
          value={selectedNode.data.label || ''}
          onChange={handleLabelChange}
          placeholder="输入节点名称..."
        />

        {renderNodeProperties()}
      </div>
    </div>
  );
}