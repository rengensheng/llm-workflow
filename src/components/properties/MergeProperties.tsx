import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField } from './types';

export default function MergeProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="合并策略">
        <SelectInput
          value={data.mergeStrategy || 'object'}
          onChange={(v) => onChange('mergeStrategy', v)}
          options={[
            { value: 'object', label: '对象合并' },
            { value: 'array', label: '数组合并' },
            { value: 'concat', label: '字符串拼接' },
          ]}
        />
      </PropertyField>

      <div>
        <PropertyField label="合并字段">
          <div className="space-y-2">
            {(data.mergeFields || []).map((field: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <input
                  type="text"
                  value={field.fieldName}
                  onChange={(e) => {
                    const newFields = [...(data.mergeFields || [])];
                    newFields[index] = { ...field, fieldName: e.target.value };
                    onChange('mergeFields', newFields);
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="字段名"
                />
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => {
                      const newFields = [...(data.mergeFields || [])];
                      newFields[index] = { ...field, required: e.target.checked };
                      onChange('mergeFields', newFields);
                    }}
                  />
                  必需
                </label>
                <button
                  onClick={() => {
                    const newFields = (data.mergeFields || []).filter((_: any, i: number) => i !== index);
                    onChange('mergeFields', newFields);
                  }}
                  className="text-red-500 hover:text-red-700 px-1"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newFields = [...(data.mergeFields || []), { sourceHandle: `in-${(data.mergeFields || []).length}`, fieldName: '', required: false }];
                onChange('mergeFields', newFields);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加字段
            </button>
          </div>
        </PropertyField>
      </div>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="mergedData"
        />
      </PropertyField>
    </div>
  );
}