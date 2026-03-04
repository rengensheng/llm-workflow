import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, NumberInput } from './types';

export default function EmbeddingProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="嵌入模型">
        <SelectInput
          value={data.model || 'text-embedding-ada-002'}
          onChange={(v) => onChange('model', v)}
          options={[
            { value: 'text-embedding-ada-002', label: 'OpenAI Ada-002' },
            { value: 'text-embedding-3-small', label: 'OpenAI Embedding Small' },
            { value: 'text-embedding-3-large', label: 'OpenAI Embedding Large' },
            { value: 'bge-large-zh', label: 'BGE Large Chinese' },
            { value: 'bge-small-en', label: 'BGE Small English' },
          ]}
        />
      </PropertyField>

      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入要嵌入的文本变量"
        />
      </PropertyField>

      <PropertyField label="向量维度" hint="部分模型支持自定义维度">
        <NumberInput
          value={data.dimensions || 1536}
          onChange={(v) => onChange('dimensions', v)}
          min={128}
          max={3072}
        />
      </PropertyField>

      <PropertyField label="批处理大小" hint="批量处理文本时的批次大小">
        <NumberInput
          value={data.batchSize || 100}
          onChange={(v) => onChange('batchSize', v)}
          min={1}
          max={1000}
        />
      </PropertyField>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="embedding"
        />
      </PropertyField>
    </div>
  );
}