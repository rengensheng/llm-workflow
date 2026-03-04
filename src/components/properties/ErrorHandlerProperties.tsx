import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextInput, TextArea } from './types';

export default function ErrorHandlerProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <PropertyField label="捕获错误类型">
          <div className="space-y-2">
            {[
              { value: 'timeout', label: '超时错误' },
              { value: 'network', label: '网络错误' },
              { value: 'validation', label: '验证错误' },
              { value: 'custom', label: '自定义错误' },
            ].map((type) => (
              <label key={type.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(data.errorTypes || []).includes(type.value as any)}
                  onChange={(e) => {
                    const current = data.errorTypes || [];
                    const updated = e.target.checked
                      ? [...current, type.value]
                      : current.filter((t: string) => t !== type.value);
                    onChange('errorTypes', updated);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </PropertyField>
      </div>

      {(data.errorTypes || []).includes('custom') && (
        <PropertyField label="自定义错误模式" hint="正则表达式匹配错误信息">
          <TextInput
            value={data.customErrorPattern || ''}
            onChange={(v) => onChange('customErrorPattern', v)}
            placeholder="RATE_LIMIT|QUOTA_EXCEEDED"
          />
        </PropertyField>
      )}

      <PropertyField label="处理方式">
        <SelectInput
          value={data.action || 'continue'}
          onChange={(v) => onChange('action', v)}
          options={[
            { value: 'continue', label: '继续执行 (忽略错误)' },
            { value: 'retry', label: '重试' },
            { value: 'fallback', label: '使用回退值' },
            { value: 'abort', label: '中止工作流' },
          ]}
        />
      </PropertyField>

      {data.action === 'fallback' && (
        <div className="space-y-3">
          <PropertyField label="回退值来源">
            <SelectInput
              value={data.fallbackVariable ? 'variable' : 'value'}
              onChange={(v) => {
                if (v === 'variable') {
                  onChange('fallbackValue', undefined);
                } else {
                  onChange('fallbackVariable', undefined);
                }
              }}
              options={[
                { value: 'value', label: '固定值' },
                { value: 'variable', label: '变量' },
              ]}
            />
          </PropertyField>
          {data.fallbackVariable !== undefined ? (
            <PropertyField label="回退变量">
              <VariableInputField
                value={data.fallbackVariable || ''}
                onChange={(v) => onChange('fallbackVariable', v)}
                variables={availableVariables}
                placeholder="defaultValue"
              />
            </PropertyField>
          ) : (
            <PropertyField label="回退值">
              <TextArea
                value={data.fallbackValue || ''}
                onChange={(v) => onChange('fallbackValue', v)}
                placeholder="默认返回值"
                rows={3}
              />
            </PropertyField>
          )}
        </div>
      )}

      <PropertyField label="错误变量名" hint="错误详情将保存到此变量">
        <VariableInputField
          value={data.errorVariable || ''}
          onChange={(v) => onChange('errorVariable', v)}
          variables={availableVariables}
          placeholder="error"
        />
      </PropertyField>
    </div>
  );
}