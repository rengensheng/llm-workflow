import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextArea } from './types';

export default function FilterProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="过滤类型">
        <SelectInput
          value={data.filterType || 'condition'}
          onChange={(v) => onChange('filterType', v)}
          options={[
            { value: 'condition', label: '条件过滤' },
            { value: 'jsonPath', label: 'JSONPath 过滤' },
            { value: 'expression', label: '表达式过滤' },
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

      {data.filterType === 'condition' && (
        <PropertyField label="条件表达式" hint="使用 {{变量名}} 引用变量">
          <TextArea
            value={data.condition || ''}
            onChange={(v) => onChange('condition', v)}
            placeholder="{{value}} > 10"
          />
        </PropertyField>
      )}

      {data.filterType === 'jsonPath' && (
        <PropertyField label="JSONPath 表达式" hint="例如: $[?(@.price < 10)]">
          <TextArea
            value={data.jsonPath || ''}
            onChange={(v) => onChange('jsonPath', v)}
            placeholder="$[?(@.price < 10)]"
          />
        </PropertyField>
      )}

      {data.filterType === 'expression' && (
        <PropertyField label="过滤表达式" hint="支持 JavaScript 表达式">
          <TextArea
            value={data.expression || ''}
            onChange={(v) => onChange('expression', v)}
            placeholder="item.status === 'active'"
          />
        </PropertyField>
      )}

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="filteredData"
        />
      </PropertyField>
    </div>
  );
}