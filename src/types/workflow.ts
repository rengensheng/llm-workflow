export type WorkflowNodeType =
  // 核心节点
  | 'llm'
  | 'tool'
  | 'conditional'
  | 'userInput'
  | 'userOutput'
  | 'knowledge'
  | 'loop'
  | 'api'
  | 'workflow'
  // 数据处理
  | 'transform'
  | 'merge'
  | 'split'
  | 'filter'
  // AI 增强
  | 'promptTemplate'
  | 'embedding'
  | 'memory'
  | 'rag'
  // 外部集成
  | 'database'
  | 'webhook'
  | 'fileSystem'
  | 'email'
  // 控制流
  | 'switch'
  | 'parallel'
  | 'delay'
  | 'retry'
  // 验证与调试
  | 'validator'
  | 'logger'
  | 'errorHandler';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
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
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
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
  loopType: 'count' | 'condition' | 'array';
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
  // 数组循环相关字段
  arrayVariable?: string; // 要循环的数组变量名
  itemVariable?: string; // 当前循环项的变量名
  indexVariable?: string; // 当前索引的变量名（可选）
}

export interface APINodeData {
  label: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: string;
  bodyType?: 'json' | 'form' | 'text';
  timeout?: number;
  outputVariable?: string;
}

export interface WorkflowNodeData {
  label: string;
  workflowId?: string;
  workflowName?: string;
  inputMappings?: Record<string, string>; // 输入变量映射：工作流内部变量 -> 当前工作流变量
  outputMappings?: Record<string, string>; // 输出变量映射：子工作流变量 -> 当前工作流变量
  description?: string;
}

// ==================== 数据处理节点类型 ====================

export interface TransformNodeData {
  label: string;
  transformType: 'jsonPath' | 'template' | 'expression' | 'mapping';
  inputVariable?: string;
  outputVariable?: string;
  // JSONPath 配置
  jsonPath?: string;
  // 模板配置
  template?: string;
  // 表达式配置
  expression?: string;
  // 映射配置
  mappings?: Array<{
    source: string;
    target: string;
    transform?: 'none' | 'toString' | 'toNumber' | 'toBoolean' | 'toJson';
  }>;
}

export interface MergeNodeData {
  label: string;
  mergeStrategy: 'object' | 'array' | 'concat';
  outputVariable?: string;
  // 合并配置
  mergeFields?: Array<{
    sourceHandle: string;
    fieldName: string;
    required: boolean;
  }>;
}

export interface SplitNodeData {
  label: string;
  splitType: 'delimiter' | 'regex' | 'lines' | 'chunks';
  inputVariable?: string;
  outputVariable?: string;
  // 分隔符分割
  delimiter?: string;
  // 正则分割
  regex?: string;
  // 块分割
  chunkSize?: number;
  chunkOverlap?: number;
  // 限制
  maxItems?: number;
}

export interface FilterNodeData {
  label: string;
  inputVariable?: string;
  outputVariable?: string;
  filterType: 'condition' | 'jsonPath' | 'expression';
  condition?: string;
  jsonPath?: string;
  expression?: string;
}

// ==================== AI 增强节点类型 ====================

export interface PromptTemplateNodeData {
  label: string;
  template: string;
  variables?: Array<{
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    defaultValue?: any;
    description?: string;
    sourceVariable?: string;
  }>;
  outputVariable?: string;
}

export interface EmbeddingNodeData {
  label: string;
  inputVariable?: string;
  outputVariable?: string;
  model: string;
  // 批处理配置
  batchSize?: number;
  // 向量维度
  dimensions?: number;
}

export interface MemoryNodeData {
  label: string;
  memoryType: 'conversation' | 'vector' | 'summary' | 'buffer';
  // 对话记忆
  maxMessages?: number;
  // 向量记忆
  collectionName?: string;
  // 摘要记忆
  summaryModel?: string;
  // 输入输出
  inputVariable?: string;
  outputVariable?: string;
  operation: 'save' | 'retrieve' | 'clear';
}

