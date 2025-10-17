export interface WorkflowNode {
  id: string;
  type: 'llm' | 'tool' | 'conditional' | 'input' | 'output' | 'knowledge' | 'loop';
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface WorkflowVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  value?: any;
  description?: string;
  nodeId?: string; // 创建该变量的节点ID
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables: WorkflowVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface ToolCall {
  name: string;
  description: string;
  parameters: Record<string, any>;
  enabled: boolean;
}

export interface JsonSchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  required: boolean;
  defaultValue?: any;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
}

export interface JsonSchemaConfig {
  title?: string;
  description?: string;
  fields: JsonSchemaField[];
}

export interface LLMNodeData {
  label: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  userPrompt: string;
  // 工具调用配置
  enableToolCalls: boolean;
  tools: ToolCall[];
  // 输出格式配置
  outputFormat: 'text' | 'json';
  jsonSchema?: string;
  jsonSchemaConfig?: JsonSchemaConfig;
  // 高级配置
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  // 变量输出
  outputVariable?: string;
}

export interface ToolNodeData {
  label: string;
  toolType: 'web_search' | 'calculator' | 'file_reader' | 'api_call';
  parameters: Record<string, any>;
}

export interface ConditionalNodeData {
  label: string;
  condition: string;
  trueBranch: string;
  falseBranch: string;
}

export interface InputNodeData {
  label: string;
  inputType: 'text' | 'file' | 'url';
  defaultValue?: string;
  outputVariable?: string; // 输出变量名
}

export interface OutputNodeData {
  label: string;
  outputType: 'text' | 'file' | 'json';
}

export interface LoopNodeData {
  label: string;
  loopType: 'count' | 'condition';
  maxIterations?: number;
  condition?: string;
  currentIteration?: number;
  // 新增字段：最大词语数和运行条件
  maxWordCount?: number;
  runningConditions?: {
    enabled: boolean;
    condition: string;
    description?: string;
  };
}