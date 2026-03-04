import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextInput, TextArea } from './types';

export default function FileSystemProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="操作类型">
        <SelectInput
          value={data.operation || 'read'}
          onChange={(v) => onChange('operation', v)}
          options={[
            { value: 'read', label: '读取文件' },
            { value: 'write', label: '写入文件' },
            { value: 'append', label: '追加内容' },
            { value: 'delete', label: '删除文件' },
            { value: 'list', label: '列出目录' },
          ]}
        />
      </PropertyField>

      <PropertyField label="文件路径" hint="支持变量引用，如 /data/{{filename}}">
        <VariableInputField
          value={data.filePath || ''}
          onChange={(v) => onChange('filePath', v)}
          variables={availableVariables}
          placeholder="/path/to/file.txt"
        />
      </PropertyField>

      {(data.operation === 'write' || data.operation === 'append') && (
        <PropertyField label="写入内容" hint="支持变量引用">
          <VariableInputField
            value={data.inputVariable || ''}
            onChange={(v) => onChange('inputVariable', v)}
            variables={availableVariables}
            placeholder="选择或输入要写入的变量"
          />
        </PropertyField>
      )}

      <PropertyField label="编码格式">
        <SelectInput
          value={data.encoding || 'utf-8'}
          onChange={(v) => onChange('encoding', v)}
          options={[
            { value: 'utf-8', label: 'UTF-8' },
            { value: 'binary', label: 'Binary' },
            { value: 'base64', label: 'Base64' },
          ]}
        />
      </PropertyField>

      <PropertyField label="输出变量名" hint="读取结果将保存到此变量">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="fileContent"
        />
      </PropertyField>
    </div>
  );
}