export interface RAGNodeData {
  label: string;
  inputVariable?: string;
  outputVariable?: string;
  // 知识库配置
  knowledgeBaseId?: string;
  knowledgeBaseName?: string;
  // 检索配置
  topK?: number;
  scoreThreshold?: number;
  // 向量配置
  embeddingModel?: string;
  // 输出格式
  includeSource?: boolean;
}

// ==================== 外部集成节点类型 ====================

export interface DatabaseNodeData {
  label: string;
  databaseType: 'mysql' | 'postgresql' | 'mongodb' | 'redis' | 'sqlite';
  operation: 'query' | 'insert' | 'update' | 'delete';
  // 连接配置
  connectionString?: string;
  // 查询配置
  query?: string;
  // 输入输出
  inputVariable?: string;
  outputVariable?: string;
}

export interface WebhookNodeData {
  label: string;
  webhookType: 'trigger' | 'response';
  // 触发器配置
  path?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // 响应配置
  statusCode?: number;
  responseBody?: string;
  // 输入输出
  outputVariable?: string;
}

export interface FileSystemNodeData {
  label: string;
  operation: 'read' | 'write' | 'delete' | 'list' | 'append';
  // 文件路径
  filePath?: string;
  // 变量
  inputVariable?: string;
  outputVariable?: string;
  // 编码
  encoding?: 'utf-8' | 'binary' | 'base64';
}

export interface EmailNodeData {
  label: string;
  // 收件人配置
  to?: string;
  cc?: string;
  bcc?: string;
  // 邮件内容
  subject?: string;
  body?: string;
  isHtml?: boolean;
  // 附件
  attachments?: Array<{
    filename: string;
    content?: string;
    variable?: string;
  }>;
  // SMTP 配置
  smtpConfig?: {
    host: string;
    port: number;
    secure: boolean;
  };
}

// ==================== 控制流节点类型 ====================

export interface SwitchCase {
  id: string;
  label: string;
  condition: string;
  color?: string;
}

export interface SwitchNodeData {
  label: string;
  inputVariable?: string;
  cases: SwitchCase[];
  defaultCase?: string;
}

export interface ParallelNodeData {
  label: string;
  branches: Array<{
    id: string;
    label: string;
  }>;
  waitForAll?: boolean;
  timeout?: number;
}

export interface DelayNodeData {
  label: string;
  delayType: 'fixed' | 'variable' | 'cron';
  // 固定延迟
  delaySeconds?: number;
  // 变量延迟
  delayVariable?: string;
  // Cron 表达式
  cronExpression?: string;
}

export interface RetryNodeData {
  label: string;
  maxRetries: number;
  retryInterval?: number;
  backoffType?: 'fixed' | 'linear' | 'exponential';
  backoffMultiplier?: number;
  retryOn?: Array<'timeout' | 'error' | 'custom'>;
  customCondition?: string;
}

// ==================== 验证与调试节点类型 ====================

export interface ValidatorRule {
  id: string;
  field: string;
  ruleType: 'required' | 'type' | 'format' | 'range' | 'custom';
  // 类型校验
  expectedType?: 'string' | 'number' | 'boolean' | 'array' | 'object';
  // 格式校验
  format?: 'email' | 'url' | 'uuid' | 'regex' | 'json';
  pattern?: string;
  // 范围校验
  min?: number;
  max?: number;
  // 自定义
  customExpression?: string;
  errorMessage?: string;
}

export interface ValidatorNodeData {
  label: string;
  inputVariable?: string;
  outputVariable?: string;
  rules: ValidatorRule[];
  stopOnError?: boolean;
}

export interface LoggerNodeData {
  label: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  inputVariable?: string;
  // 日志配置
  logTo: ('console' | 'file' | 'variable')[];
  outputVariable?: string;
  // 格式
  format?: 'text' | 'json';
  includeTimestamp?: boolean;
}

export interface ErrorHandlerNodeData {
  label: string;
  errorTypes?: Array<'timeout' | 'network' | 'validation' | 'custom'>;
  customErrorPattern?: string;
  // 错误处理方式
  action: 'continue' | 'retry' | 'fallback' | 'abort';
  // 回退值
  fallbackValue?: string;
  fallbackVariable?: string;
  // 输出
  errorVariable?: string;
}