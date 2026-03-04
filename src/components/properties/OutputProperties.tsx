import { PropertyPanelProps, PropertyField, SelectInput } from './types';

export default function OutputProperties({ data, onChange }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="输出类型">
        <SelectInput
          value={data.outputType || 'text'}
          onChange={(v) => onChange('outputType', v)}
          options={[
            { value: 'text', label: '文本' },
            { value: 'file', label: '文件' },
            { value: 'json', label: 'JSON' },
          ]}
        />
      </PropertyField>

      {data.outputType === 'text' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          输出节点将工作流结果以文本形式输出给用户。
        </div>
      )}

      {data.outputType === 'file' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          输出节点将工作流结果保存为文件供用户下载。
        </div>
      )}

      {data.outputType === 'json' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          输出节点将工作流结果格式化为 JSON 输出。
        </div>
      )}
    </div>
  );
}