import { X } from 'lucide-react';
import { Input, Select, Switch, Textarea } from './ui';
import { VariableInput } from './VariableHighlighter';
import type { WorkflowNode, WorkflowVariable, JsonSchemaConfig as JsonSchemaConfigType } from '../types/workflow';
import JsonSchemaConfigComponent from './JsonSchemaConfig';

interface NodePropertiesPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onClose: () => void;
  availableVariables?: WorkflowVariable[];
  onCreateVariable?: (variable: Omit<WorkflowVariable, 'id'>) => string;
}

export default function NodePropertiesPanel({
  selectedNode,
  onUpdateNode,
  onClose,
  availableVariables = [],
}: NodePropertiesPanelProps) {
  if (!selectedNode) {
    return null;
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, label: e.target.value },
    });
  };

  const handlePropertyChange = (key: string, value: string | number | boolean | JsonSchemaConfigType | any) => {
    console.log('修改至', key, value)
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
              <Select
                value={selectedNode.data.model || 'gpt-4'}
                onChange={(e) => handlePropertyChange('model', e.target.value)}
                options={[
                  { value: 'gpt-4', label: 'GPT-4' },
                  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                  { value: 'claude-3', label: 'Claude-3' },
                  { value: 'gemini-pro', label: 'Gemini Pro' },
                  { value: 'qwen', label: 'Qwen' },
                  { value: 'ernie', label: '文心一言' },
                ]}
              />
            </div>

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
                onChange={(e) => handlePropertyChange('maxTokens', parseInt(e.target!.value))}
              />
            </div>

            {/* 输出格式配置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输出格式
              </label>
              <Select
                value={selectedNode.data.outputFormat || 'text'}
                onChange={(e) => handlePropertyChange('outputFormat', e.target.value)}
                options={[
                  { value: 'text', label: '文本' },
                  { value: 'json', label: 'JSON' },
                ]}
              />
            </div>

            {selectedNode.data.outputFormat === 'json' && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">JSON Schema 配置</h4>
                <JsonSchemaConfigComponent
                  config={selectedNode.data.jsonSchemaConfig || { fields: [] }}
                  onChange={(config) => handlePropertyChange('jsonSchemaConfig', config)}
                />
              </div>
            )}

            {/* 工具调用配置 */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">工具调用</div>
                  <div className="text-xs text-gray-500">启用工具调用功能</div>
                </div>
                <Switch
                  checked={selectedNode.data.enableToolCalls || false}
                  onChange={(checked) => handlePropertyChange('enableToolCalls', checked)}
                />
              </div>

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
                  onChange={(e) => handlePropertyChange('topP', parseFloat(e.target.value))}
                  min={0}
                  max={1}
                  step={0.1}
                />

                <Input
                  label="频率惩罚"
                  type="number"
                  value={selectedNode.data.frequencyPenalty || 0}
                  onChange={(e) => handlePropertyChange('frequencyPenalty', parseFloat(e.target.value))}
                  min={-2}
                  max={2}
                  step={0.1}
                />
              </div>
            </div>

            <Textarea
              label="系统提示"
              value={selectedNode.data.systemPrompt || ''}
              onChange={(e) => handlePropertyChange('systemPrompt', e.target.value)}
              placeholder="输入系统提示..."
            />

            <Textarea
              label="用户提示"
              value={selectedNode.data.userPrompt || ''}
              onChange={(e) => handlePropertyChange('userPrompt', e.target.value)}
              placeholder="输入用户提示..."
            />

            {/* 输出变量配置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输出变量名
              </label>
              <input
                type="text"
                value={selectedNode.data.outputVariable || ''}
                onChange={(e) => handlePropertyChange('outputVariable', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如: response"
              />
              <p className="text-xs text-gray-500 mt-1">
                设置变量名后，其他节点可以通过 {'{'}{'{'}变量名{'}'}{'}'} 引用此LLM输出
              </p>
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
              <VariableInput
                value={selectedNode.data.condition || ''}
                onChange={(value) => handlePropertyChange('condition', value)}
                variables={availableVariables || []}
                placeholder="例如: {{input}}.length > 10 或 {{count}} < 5"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                使用 {'{'}{'{'}变量名{'}'}{'}'} 格式引用变量，输入 {'{'}{'{'} 或 $ 触发变量提示
              </p>
            </div>
          </div>
        );

      case 'userInput':
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

            {/* 输出变量配置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输出变量名
              </label>
              <input
                type="text"
                value={selectedNode.data.outputVariable || ''}
                onChange={(e) => handlePropertyChange('outputVariable', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如: input"
              />
              <p className="text-xs text-gray-500 mt-1">
                设置变量名后，其他节点可以通过 {'{'}{'{'}变量名{'}'}{'}'} 引用此输入值
              </p>
            </div>
          </div>
        );

      case 'userOutput':
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

      case 'loop':
        return (
          <div className="space-y-4">
            {/* 数组循环配置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                数组变量
              </label>
              <VariableInput
                value={selectedNode.data.arrayVariable || ''}
                onChange={(value) => handlePropertyChange('arrayVariable', value)}
                variables={availableVariables || []}
                placeholder="选择或输入数组变量名，例如: items"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                选择要循环遍历的数组变量
              </p>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                请求方法
              </label>
              <select
                value={selectedNode.data.method || 'GET'}
                onChange={(e) => handlePropertyChange('method', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                请求URL
              </label>
              <VariableInput
                value={selectedNode.data.url || ''}
                onChange={(value) => handlePropertyChange('url', value)}
                variables={availableVariables || []}
                placeholder="https://api.example.com/endpoint"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                支持使用 {'{'}{'{'}变量名{'}'}{'}'} 格式引用变量
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                请求头 (JSON格式)
              </label>
              <textarea
                value={selectedNode.data.headers}
                onChange={(e) => {
                  handlePropertyChange('headers', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                rows={4}
                placeholder='{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer {{token}}"\n}'
              />
            </div>

            {(selectedNode.data.method === 'POST' ||
              selectedNode.data.method === 'PUT' ||
              selectedNode.data.method === 'PATCH') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      请求体类型
                    </label>
                    <select
                      value={selectedNode.data.bodyType || 'json'}
                      onChange={(e) => handlePropertyChange('bodyType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="json">JSON</option>
                      <option value="form">Form Data</option>
                      <option value="text">Text</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      请求体
                    </label>
                    <VariableInput
                      value={selectedNode.data.body || ''}
                      onChange={(value) => handlePropertyChange('body', value)}
                      variables={availableVariables || []}
                      placeholder={selectedNode.data.bodyType === 'json' ?
                        '{\n  "key": "{{value}}"\n}' :
                        '支持变量引用: {{variable}}'
                      }
                      className="w-full"
                      multiline
                    />
                  </div>
                </>
              )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                超时时间 (毫秒)
              </label>
              <input
                type="number"
                value={selectedNode.data.timeout || 5000}
                onChange={(e) => handlePropertyChange('timeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={0}
                step={1000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                输出变量名
              </label>
              <input
                type="text"
                value={selectedNode.data.outputVariable || ''}
                onChange={(e) => handlePropertyChange('outputVariable', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="api_response"
              />
              <p className="text-xs text-gray-500 mt-1">
                API响应结果将保存到此变量中
              </p>
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                描述
              </label>
              <textarea
                value={selectedNode.data.description || ''}
                onChange={(e) => handlePropertyChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="描述此工作流节点的作用..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工作流ID
              </label>
              <input
                type="text"
                value={selectedNode.data.workflowId || ''}
                onChange={(e) => handlePropertyChange('workflowId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入要引用的工作流ID..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工作流名称
              </label>
              <input
                type="text"
                value={selectedNode.data.workflowName || ''}
                onChange={(e) => handlePropertyChange('workflowName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="工作流显示名称..."
              />
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入映射
              </label>
              <p className="text-xs text-gray-500 mb-2">
                将当前工作流的变量映射到子工作流的输入变量
              </p>
              <div className="space-y-3">
                {selectedNode.data.inputMappings && Object.entries(selectedNode.data.inputMappings).map(([key, value]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-gray-600">映射配置</span>
                      <button
                        onClick={() => {
                          const newMappings = { ...selectedNode.data.inputMappings };
                          delete newMappings[key];
                          handlePropertyChange('inputMappings', newMappings);
                        }}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">子工作流变量</label>
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const newMappings = { ...selectedNode.data.inputMappings };
                            delete newMappings[key];
                            newMappings[e.target.value] = value;
                            handlePropertyChange('inputMappings', newMappings);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                          placeholder="变量名"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-gray-400 text-xs">↓ 映射自</span>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">当前工作流变量</label>
                        <VariableInput
                          value={value}
                          onChange={(newValue) => {
                            const newMappings = { ...selectedNode.data.inputMappings };
                            newMappings[key] = newValue;
                            handlePropertyChange('inputMappings', newMappings);
                          }}
                          variables={availableVariables || []}
                          placeholder="选择或输入变量"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newMappings = {
                      ...selectedNode.data.inputMappings,
                      '': ''
                    };
                    handlePropertyChange('inputMappings', newMappings);
                  }}
                  className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                >
                  + 添加输入映射
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输出映射
              </label>
              <p className="text-xs text-gray-500 mb-2">
                将子工作流的输出变量映射到当前工作流的变量
              </p>
              <div className="space-y-3">
                {selectedNode.data.outputMappings && Object.entries(selectedNode.data.outputMappings).map(([key, value]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-gray-600">映射配置</span>
                      <button
                        onClick={() => {
                          const newMappings = { ...selectedNode.data.outputMappings };
                          delete newMappings[key];
                          handlePropertyChange('outputMappings', newMappings);
                        }}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">子工作流输出变量</label>
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const newMappings = { ...selectedNode.data.outputMappings };
                            delete newMappings[key];
                            newMappings[e.target.value] = value;
                            handlePropertyChange('outputMappings', newMappings);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                          placeholder="变量名"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-gray-400 text-xs">↓ 映射到</span>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">当前工作流变量</label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newMappings = { ...selectedNode.data.outputMappings };
                            newMappings[key] = e.target.value;
                            handlePropertyChange('outputMappings', newMappings);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                          placeholder="变量名"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newMappings = {
                      ...selectedNode.data.outputMappings,
                      '': ''
                    };
                    handlePropertyChange('outputMappings', newMappings);
                  }}
                  className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                >
                  + 添加输出映射
                </button>
              </div>
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