import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, NumberInput, TextInput, SwitchInput } from './types';

export default function RAGProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="知识库">
        <SelectInput
          value={data.knowledgeBaseId || ''}
          onChange={(v) => onChange('knowledgeBaseId', v)}
          options={[
            { value: '', label: '请选择知识库' },
            { value: 'kb-1', label: '产品文档库' },
            { value: 'kb-2', label: 'FAQ 知识库' },
            { value: 'kb-3', label: '技术文档库' },
          ]}
        />
      </PropertyField>

      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入查询变量"
        />
      </PropertyField>

      <PropertyField label="检索数量 (Top K)" hint="返回最相关的 K 条结果">
        <NumberInput
          value={data.topK || 5}
          onChange={(v) => onChange('topK', v)}
          min={1}
          max={20}
        />
      </PropertyField>

      <PropertyField label="相关度阈值" hint="相似度分数阈值 (0-1)">
        <NumberInput
          value={data.scoreThreshold || 0.7}
          onChange={(v) => onChange('scoreThreshold', v)}
          min={0}
          max={1}
          step={0.1}
        />
      </PropertyField>

      <PropertyField label="嵌入模型">
        <SelectInput
          value={data.embeddingModel || 'text-embedding-ada-002'}
          onChange={(v) => onChange('embeddingModel', v)}
          options={[
            { value: 'text-embedding-ada-002', label: 'OpenAI Ada-002' },
            { value: 'text-embedding-3-small', label: 'OpenAI Small' },
            { value: 'bge-large-zh', label: 'BGE Large Chinese' },
          ]}
        />
      </PropertyField>

      <SwitchInput
        checked={data.includeSource || false}
        onChange={(v) => onChange('includeSource', v)}
        label="包含来源信息"
        description="在结果中包含文档来源信息"
      />

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="ragResult"
        />
      </PropertyField>
    </div>
  );
}