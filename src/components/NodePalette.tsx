import { Brain, Wrench, GitBranch, Upload, Download, Repeat } from 'lucide-react';
import type { WorkflowNode } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface NodePaletteProps {
  onAddNode: (node: WorkflowNode) => void;
}

const nodeTypes = [
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
    type: 'userOutput',
    label: 'Output',
    icon: Download,
    color: 'red',
    defaultData: {
      label: 'Output',
      outputType: 'text',
    },
  },
  {
    type: 'loop',
    label: 'Loop',
    icon: Repeat,
    color: 'orange',
    defaultData: {
      label: 'Loop',
      loopType: 'count',
      maxIterations: 5,
      condition: '',
      currentIteration: 0,
      maxWordCount: 1000,
      runningConditions: {
        enabled: false,
        condition: '',
        description: '',
      },
    },
  },
];

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
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">节点面板</h3>
      
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon;
          const colorClasses = {
            yellow: 'border-yellow-400 text-yellow-600 hover:bg-yellow-50',
            blue: 'border-blue-400 text-blue-600 hover:bg-blue-50',
            green: 'border-green-400 text-green-600 hover:bg-green-50',
            purple: 'border-purple-400 text-purple-600 hover:bg-purple-50',
            red: 'border-red-400 text-red-600 hover:bg-red-50',
            orange: 'border-orange-400 text-orange-600 hover:bg-orange-50',
          }[nodeType.color];

          return (
            <div
              key={nodeType.type}
              className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${colorClasses}`}
              draggable
              onDragStart={(e) => handleDragStart(e, nodeType.type, nodeType.defaultData)}
              onClick={() => handleClick(nodeType.type, nodeType.defaultData)}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{nodeType.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}