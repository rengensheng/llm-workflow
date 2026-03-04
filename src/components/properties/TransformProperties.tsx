import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextArea, NumberInput } from './types';

export default function TransformProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="转换类型">
        <SelectInput
          value={data.transformType || 'jsonPath'}
          onChange={(v) => onChange('transformType', v)}
          options={[
            { value: 'jsonPath', label: 'JSONPath 提取' },
            { value: 'template', label: '模板转换' },
            { value: 'expression', label: '表达式计算' },
            { value: 'mapping', label: '字段映射' },
          ]}
        />
      </PropertyField>

      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入变量名"
        />
      </PropertyField>

      {data.transformType === 'jsonPath' && (
        <PropertyField label="JSONPath 表达式" hint="例如: $.data.items[*].name">
          <TextArea
            value={data.jsonPath || ''}
            onChange={(v) => onChange('jsonPath', v)}
            placeholder="$.data.items[*].name"
          />
        </PropertyField>
      )}

      {data.transformType === 'template' && (
        <PropertyField label="模板" hint="使用 {{变量名}} 插入变量">
          <TextArea
            value={data.template || ''}
            onChange={(v) => onChange('template', v)}
            placeholder="Hello, {{name}}! Your order {{orderId}} is ready."
            rows={4}
          />
        </PropertyField>
      )}

      {data.transformType === 'expression' && (
        <PropertyField label="表达式" hint="支持 JavaScript 表达式">
          <TextArea
            value={data.expression || ''}
            onChange={(v) => onChange('expression', v)}
            placeholder="{{value}} * 2 + 10"
          />
        </PropertyField>
      )}

      {data.transformType === 'mapping' && (
        <div className="space-y-3">
          <PropertyField label="字段映射">
            <div className="space-y-2">
              {(data.mappings || []).map((mapping: any, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <input
                    type="text"
                    value={mapping.source}
                    onChange={(e) => {
                      const newMappings = [...(data.mappings || [])];
                      newMappings[index] = { ...mapping, source: e.target.value };
                      onChange('mappings', newMappings);
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="源字段"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="text"
                    value={mapping.target}
                    onChange={(e) => {
                      const newMappings = [...(data.mappings || [])];
                      newMappings[index] = { ...mapping, target: e.target.value };
                      onChange('mappings', newMappings);
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="目标字段"
                  />
                  <button
                    onClick={() => {
                      const newMappings = (data.mappings || []).filter((_: any, i: number) => i !== index);
                      onChange('mappings', newMappings);
                    }}
                    className="text-red-500 hover:text-red-700 px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newMappings = [...(data.mappings || []), { source: '', target: '', transform: 'none' }];
                  onChange('mappings', newMappings);
                }}
                className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
              >
                + 添加映射
              </button>
            </div>
          </PropertyField>
        </div>
      )}

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="transformedData"
        />
      </PropertyField>
    </div>
  );
}