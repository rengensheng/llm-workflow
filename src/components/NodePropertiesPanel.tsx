import { X } from 'lucide-react';
import { Input } from './ui';
import type { WorkflowNode, WorkflowVariable, JsonSchemaConfig } from '../types/workflow';

// 导入所有属性组件
import {
  // 核心节点
  LLMProperties,
  ToolProperties,
  ConditionalProperties,
  InputProperties,
  OutputProperties,
  LoopProperties,
  APIProperties,
  WorkflowChildProperties,
  // 数据处理节点
  TransformProperties,
  MergeProperties,
  SplitProperties,
  FilterProperties,
  // AI 增强节点
  PromptTemplateProperties,
  EmbeddingProperties,
  MemoryProperties,
  RAGProperties,
  // 外部集成节点
  DatabaseProperties,
  WebhookProperties,
  FileSystemProperties,
  EmailProperties,
  // 控制流节点
  SwitchProperties,
  ParallelProperties,
  DelayProperties,
  RetryProperties,
  // 验证与调试节点
  ValidatorProperties,
  LoggerProperties,
  ErrorHandlerProperties,
  // 类型
  type PropertyPanelProps,
} from './properties';

interface NodePropertiesPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onClose: () => void;
  availableVariables?: WorkflowVariable[];
  onCreateVariable?: (variable: Omit<WorkflowVariable, 'id'>) => string;
}

export default function NodePropertiesPanel({
  selectedNode,
  onUpdateNode,
  onClose,
  availableVariables = [],
}: NodePropertiesPanelProps) {
  if (!selectedNode) {
    return null;
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, label: e.target.value },
    });
  };

  const handlePropertyChange = (key: string, value: string | number | boolean | JsonSchemaConfig | any) => {
    onUpdateNode(selectedNode.id, {
      data: { ...selectedNode.data, [key]: value },
    });
  };

  // 创建属性面板的通用 props
  const propertyProps: PropertyPanelProps = {
    data: selectedNode.data,
    onChange: handlePropertyChange,
    availableVariables,
  };

  const renderNodeProperties = () => {
    switch (selectedNode.type) {
      // ========== 核心节点 ==========
      case 'llm':
        return <LLMProperties {...propertyProps} />;

      case 'tool':
        return <ToolProperties {...propertyProps} />;

      case 'conditional':
        return <ConditionalProperties {...propertyProps} />;

      case 'userInput':
        return <InputProperties {...propertyProps} />;

      case 'userOutput':
        return <OutputProperties {...propertyProps} />;

      case 'loop':
        return <LoopProperties {...propertyProps} />;

      case 'api':
        return <APIProperties {...propertyProps} />;

      case 'workflow':
        return <WorkflowChildProperties {...propertyProps} />;

      // ========== 数据处理节点 ==========
      case 'transform':
        return <TransformProperties {...propertyProps} />;

      case 'merge':
        return <MergeProperties {...propertyProps} />;

      case 'split':
        return <SplitProperties {...propertyProps} />;

      case 'filter':
        return <FilterProperties {...propertyProps} />;

      // ========== AI 增强节点 ==========
      case 'promptTemplate':
        return <PromptTemplateProperties {...propertyProps} />;

      case 'embedding':
        return <EmbeddingProperties {...propertyProps} />;

      case 'memory':
        return <MemoryProperties {...propertyProps} />;

      case 'rag':
        return <RAGProperties {...propertyProps} />;

      // ========== 外部集成节点 ==========
      case 'database':
        return <DatabaseProperties {...propertyProps} />;

      case 'webhook':
        return <WebhookProperties {...propertyProps} />;

      case 'fileSystem':
        return <FileSystemProperties {...propertyProps} />;

      case 'email':
        return <EmailProperties {...propertyProps} />;

      // ========== 控制流节点 ==========
      case 'switch':
        return <SwitchProperties {...propertyProps} />;

      case 'parallel':
        return <ParallelProperties {...propertyProps} />;

      case 'delay':
        return <DelayProperties {...propertyProps} />;

      case 'retry':
        return <RetryProperties {...propertyProps} />;

      // ========== 验证与调试节点 ==========
      case 'validator':
        return <ValidatorProperties {...propertyProps} />;

      case 'logger':
        return <LoggerProperties {...propertyProps} />;

      case 'errorHandler':
        return <ErrorHandlerProperties {...propertyProps} />;

      default:
        return (
          <div className="text-gray-500 text-sm">
            该节点类型暂无可配置属性
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">节点属性</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {selectedNode.type.toUpperCase()} 节点
        </div>
      </div>
      <div className="p-4 space-y-4">
        <Input
          label="节点名称"
          value={selectedNode.data.label || ''}
          onChange={handleLabelChange}
        />
        {renderNodeProperties()}
      </div>
    </div>
  );
}