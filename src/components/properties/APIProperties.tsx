import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, NumberInput, TextArea, VariableInputField as VarInput } from './types';

export default function APIProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="请求方法">
        <SelectInput
          value={data.method || 'GET'}
          onChange={(v) => onChange('method', v)}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
            { value: 'PATCH', label: 'PATCH' },
          ]}
        />
      </PropertyField>

      <PropertyField label="请求 URL" hint="支持变量引用">
        <VariableInputField
          value={data.url || ''}
          onChange={(v) => onChange('url', v)}
          variables={availableVariables}
          placeholder="https://api.example.com/endpoint"
        />
      </PropertyField>

      <PropertyField label="请求头" hint="JSON 格式，支持变量引用">
        <TextArea
          value={typeof data.headers === 'string' ? data.headers : JSON.stringify(data.headers || {}, null, 2)}
          onChange={(v) => onChange('headers', v)}
          placeholder='{"Content-Type": "application/json", "Authorization": "Bearer {{token}}"}'
          rows={4}
        />
      </PropertyField>

      {(data.method === 'POST' || data.method === 'PUT' || data.method === 'PATCH') && (
        <>
          <PropertyField label="请求体类型">
            <SelectInput
              value={data.bodyType || 'json'}
              onChange={(v) => onChange('bodyType', v)}
              options={[
                { value: 'json', label: 'JSON' },
                { value: 'form', label: 'Form Data' },
                { value: 'text', label: 'Text' },
              ]}
            />
          </PropertyField>

          <PropertyField label="请求体" hint="支持变量引用">
            <VariableInputField
              value={data.body || ''}
              onChange={(v) => onChange('body', v)}
              variables={availableVariables}
              placeholder={data.bodyType === 'json' ? '{"key": "{{value}}"}' : '请求体内容'}
              multiline
            />
          </PropertyField>
        </>
      )}

      <PropertyField label="超时时间 (毫秒)">
        <NumberInput
          value={data.timeout || 5000}
          onChange={(v) => onChange('timeout', v)}
          min={100}
          max={60000}
        />
      </PropertyField>

      <PropertyField label="输出变量名" hint="API 响应将保存到此变量">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="apiResponse"
        />
      </PropertyField>
    </div>
  );
}