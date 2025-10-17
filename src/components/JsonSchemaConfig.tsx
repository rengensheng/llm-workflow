import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Button, Input, Select, Switch } from './ui';
import type { JsonSchemaConfig, JsonSchemaField } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface JsonSchemaConfigProps {
  config: JsonSchemaConfig;
  onChange: (config: JsonSchemaConfig) => void;
}

const JsonSchemaConfig: React.FC<JsonSchemaConfigProps> = ({ config, onChange }) => {
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
    <div className="space-y-4">
      {/* Schema 基本信息 */}
      <div className="space-y-3">
        <Input
          label="Schema 标题"
          value={config.title || ''}
          onChange={(value) => updateConfig({ title: value })}
          placeholder="例如: 用户信息"
        />
        
        <Input
          label="Schema 描述"
          value={config.description || ''}
          onChange={(value) => updateConfig({ description: value })}
          placeholder="描述这个 JSON 结构的作用"
        />
      </div>

      {/* 字段列表 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">字段配置</h4>
          <Button
            variant="secondary"
            size="sm"
            onClick={addField}
            className="flex items-center space-x-1"
          >
            <PlusIcon className="w-4 h-4" />
            <span>添加字段</span>
          </Button>
        </div>

        <div className="space-y-3">
          {config.fields?.map((field) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-12 gap-3 items-start">
                {/* 字段名称 */}
                <div className="col-span-3">
                  <Input
                    label="字段名"
                    value={field.name}
                    onChange={(value) => updateField(field.id, { name: value })}
                    placeholder="例如: name"
                    className="text-sm"
                  />
                </div>

                {/* 字段类型 */}
                <div className="col-span-2">
                  <Select
                    label="类型"
                    value={field.type}
                    onChange={(value) => updateField(field.id, { type: value as any })}
                    options={[
                      { value: 'string', label: '字符串' },
                      { value: 'number', label: '数字' },
                      { value: 'boolean', label: '布尔值' },
                      { value: 'array', label: '数组' },
                      { value: 'object', label: '对象' },
                    ]}
                    className="text-sm"
                  />
                </div>

                {/* 默认值 */}
                <div className="col-span-2">
                  <Input
                    label="默认值"
                    value={field.defaultValue || ''}
                    onChange={(value) => updateField(field.id, { defaultValue: value })}
                    placeholder="默认值"
                    className="text-sm"
                  />
                </div>

                {/* 描述 */}
                <div className="col-span-3">
                  <Input
                    label="描述"
                    value={field.description || ''}
                    onChange={(value) => updateField(field.id, { description: value })}
                    placeholder="字段描述"
                    className="text-sm"
                  />
                </div>

                {/* 操作按钮 */}
                <div className="col-span-2 flex items-end space-x-2">
                  <Switch
                    checked={field.required}
                    onChange={(checked) => updateField(field.id, { required: checked })}
                    label="必填"
                    className="text-xs"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeField(field.id)}
                    className="p-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 类型特定配置 */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                {field.type === 'string' && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="最小长度"
                      type="number"
                      value={field.minLength || ''}
                      onChange={(value) => updateField(field.id, { minLength: parseInt(value) || undefined })}
                      className="text-sm"
                    />
                    <Input
                      label="最大长度"
                      type="number"
                      value={field.maxLength || ''}
                      onChange={(value) => updateField(field.id, { maxLength: parseInt(value) || undefined })}
                      className="text-sm"
                    />
                  </div>
                )}

                {field.type === 'number' && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="最小值"
                      type="number"
                      value={field.minimum || ''}
                      onChange={(value) => updateField(field.id, { minimum: parseFloat(value) || undefined })}
                      className="text-sm"
                    />
                    <Input
                      label="最大值"
                      type="number"
                      value={field.maximum || ''}
                      onChange={(value) => updateField(field.id, { maximum: parseFloat(value) || undefined })}
                      className="text-sm"
                    />
                  </div>
                )}

                {field.type === 'array' && (
                  <Input
                    label="数组项描述"
                    value={field.description || ''}
                    onChange={(value) => updateField(field.id, { description: value })}
                    placeholder="描述数组包含的内容"
                    className="text-sm"
                  />
                )}
              </div>
            </div>
          ))}

          {(!config.fields || config.fields.length === 0) && (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p>暂无字段配置</p>
              <p className="text-sm mt-1">点击"添加字段"开始配置 JSON Schema</p>
            </div>
          )}
        </div>
      </div>

      {/* Schema 预览 */}
      {config.fields && config.fields.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Schema 预览</h4>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-auto max-h-32">
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
};

export default JsonSchemaConfig;