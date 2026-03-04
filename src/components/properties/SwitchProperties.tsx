import { PropertyPanelProps, PropertyField, VariableInputField, TextArea } from './types';

export default function SwitchProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="输入变量" hint="用于条件判断的输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="选择或输入变量名"
        />
      </PropertyField>

      <div>
        <PropertyField label="分支条件">
          <div className="space-y-3">
            {(data.cases || []).map((switchCase: any, index: number) => (
              <div key={switchCase.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={switchCase.label}
                    onChange={(e) => {
                      const newCases = [...(data.cases || [])];
                      newCases[index] = { ...switchCase, label: e.target.value };
                      onChange('cases', newCases);
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm mr-2"
                    placeholder="分支名称"
                  />
                  <button
                    onClick={() => {
                      const newCases = (data.cases || []).filter((_: any, i: number) => i !== index);
                      onChange('cases', newCases);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
                <TextArea
                  value={switchCase.condition || ''}
                  onChange={(v) => {
                    const newCases = [...(data.cases || [])];
                    newCases[index] = { ...switchCase, condition: v };
                    onChange('cases', newCases);
                  }}
                  placeholder="条件表达式，如: {{value}} === 'option1'"
                  rows={2}
                />
              </div>
            ))}
            <button
              onClick={() => {
                const newId = `case-${Date.now()}`;
                const newCases = [...(data.cases || []), { id: newId, label: `Case ${(data.cases || []).length + 1}`, condition: '' }];
                onChange('cases', newCases);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加分支
            </button>
          </div>
        </PropertyField>
      </div>
    </div>
  );
}