import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextInput, NumberInput, TextArea } from './types';

export default function WebhookProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="Webhook 类型">
        <SelectInput
          value={data.webhookType || 'trigger'}
          onChange={(v) => onChange('webhookType', v)}
          options={[
            { value: 'trigger', label: '触发器 (接收请求)' },
            { value: 'response', label: '响应 (发送响应)' },
          ]}
        />
      </PropertyField>

      {data.webhookType === 'trigger' ? (
        <>
          <PropertyField label="路径" hint="Webhook 接收路径">
            <TextInput
              value={data.path || '/webhook'}
              onChange={(v) => onChange('path', v)}
              placeholder="/webhook"
            />
          </PropertyField>

          <PropertyField label="HTTP 方法">
            <SelectInput
              value={data.method || 'POST'}
              onChange={(v) => onChange('method', v)}
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' },
              ]}
            />
          </PropertyField>

          <PropertyField label="输出变量名" hint="请求体将保存到此变量">
            <VariableInputField
              value={data.outputVariable || ''}
              onChange={(v) => onChange('outputVariable', v)}
              variables={availableVariables}
              placeholder="webhookData"
            />
          </PropertyField>
        </>
      ) : (
        <>
          <PropertyField label="状态码">
            <NumberInput
              value={data.statusCode || 200}
              onChange={(v) => onChange('statusCode', v)}
              min={100}
              max={599}
            />
          </PropertyField>

          <PropertyField label="响应体" hint="支持变量引用">
            <TextArea
              value={data.responseBody || ''}
              onChange={(v) => onChange('responseBody', v)}
              placeholder='{"status": "success", "data": {{result}}}'
              rows={4}
            />
          </PropertyField>
        </>
      )}
    </div>
  );
}