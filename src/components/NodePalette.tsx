import {
  Brain, Wrench, GitBranch, Upload, Download, Repeat, Globe, Workflow,
  // 数据处理
  Shuffle, GitMerge, Split, Filter,
  // AI 增强
  FileText, Binary, Database, Library,
  // 外部集成
  FolderOpen, Mail, Webhook,
  // 控制流
  GitFork, Clock, RefreshCw,
  // 验证与调试
  ShieldCheck, ScrollText, AlertTriangle
} from 'lucide-react';
import type { WorkflowNode } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface NodePaletteProps {
  onAddNode: (node: WorkflowNode) => void;
}

interface NodeCategory {
  label: string;
  nodes: NodeTypeConfig[];
}

interface NodeTypeConfig {
  type: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  defaultData: Record<string, any>;
}

const nodeCategories: NodeCategory[] = [
  {
    label: '输入输出',
    nodes: [
      {
        type: 'userInput',
        label: 'Input',
        icon: Upload,
        color: 'yellow',
        defaultData: {
          label: 'Input',
          inputType: 'text',
          defaultValue: '',
        },
      },
      {
        type: 'userOutput',
        label: 'Output',
        icon: Download,
        color: 'red',
        defaultData: {
          label: 'Output',
          outputType: 'text',
        },
      },
    ],
  },
  {
    label: 'AI 核心',
    nodes: [
      {
        type: 'llm',
        label: 'LLM',
        icon: Brain,
        color: 'blue',
        defaultData: {
          label: 'LLM',
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'You are a helpful assistant.',
          userPrompt: '',
          enableToolCalls: false,
          tools: [],
          outputFormat: 'text',
        },
      },
      {
        type: 'tool',
        label: 'Tool',
        icon: Wrench,
        color: 'green',
        defaultData: {
          label: 'Tool',
          toolType: 'web_search',
          parameters: {},
        },
      },
      {
        type: 'promptTemplate',
        label: 'Prompt Template',
        icon: FileText,
        color: 'violet',
        defaultData: {
          label: 'Prompt Template',
          template: '',
          variables: [],
          outputVariable: '',
        },
      },
      {
        type: 'embedding',
        label: 'Embedding',
        icon: Binary,
        color: 'indigo',
        defaultData: {
          label: 'Embedding',
          model: 'text-embedding-ada-002',
          dimensions: 1536,
        },
      },
      {
        type: 'memory',
        label: 'Memory',
        icon: Database,
        color: 'emerald',
        defaultData: {
          label: 'Memory',
          memoryType: 'conversation',
          operation: 'retrieve',
          maxMessages: 10,
        },
      },
      {
        type: 'rag',
        label: 'RAG',
        icon: Library,
        color: 'sky',
        defaultData: {
          label: 'RAG',
          topK: 5,
          scoreThreshold: 0.7,
          includeSource: true,
        },
      },
    ],
  },
  {
    label: '数据处理',
    nodes: [
      {
        type: 'transform',
        label: 'Transform',
        icon: Shuffle,
        color: 'cyan',
        defaultData: {
          label: 'Transform',
          transformType: 'jsonPath',
          jsonPath: '',
          template: '',
          expression: '',
          mappings: [],
        },
      },
      {
        type: 'merge',
        label: 'Merge',
        icon: GitMerge,
        color: 'teal',
        defaultData: {
          label: 'Merge',
          mergeStrategy: 'object',
          mergeFields: [],
        },
      },
      {
        type: 'split',
        label: 'Split',
        icon: Split,
        color: 'amber',
        defaultData: {
          label: 'Split',
          splitType: 'delimiter',
          delimiter: ',',
          chunkSize: 500,
          chunkOverlap: 50,
        },
      },
      {
        type: 'filter',
        label: 'Filter',
        icon: Filter,
        color: 'rose',
        defaultData: {
          label: 'Filter',
          filterType: 'condition',
          condition: '',
          jsonPath: '',
          expression: '',
        },
      },
    ],
  },
  {
    label: '流程控制',
    nodes: [
      {
        type: 'conditional',
        label: 'Conditional',
        icon: GitBranch,
        color: 'purple',
        defaultData: {
          label: 'Conditional',
          condition: '',
          trueBranch: '',
          falseBranch: '',
        },
      },
      {
        type: 'switch',
        label: 'Switch',
        icon: GitBranch,
        color: 'purple',
        defaultData: {
          label: 'Switch',
          cases: [
            { id: 'case-1', label: 'Case 1', condition: '' },
          ],
          defaultCase: 'default',
        },
      },
      {
        type: 'loop',
        label: 'Loop',
        icon: Repeat,
        color: 'orange',
        defaultData: {
          label: 'Loop',
          loopType: 'array',
          maxIterations: 5,
          arrayVariable: '',
          itemVariable: 'item',
          indexVariable: 'index',
        },
      },
      {
        type: 'parallel',
        label: 'Parallel',
        icon: GitFork,
        color: 'blue',
        defaultData: {
          label: 'Parallel',
          branches: [
            { id: 'branch-1', label: 'Branch 1' },
            { id: 'branch-2', label: 'Branch 2' },
          ],
          waitForAll: true,
        },
      },
      {
        type: 'delay',
        label: 'Delay',
        icon: Clock,
        color: 'slate',
        defaultData: {
          label: 'Delay',
          delayType: 'fixed',
          delaySeconds: 5,
        },
      },
      {
        type: 'retry',
        label: 'Retry',
        icon: RefreshCw,
        color: 'orange',
        defaultData: {
          label: 'Retry',
          maxRetries: 3,
          retryInterval: 1000,
          backoffType: 'exponential',
          backoffMultiplier: 2,
          retryOn: ['timeout', 'network'],
        },
      },
    ],
  },
  {
    label: '外部集成',
    nodes: [
      {
        type: 'api',
        label: 'API',
        icon: Globe,
        color: 'indigo',
        defaultData: {
          label: 'API Call',
          method: 'GET',
          url: '',
          headers: {},
          body: '',
          bodyType: 'json',
          timeout: 5000,
          outputVariable: '',
        },
      },
      {
        type: 'database',
        label: 'Database',
        icon: Database,
        color: 'gray',
        defaultData: {
          label: 'Database',
          databaseType: 'postgresql',
          operation: 'query',
          query: '',
        },
      },
      {
        type: 'webhook',
        label: 'Webhook',
        icon: Webhook,
        color: 'fuchsia',
        defaultData: {
          label: 'Webhook',
          webhookType: 'trigger',
          path: '/webhook',
          method: 'POST',
        },
      },
      {
        type: 'fileSystem',
        label: 'File System',
        icon: FolderOpen,
        color: 'amber',
        defaultData: {
          label: 'File System',
          operation: 'read',
          filePath: '',
          encoding: 'utf-8',
        },
      },
      {
        type: 'email',
        label: 'Email',
        icon: Mail,
        color: 'red',
        defaultData: {
          label: 'Email',
          to: '',
          subject: '',
          body: '',
          isHtml: false,
        },
      },
      {
        type: 'workflow',
        label: 'Workflow',
        icon: Workflow,
        color: 'pink',
        defaultData: {
          label: 'Workflow',
          workflowId: '',
          workflowName: '',
          inputMappings: {},
          outputMappings: {},
          description: '',
        },
      },
    ],
  },
  {
    label: '验证与调试',
    nodes: [
      {
        type: 'validator',
        label: 'Validator',
        icon: ShieldCheck,
        color: 'green',
        defaultData: {
          label: 'Validator',
          rules: [],
          stopOnError: true,
        },
      },
      {
        type: 'logger',
        label: 'Logger',
        icon: ScrollText,
        color: 'gray',
        defaultData: {
          label: 'Logger',
          logLevel: 'info',
          logTo: ['console'],
          format: 'text',
          includeTimestamp: true,
        },
      },
      {
        type: 'errorHandler',
        label: 'Error Handler',
        icon: AlertTriangle,
        color: 'red',
        defaultData: {
          label: 'Error Handler',
          errorTypes: ['timeout', 'network', 'validation'],
          action: 'continue',
        },
      },
    ],
  },
];

