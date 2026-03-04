import { PropertyPanelProps, PropertyField, SelectInput, TextInput, VariableInputField } from './types';

export default function InputProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="输入类型">
        <SelectInput
          value={data.inputType || 'text'}
          onChange={(v) => onChange('inputType', v)}
          options={[
            { value: 'text', label: '文本' },
            { value: 'file', label: '文件' },
            { value: 'url', label: 'URL' },
          ]}
        />
      </PropertyField>

      {data.inputType === 'text' && (
        <PropertyField label="默认值">
          <TextInput
            value={data.defaultValue || ''}
            onChange={(v) => onChange('defaultValue', v)}
            placeholder="输入默认文本值..."
          />
        </PropertyField>
      )}

      {data.inputType === 'file' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          文件输入节点允许用户上传文件。运行时用户可以选择要上传的文件。
        </div>
      )}

      {data.inputType === 'url' && (
        <PropertyField label="默认 URL">
          <TextInput
            value={data.defaultValue || ''}
            onChange={(v) => onChange('defaultValue', v)}
            placeholder="https://example.com"
          />
        </PropertyField>
      )}

      <PropertyField label="输出变量名" hint="其他节点可通过 {{变量名}} 引用此输入值">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="input"
        />
      </PropertyField>
    </div>
  );
}