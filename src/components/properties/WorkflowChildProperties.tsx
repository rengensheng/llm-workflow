import { PropertyPanelProps, PropertyField, TextInput, TextArea, VariableInputField, Section, Divider } from './types';
import { X } from 'lucide-react';

export default function WorkflowChildProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="工作流 ID">
        <TextInput
          value={data.workflowId || ''}
          onChange={(v) => onChange('workflowId', v)}
          placeholder="输入要引用的工作流 ID"
        />
      </PropertyField>

      <PropertyField label="工作流名称">
        <TextInput
          value={data.workflowName || ''}
          onChange={(v) => onChange('workflowName', v)}
          placeholder="工作流显示名称"
        />
      </PropertyField>

      <PropertyField label="描述">
        <TextArea
          value={data.description || ''}
          onChange={(v) => onChange('description', v)}
          placeholder="描述此工作流节点的作用..."
        />
      </PropertyField>

      <Divider />

      <Section title="输入映射">
        <p className="text-xs text-gray-500 mb-3">将当前工作流的变量映射到子工作流的输入变量</p>
        <div className="space-y-3">
          {data.inputMappings && Object.entries(data.inputMappings).map(([key, value]: [string, any]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">映射配置</span>
                <button
                  onClick={() => {
                    const newMappings = { ...data.inputMappings };
                    delete newMappings[key];
                    onChange('inputMappings', newMappings);
                  }}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">子工作流变量</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      const newMappings = { ...data.inputMappings };
                      delete newMappings[key];
                      newMappings[e.target.value] = value;
                      onChange('inputMappings', newMappings);
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    placeholder="变量名"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 text-xs">↓ 映射自</span>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">当前工作流变量</label>
                  <VariableInputField
                    value={value}
                    onChange={(newValue) => {
                      const newMappings = { ...data.inputMappings };
                      newMappings[key] = newValue;
                      onChange('inputMappings', newMappings);
                    }}
                    variables={availableVariables}
                    placeholder="选择或输入变量"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newMappings = { ...data.inputMappings, '': '' };
              onChange('inputMappings', newMappings);
            }}
            className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
          >
            + 添加输入映射
          </button>
        </div>
      </Section>

      <Divider />

      <Section title="输出映射">
        <p className="text-xs text-gray-500 mb-3">将子工作流的输出变量映射到当前工作流的变量</p>
        <div className="space-y-3">
          {data.outputMappings && Object.entries(data.outputMappings).map(([key, value]: [string, any]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">映射配置</span>
                <button
                  onClick={() => {
                    const newMappings = { ...data.outputMappings };
                    delete newMappings[key];
                    onChange('outputMappings', newMappings);
                  }}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">子工作流输出变量</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      const newMappings = { ...data.outputMappings };
                      delete newMappings[key];
                      newMappings[e.target.value] = value;
                      onChange('outputMappings', newMappings);
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    placeholder="变量名"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 text-xs">↓ 映射到</span>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">当前工作流变量</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const newMappings = { ...data.outputMappings };
                      newMappings[key] = e.target.value;
                      onChange('outputMappings', newMappings);
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    placeholder="变量名"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newMappings = { ...data.outputMappings, '': '' };
              onChange('outputMappings', newMappings);
            }}
            className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50"
          >
            + 添加输出映射
          </button>
        </div>
      </Section>
    </div>
  );
}