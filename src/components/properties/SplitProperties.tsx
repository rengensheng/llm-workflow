import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextArea, NumberInput } from './types';

export default function SplitProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="分割类型">
        <SelectInput
          value={data.splitType || 'delimiter'}
          onChange={(v) => onChange('splitType', v)}
          options={[
            { value: 'delimiter', label: '分隔符分割' },
            { value: 'regex', label: '正则分割' },
            { value: 'lines', label: '按行分割' },
            { value: 'chunks', label: '分块分割' },
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

      {data.splitType === 'delimiter' && (
        <PropertyField label="分隔符">
          <TextArea
            value={data.delimiter || ','}
            onChange={(v) => onChange('delimiter', v)}
            placeholder="例如: , 或 | 或换行符"
          />
        </PropertyField>
      )}

      {data.splitType === 'regex' && (
        <PropertyField label="正则表达式" hint="例如: \\s+ 匹配空白字符">
          <TextArea
            value={data.regex || ''}
            onChange={(v) => onChange('regex', v)}
            placeholder="\\s+"
          />
        </PropertyField>
      )}

      {data.splitType === 'chunks' && (
        <>
          <PropertyField label="块大小（字符数）">
            <NumberInput
              value={data.chunkSize || 500}
              onChange={(v) => onChange('chunkSize', v)}
              min={1}
            />
          </PropertyField>
          <PropertyField label="块重叠（字符数）">
            <NumberInput
              value={data.chunkOverlap || 50}
              onChange={(v) => onChange('chunkOverlap', v)}
              min={0}
            />
          </PropertyField>
        </>
      )}

      <PropertyField label="最大项数" hint="限制输出项的数量，0 表示不限制">
        <NumberInput
          value={data.maxItems || 0}
          onChange={(v) => onChange('maxItems', v)}
          min={0}
        />
      </PropertyField>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="splitResult"
        />
      </PropertyField>
    </div>
  );
}