import { PropertyPanelProps, PropertyField, VariableInputField, TextArea } from './types';

export default function PromptTemplateProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="模板内容" hint="使用 {{变量名}} 插入变量">
        <TextArea
          value={data.template || ''}
          onChange={(v) => onChange('template', v)}
          placeholder="你是一个{{role}}，请帮我{{task}}。&#10;&#10;背景信息：&#10;{{context}}"
          rows={6}
        />
      </PropertyField>

      <div>
        <PropertyField label="模板变量">
          <div className="space-y-2">
            {(data.variables || []).map((variable: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {'{'}{'{'}{variable.name}{'}'}{'}'}
                  </span>
                  <button
                    onClick={() => {
                      const newVars = (data.variables || []).filter((_: any, i: number) => i !== index);
                      onChange('variables', newVars);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={variable.name}
                    onChange={(e) => {
                      const newVars = [...(data.variables || [])];
                      newVars[index] = { ...variable, name: e.target.value };
                      onChange('variables', newVars);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="变量名"
                  />
                  <select
                    value={variable.type || 'string'}
                    onChange={(e) => {
                      const newVars = [...(data.variables || [])];
                      newVars[index] = { ...variable, type: e.target.value };
                      onChange('variables', newVars);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="string">字符串</option>
                    <option value="number">数字</option>
                    <option value="boolean">布尔</option>
                    <option value="array">数组</option>
                    <option value="object">对象</option>
                  </select>
                </div>
                <div className="mt-2">
                  <VariableInputField
                    value={variable.sourceVariable || ''}
                    onChange={(v) => {
                      const newVars = [...(data.variables || [])];
                      newVars[index] = { ...variable, sourceVariable: v };
                      onChange('variables', newVars);
                    }}
                    variables={availableVariables}
                    placeholder="绑定源变量"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newVars = [...(data.variables || []), { name: '', type: 'string', defaultValue: '', description: '' }];
                onChange('variables', newVars);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加变量
            </button>
          </div>
        </PropertyField>
      </div>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="prompt"
        />
      </PropertyField>
    </div>
  );
}