const colorClasses: Record<string, string> = {
  yellow: 'border-yellow-400 text-yellow-600 hover:bg-yellow-50',
  blue: 'border-blue-400 text-blue-600 hover:bg-blue-50',
  green: 'border-green-400 text-green-600 hover:bg-green-50',
  purple: 'border-purple-400 text-purple-600 hover:bg-purple-50',
  red: 'border-red-400 text-red-600 hover:bg-red-50',
  orange: 'border-orange-400 text-orange-600 hover:bg-orange-50',
  indigo: 'border-indigo-400 text-indigo-600 hover:bg-indigo-50',
  pink: 'border-pink-400 text-pink-600 hover:bg-pink-50',
  cyan: 'border-cyan-400 text-cyan-600 hover:bg-cyan-50',
  teal: 'border-teal-400 text-teal-600 hover:bg-teal-50',
  amber: 'border-amber-400 text-amber-600 hover:bg-amber-50',
  rose: 'border-rose-400 text-rose-600 hover:bg-rose-50',
  violet: 'border-violet-400 text-violet-600 hover:bg-violet-50',
  emerald: 'border-emerald-400 text-emerald-600 hover:bg-emerald-50',
  sky: 'border-sky-400 text-sky-600 hover:bg-sky-50',
  fuchsia: 'border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-50',
  slate: 'border-slate-400 text-slate-600 hover:bg-slate-50',
  gray: 'border-gray-400 text-gray-600 hover:bg-gray-50',
};

export default function NodePalette({ onAddNode }: NodePaletteProps) {
  const handleDragStart = (event: React.DragEvent, nodeType: string, defaultData: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: nodeType,
      data: defaultData,
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = (nodeType: string, defaultData: any) => {
    const newNode: WorkflowNode = {
      id: uuidv4(),
      type: nodeType as any,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: defaultData,
    };
    onAddNode(newNode);
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">节点面板</h3>

      <div className="space-y-4">
        {nodeCategories.map((category) => (
          <div key={category.label}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {category.label}
            </h4>
            <div className="space-y-1.5">
              {category.nodes.map((nodeType) => {
                const Icon = nodeType.icon;
                const colorClass = colorClasses[nodeType.color] || colorClasses.gray;

                return (
                  <div
                    key={nodeType.type}
                    className={`flex items-center space-x-2 p-2 border-2 rounded-lg cursor-pointer transition-colors ${colorClass}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, nodeType.type, nodeType.defaultData)}
                    onClick={() => handleClick(nodeType.type, nodeType.defaultData)}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{nodeType.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}