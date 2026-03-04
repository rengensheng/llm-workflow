import { PropertyPanelProps, PropertyField, SelectInput, NumberInput, VariableInputField, TextInput } from './types';

export default function DelayProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="延迟类型">
        <SelectInput
          value={data.delayType || 'fixed'}
          onChange={(v) => onChange('delayType', v)}
          options={[
            { value: 'fixed', label: '固定延迟' },
            { value: 'variable', label: '变量延迟' },
            { value: 'cron', label: '定时任务 (Cron)' },
          ]}
        />
      </PropertyField>

      {data.delayType === 'fixed' && (
        <PropertyField label="延迟时间" hint="等待的秒数">
          <div className="flex items-center gap-2">
            <NumberInput
              value={data.delaySeconds || 5}
              onChange={(v) => onChange('delaySeconds', v)}
              min={0}
            />
            <span className="text-gray-500 text-sm">秒</span>
          </div>
        </PropertyField>
      )}

      {data.delayType === 'variable' && (
        <PropertyField label="延迟变量" hint="从变量读取延迟秒数">
          <VariableInputField
            value={data.delayVariable || ''}
            onChange={(v) => onChange('delayVariable', v)}
            variables={availableVariables}
            placeholder="delaySeconds"
          />
        </PropertyField>
      )}

      {data.delayType === 'cron' && (
        <>
          <PropertyField label="Cron 表达式" hint="例如: 0 0 * * * (每天零点)">
            <TextInput
              value={data.cronExpression || ''}
              onChange={(v) => onChange('cronExpression', v)}
              placeholder="0 0 * * *"
            />
          </PropertyField>
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <div className="font-medium mb-1">Cron 表达式说明:</div>
            <div>分 时 日 月 周</div>
            <div className="mt-1">例如:</div>
            <ul className="list-disc list-inside">
              <li>0 * * * * - 每小时</li>
              <li>0 0 * * * - 每天 00:00</li>
              <li>0 9 * * 1-5 - 工作日 09:00</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}