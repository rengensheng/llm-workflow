import { PropertyPanelProps, PropertyField, SelectInput, VariableInputField, TextArea, TextInput } from './types';

export default function DatabaseProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="数据库类型">
        <SelectInput
          value={data.databaseType || 'postgresql'}
          onChange={(v) => onChange('databaseType', v)}
          options={[
            { value: 'mysql', label: 'MySQL' },
            { value: 'postgresql', label: 'PostgreSQL' },
            { value: 'mongodb', label: 'MongoDB' },
            { value: 'redis', label: 'Redis' },
            { value: 'sqlite', label: 'SQLite' },
          ]}
        />
      </PropertyField>

      <PropertyField label="操作类型">
        <SelectInput
          value={data.operation || 'query'}
          onChange={(v) => onChange('operation', v)}
          options={[
            { value: 'query', label: '查询 (Query)' },
            { value: 'insert', label: '插入 (Insert)' },
            { value: 'update', label: '更新 (Update)' },
            { value: 'delete', label: '删除 (Delete)' },
          ]}
        />
      </PropertyField>

      <PropertyField label="连接字符串" hint="支持使用 {{变量名}} 引用环境变量">
        <TextInput
          value={data.connectionString || ''}
          onChange={(v) => onChange('connectionString', v)}
          placeholder="postgresql://user:pass@localhost:5432/db"
        />
      </PropertyField>

      <PropertyField label="查询语句" hint="SQL 查询或 MongoDB 查询">
        <TextArea
          value={data.query || ''}
          onChange={(v) => onChange('query', v)}
          placeholder={data.databaseType === 'mongodb' 
            ? '{ "find": "users", "filter": { "status": "active" } }'
            : 'SELECT * FROM users WHERE status = {{status}}'}
          rows={4}
        />
      </PropertyField>

      <PropertyField label="输入变量">
        <VariableInputField
          value={data.inputVariable || ''}
          onChange={(v) => onChange('inputVariable', v)}
          variables={availableVariables}
          placeholder="用于查询参数的变量"
        />
      </PropertyField>

      <PropertyField label="输出变量名">
        <VariableInputField
          value={data.outputVariable || ''}
          onChange={(v) => onChange('outputVariable', v)}
          variables={availableVariables}
          placeholder="queryResult"
        />
      </PropertyField>
    </div>
  );
}