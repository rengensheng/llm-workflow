import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, SwitchInput } from './types';

export default function LoggerProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="日志级别">
        <SelectInput
          value={data.logLevel || 'info'}
          onChange={(v) => onChange('logLevel', v)}
          options={[
            { value: 'debug', label: 'Debug (调试)' },
            { value: 'info', label: 'Info (信息)' },
            { value: 'warn', label: 'Warn (警告)' },
            { value: 'error', label: 'Error (错误)' },
          ]}
        />
      </PropertyField>

      <PropertyField label="记录内容">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入要记录的变量"
        />
      </PropertyField>

      <div>
        <PropertyField label="输出目标">
          <div className="space-y-2">
            {['console', 'file', 'variable'].map((target) => (
              <label key={target} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(data.logTo || []).includes(target as any)}
                  onChange={(e) => {
                    const current = data.logTo || [];
                    const updated = e.target.checked
                      ? [...current, target]
                      : current.filter((t: string) => t !== target);
                    onChange('logTo', updated);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {target === 'console' ? '控制台' : target === 'file' ? '文件' : '变量'}
                </span>
              </label>
            ))}
          </div>
        </PropertyField>
      </div>

      <PropertyField label="日志格式">
        <SelectInput
          value={data.format || 'text'}
          onChange={(v) => onChange('format', v)}
          options={[
            { value: 'text', label: '纯文本' },
            { value: 'json', label: 'JSON' },
          ]}
        />
      </PropertyField>

      <SwitchInput
        checked={data.includeTimestamp ?? true}
        onChange={(v) => onChange('includeTimestamp', v)}
        label="包含时间戳"
        description="在日志中记录时间信息"
      />

      {(data.logTo || []).includes('variable') && (
        <PropertyField label="输出变量名">
          <VariableInputField
            value={data.outputVariable || ''}
            onChange={(v) => onChange('outputVariable', v)}
            variables={availableVariables}
            placeholder="logOutput"
          />
        </PropertyField>
      )}
    </div>
  );
}