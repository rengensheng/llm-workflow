export interface WorkflowNode {
  id: string;
  type: 'llm' | 'tool' | 'conditional' | 'input' | 'output' | 'knowledge';
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

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface LLMNodeData {
  label: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  userPrompt: string;
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
}

export interface OutputNodeData {
  label: string;
  outputType: 'text' | 'file' | 'json';
}