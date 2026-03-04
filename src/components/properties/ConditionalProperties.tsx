import { PropertyPanelProps, PropertyField, VariableInputField, TextArea } from './types';

export default function ConditionalProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="条件表达式" hint="支持 JavaScript 表达式，使用 {{变量名}} 引用变量">
        <VariableInputField
          value={data.condition || ''}
          onChange={(v) => onChange('condition', v)}
          variables={availableVariables}
          placeholder="{{input}}.length > 10"
          multiline
        />
      </PropertyField>

      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <div className="font-medium mb-1">示例:</div>
        <ul className="space-y-1">
          <li>• {'{{score}} >= 60'} - 判断分数是否及格</li>
          <li>• {'{{status}} === "active"'} - 判断状态</li>
          <li>• {'{{items}}.length > 0'} - 判断数组非空</li>
          <li>• {'{{value}} && {{value}} < 100'} - 多条件组合</li>
        </ul>
      </div>
    </div>
  );
}