import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Button, Input, Select, Switch } from './ui';
import type { JsonSchemaConfig, JsonSchemaField } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface JsonSchemaConfigProps {
  config: JsonSchemaConfig;
  onChange: (config: JsonSchemaConfig) => void;
}

export default function JsonSchemaConfigComponent({ config, onChange }: JsonSchemaConfigProps) {
  const addField = () => {
    const newField: JsonSchemaField = {
      id: uuidv4(),
      name: '',
      type: 'string',
      required: false,
    };
    onChange({
      ...config,
      fields: [...(config.fields || []), newField],
    });
  };

  const updateField = (fieldId: string, updates: Partial<JsonSchemaField>) => {
    const updatedFields = config.fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onChange({
      ...config,
      fields: updatedFields,
    });
  };

  const removeField = (fieldId: string) => {
    const updatedFields = config.fields.filter(field => field.id !== fieldId);
    onChange({
      ...config,
      fields: updatedFields,
    });
  };

  const updateConfig = (updates: Partial<JsonSchemaConfig>) => {
    onChange({
      ...config,
      ...updates,
    });
  };

  return (
    <div className="space-y-3">
      {/* Schema 基本信息 */}
      <div className="space-y-2">
        <Input
          label="Schema 标题"
          value={config.title || ''}
          onChange={(e) => updateConfig({ title: e.target.value })}
          placeholder="例如: 用户信息"
          size="sm"
        />

        <Input
          label="Schema 描述"
          value={config.description || ''}
          onChange={(e) => updateConfig({ description: e.target.value })}
          placeholder="描述这个 JSON 结构的作用"
          size="sm"
        />
      </div>

      {/* 字段列表 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">字段配置</h4>
          <Button
            variant="secondary"
            size="sm"
            onClick={addField}
            leftIcon={<PlusIcon className="w-4 h-4" />}
          >

            <span>添加字段</span>
          </Button>
        </div>

        <div className="space-y-2">
          {config.fields?.map((field) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-3">
              {/* 字段名称和类型 */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    label="字段名"
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    placeholder="name"
                    size="sm"
                  />
                </div>
                <div className="w-24">
                  <Select
                    label="类型"
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value as any })}
                    options={[
                      { value: 'string', label: '字符串' },
                      { value: 'number', label: '数字' },
                      { value: 'boolean', label: '布尔' },
                      { value: 'array', label: '数组' },
                      { value: 'object', label: '对象' },
                    ]}
                    size="sm"
                  />
                </div>
              </div>

              {/* 描述 */}
              <div>
                <Input
                  label="描述"
                  value={field.description || ''}
                  onChange={(e) => updateField(field.id, { description: e.target.value })}
                  placeholder="字段描述"
                  size="sm"
                />
              </div>

              {/* 默认值和必填 */}
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="默认值"
                    value={field.defaultValue || ''}
                    onChange={(e) => updateField(field.id, { defaultValue: e.target.value })}
                    placeholder="默认值"
                    size="sm"
                  />
                </div>
                <div className="flex items-center gap-2 pb-2">
                  <Switch
                    checked={field.required}
                    onChange={(checked) => updateField(field.id, { required: checked })}
                    label="必填"
                    size="sm"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeField(field.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 类型特定配置 */}
              {(field.type === 'string' || field.type === 'number') && (
                <div className="pt-2 border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-2">
                    {field.type === 'string' && (
                      <>
                        <Input
                          label="最小长度"
                          type="number"
                          value={field.minLength || ''}
                          onChange={(e) => updateField(field.id, { minLength: parseInt(e.target.value) || undefined })}
                          size="sm"
                        />
                        <Input
                          label="最大长度"
                          type="number"
                          value={field.maxLength || ''}
                          onChange={(e) => updateField(field.id, { maxLength: parseInt(e.target.value) || undefined })}
                          size="sm"
                        />
                      </>
                    )}
                    {field.type === 'number' && (
                      <>
                        <Input
                          label="最小值"
                          type="number"
                          value={field.minimum || ''}
                          onChange={(e) => updateField(field.id, { minimum: parseFloat(e.target.value) || undefined })}
                          size="sm"
                        />
                        <Input
                          label="最大值"
                          type="number"
                          value={field.maximum || ''}
                          onChange={(e) => updateField(field.id, { maximum: parseFloat(e.target.value) || undefined })}
                          size="sm"
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {(!config.fields || config.fields.length === 0) && (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-sm">暂无字段配置</p>
              <p className="text-xs mt-1">点击"添加字段"开始配置</p>
            </div>
          )}
        </div>
      </div>

      {/* Schema 预览 */}
      {config.fields && config.fields.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Schema 预览</h4>
          <pre className="bg-gray-900 text-gray-100 p-2 rounded text-[10px] overflow-auto max-h-40 leading-tight">
            {JSON.stringify(
              {
                $schema: "http://json-schema.org/draft-07/schema#",
                title: config.title,
                description: config.description,
                type: "object",
                properties: config.fields.reduce((acc, field) => {
                  if (field.name) {
                    acc[field.name] = {
                      type: field.type,
                      description: field.description,
                      ...(field.type === 'string' && {
                        minLength: field.minLength,
                        maxLength: field.maxLength,
                      }),
                      ...(field.type === 'number' && {
                        minimum: field.minimum,
                        maximum: field.maximum,
                      }),
                    };
                  }
                  return acc;
                }, {} as Record<string, any>),
                required: config.fields.filter(f => f.required && f.name).map(f => f.name),
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}