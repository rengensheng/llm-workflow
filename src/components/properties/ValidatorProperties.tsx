import { PropertyPanelProps, PropertyField, VariableInputField, SelectInput, TextArea, SwitchInput, TextInput } from './types';

export default function ValidatorProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入要验证的变量"
        />
      </PropertyField>

      <div>
        <PropertyField label="验证规则">
          <div className="space-y-3">
            {(data.rules || []).map((rule: any, index: number) => (
              <div key={rule.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <select
                    value={rule.ruleType}
                    onChange={(e) => {
                      const newRules = [...(data.rules || [])];
                      newRules[index] = { ...rule, ruleType: e.target.value };
                      onChange('rules', newRules);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="required">必填</option>
                    <option value="type">类型</option>
                    <option value="format">格式</option>
                    <option value="range">范围</option>
                    <option value="custom">自定义</option>
                  </select>
                  <button
                    onClick={() => {
                      const newRules = (data.rules || []).filter((_: any, i: number) => i !== index);
                      onChange('rules', newRules);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={rule.field}
                    onChange={(e) => {
                      const newRules = [...(data.rules || [])];
                      newRules[index] = { ...rule, field: e.target.value };
                      onChange('rules', newRules);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="字段名"
                  />
                  {rule.ruleType === 'type' && (
                    <select
                      value={rule.expectedType || 'string'}
                      onChange={(e) => {
                        const newRules = [...(data.rules || [])];
                        newRules[index] = { ...rule, expectedType: e.target.value };
                        onChange('rules', newRules);
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="string">字符串</option>
                      <option value="number">数字</option>
                      <option value="boolean">布尔</option>
                      <option value="array">数组</option>
                      <option value="object">对象</option>
                    </select>
                  )}
                  {rule.ruleType === 'format' && (
                    <select
                      value={rule.format || 'email'}
                      onChange={(e) => {
                        const newRules = [...(data.rules || [])];
                        newRules[index] = { ...rule, format: e.target.value };
                        onChange('rules', newRules);
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="email">Email</option>
                      <option value="url">URL</option>
                      <option value="uuid">UUID</option>
                      <option value="regex">正则</option>
                      <option value="json">JSON</option>
                    </select>
                  )}
                  {rule.ruleType === 'range' && (
                    <>
                      <input
                        type="number"
                        value={rule.min || ''}
                        onChange={(e) => {
                          const newRules = [...(data.rules || [])];
                          newRules[index] = { ...rule, min: parseFloat(e.target.value) };
                          onChange('rules', newRules);
                        }}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="最小值"
                      />
                      <input
                        type="number"
                        value={rule.max || ''}
                        onChange={(e) => {
                          const newRules = [...(data.rules || [])];
                          newRules[index] = { ...rule, max: parseFloat(e.target.value) };
                          onChange('rules', newRules);
                        }}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="最大值"
                      />
                    </>
                  )}
                </div>

                <input
                  type="text"
                  value={rule.errorMessage || ''}
                  onChange={(e) => {
                    const newRules = [...(data.rules || [])];
                    newRules[index] = { ...rule, errorMessage: e.target.value };
                    onChange('rules', newRules);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="错误提示信息"
                />
              </div>
            ))}
            <button
              onClick={() => {
                const newRule = {
                  id: `rule-${Date.now()}`,
                  field: '',
                  ruleType: 'required',
                  errorMessage: '',
                };
                onChange('rules', [...(data.rules || []), newRule]);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加规则
            </button>
          </div>
        </PropertyField>
      </div>

      <SwitchInput
        checked={data.stopOnError ?? true}
        onChange={(v) => onChange('stopOnError', v)}
        label="遇错停止"
        description="验证失败时停止工作流执行"
      />

      <PropertyField label="输出变量名" hint="验证结果将保存到此变量">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="validationResult"
        />
      </PropertyField>
    </div>
  );
}