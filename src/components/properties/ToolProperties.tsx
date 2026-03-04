import { PropertyPanelProps, PropertyField, SelectInput } from './types';

export default function ToolProperties({ data, onChange }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="工具类型">
        <SelectInput
          value={data.toolType || 'web_search'}
          onChange={(v) => onChange('toolType', v)}
          options={[
            { value: 'web_search', label: '网页搜索' },
            { value: 'calculator', label: '计算器' },
            { value: 'file_reader', label: '文件读取' },
            { value: 'api_call', label: 'API 调用' },
          ]}
        />
      </PropertyField>

      {data.toolType === 'web_search' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          网页搜索工具可以让 LLM 搜索互联网获取最新信息。
        </div>
      )}

      {data.toolType === 'calculator' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          计算器工具可以进行数学计算，支持基础运算和函数。
        </div>
      )}

      {data.toolType === 'file_reader' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          文件读取工具可以读取本地文件内容。
        </div>
      )}

      {data.toolType === 'api_call' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          API 调用工具可以执行自定义 HTTP 请求。
        </div>
      )}
    </div>
  );
}