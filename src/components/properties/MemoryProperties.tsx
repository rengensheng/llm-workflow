import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, NumberInput, TextInput } from './types';

export default function MemoryProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="记忆类型">
        <SelectInput
          value={data.memoryType || 'conversation'}
          onChange={(v) => onChange('memoryType', v)}
          options={[
            { value: 'conversation', label: '对话记忆' },
            { value: 'vector', label: '向量记忆' },
            { value: 'summary', label: '摘要记忆' },
            { value: 'buffer', label: '缓冲记忆' },
          ]}
        />
      </PropertyField>

      <PropertyField label="操作">
        <SelectInput
          value={data.operation || 'retrieve'}
          onChange={(v) => onChange('operation', v)}
          options={[
            { value: 'save', label: '保存' },
            { value: 'retrieve', label: '检索' },
            { value: 'clear', label: '清空' },
          ]}
        />
      </PropertyField>

      {data.memoryType === 'conversation' && (
        <PropertyField label="最大消息数" hint="保留最近的 N 条消息">
          <NumberInput
            value={data.maxMessages || 10}
            onChange={(v) => onChange('maxMessages', v)}
            min={1}
            max={100}
          />
        </PropertyField>
      )}

      {data.memoryType === 'vector' && (
        <PropertyField label="集合名称">
          <TextInput
            value={data.collectionName || ''}
            onChange={(v) => onChange('collectionName', v)}
            placeholder="my_collection"
          />
        </PropertyField>
      )}

      {data.memoryType === 'summary' && (
        <PropertyField label="摘要模型">
          <SelectInput
            value={data.summaryModel || 'gpt-3.5-turbo'}
            onChange={(v) => onChange('summaryModel', v)}
            options={[
              { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
              { value: 'gpt-4', label: 'GPT-4' },
              { value: 'claude-3', label: 'Claude-3' },
            ]}
          />
        </PropertyField>
      )}

      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入变量名"
        />
      </PropertyField>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="memory"
        />
      </PropertyField>
    </div>
  );
}