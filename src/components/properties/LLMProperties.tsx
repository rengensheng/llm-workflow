import { PropertyPanelProps, PropertyField, SelectInput, NumberInput, TextArea, SwitchInput, Slider, Divider, Section } from './types';
import JsonSchemaConfigComponent from '../JsonSchemaConfig';
import type { JsonSchemaConfig } from '../../types/workflow';

export default function LLMProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="模型">
        <SelectInput
          value={data.model || 'gpt-4'}
          onChange={(v) => onChange('model', v)}
          options={[
            { value: 'gpt-4', label: 'GPT-4' },
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
            { value: 'claude-3', label: 'Claude-3' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
            { value: 'qwen', label: 'Qwen' },
            { value: 'ernie', label: '文心一言' },
          ]}
        />
      </PropertyField>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label={`温度`}
          value={data.temperature || 0.7}
          onChange={(v) => onChange('temperature', v)}
          min={0}
          max={1}
          step={0.1}
        />
        <PropertyField label="最大令牌数">
          <NumberInput
            value={data.maxTokens || 1000}
            onChange={(v) => onChange('maxTokens', v)}
            min={1}
          />
        </PropertyField>
      </div>

      <PropertyField label="输出格式">
        <SelectInput
          value={data.outputFormat || 'text'}
          onChange={(v) => onChange('outputFormat', v)}
          options={[
            { value: 'text', label: '文本' },
            { value: 'json', label: 'JSON' },
          ]}
        />
      </PropertyField>

      {data.outputFormat === 'json' && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">JSON Schema 配置</h4>
          <JsonSchemaConfigComponent
            config={data.jsonSchemaConfig || { fields: [] }}
            onChange={(config: JsonSchemaConfig) => onChange('jsonSchemaConfig', config)}
          />
        </div>
      )}

      <Divider />

      <SwitchInput
        checked={data.enableToolCalls || false}
        onChange={(v) => onChange('enableToolCalls', v)}
        label="工具调用"
        description="启用工具调用功能"
      />

      {data.enableToolCalls && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">可用的工具:</div>
          {[
            { name: 'web_search', description: '网页搜索' },
            { name: 'calculator', description: '计算器' },
            { name: 'file_reader', description: '文件读取' },
            { name: 'api_call', description: 'API 调用' },
          ].map((tool) => (
            <div key={tool.name} className="flex items-center space-x-3 p-2 border border-gray-200 rounded">
              <input
                type="checkbox"
                checked={data.tools?.some((t: any) => t.name === tool.name && t.enabled) || false}
                onChange={(e) => {
                  const currentTools = data.tools || [];
                  const updatedTools = e.target.checked
                    ? [...currentTools.filter((t: any) => t.name !== tool.name), { ...tool, enabled: true, parameters: {} }]
                    : currentTools.filter((t: any) => t.name !== tool.name);
                  onChange('tools', updatedTools);
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

      <Divider />

      <Section title="高级配置">
        <div className="grid grid-cols-2 gap-4">
          <PropertyField label="Top P">
            <NumberInput
              value={data.topP || 1.0}
              onChange={(v) => onChange('topP', v)}
              min={0}
              max={1}
              step={0.1}
            />
          </PropertyField>
          <PropertyField label="频率惩罚">
            <NumberInput
              value={data.frequencyPenalty || 0}
              onChange={(v) => onChange('frequencyPenalty', v)}
              min={-2}
              max={2}
              step={0.1}
            />
          </PropertyField>
        </div>
      </Section>

      <PropertyField label="系统提示">
        <TextArea
          value={data.systemPrompt || ''}
          onChange={(v) => onChange('systemPrompt', v)}
          placeholder="输入系统提示..."
        />
      </PropertyField>

      <PropertyField label="用户提示">
        <TextArea
          value={data.userPrompt || ''}
          onChange={(v) => onChange('userPrompt', v)}
          placeholder="输入用户提示..."
        />
      </PropertyField>

      <PropertyField label="输出变量名" hint="其他节点可通过 {{变量名}} 引用此输出">
        <input
          type="text"
          value={data.outputVariable || ''}
          onChange={(e) => onChange('outputVariable', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="response"
        />
      </PropertyField>
    </div>
  );
}