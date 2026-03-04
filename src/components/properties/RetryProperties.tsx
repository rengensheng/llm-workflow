import { PropertyPanelProps, PropertyField, SelectInput, NumberInput, TextArea } from './types';

export default function RetryProperties({ data, onChange }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="最大重试次数">
        <NumberInput
          value={data.maxRetries || 3}
          onChange={(v) => onChange('maxRetries', v)}
          min={1}
          max={10}
        />
      </PropertyField>

      <PropertyField label="初始重试间隔 (毫秒)">
        <NumberInput
          value={data.retryInterval || 1000}
          onChange={(v) => onChange('retryInterval', v)}
          min={100}
        />
      </PropertyField>

      <PropertyField label="退避策略">
        <SelectInput
          value={data.backoffType || 'exponential'}
          onChange={(v) => onChange('backoffType', v)}
          options={[
            { value: 'fixed', label: '固定间隔' },
            { value: 'linear', label: '线性退避' },
            { value: 'exponential', label: '指数退避' },
          ]}
        />
      </PropertyField>

      {data.backoffType === 'exponential' && (
        <PropertyField label="退避倍数" hint="每次重试间隔乘以此倍数">
          <NumberInput
            value={data.backoffMultiplier || 2}
            onChange={(v) => onChange('backoffMultiplier', v)}
            min={1}
            max={10}
            step={0.5}
          />
        </PropertyField>
      )}

      <div>
        <PropertyField label="重试条件">
          <div className="space-y-2">
            {['timeout', 'network', 'custom'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(data.retryOn || []).includes(type as any)}
                  onChange={(e) => {
                    const current = data.retryOn || [];
                    const updated = e.target.checked
                      ? [...current, type]
                      : current.filter((t: string) => t !== type);
                    onChange('retryOn', updated);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {type === 'timeout' ? '超时错误' : type === 'network' ? '网络错误' : '自定义条件'}
                </span>
              </label>
            ))}
          </div>
        </PropertyField>
      </div>

      {(data.retryOn || []).includes('custom') && (
        <PropertyField label="自定义条件" hint="自定义重试条件的表达式">
          <TextArea
            value={data.customCondition || ''}
            onChange={(v) => onChange('customCondition', v)}
            placeholder="error.code === 'RATE_LIMIT'"
            rows={2}
          />
        </PropertyField>
      )}
    </div>
  );
}