import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { WorkflowNode } from '../types/workflow';
import type { Node, Edge, Connection, NodeTypes, NodeChange, EdgeChange } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import LLMNode from './nodes/LLMNode';
import ToolNode from './nodes/ToolNode';
import ConditionalNode from './nodes/ConditionalNode';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LoopNode from './nodes/LoopNode';
import APINode from './nodes/APINode';
import WorkflowChildNode from './nodes/WorkflowNode';
// 数据处理节点
import TransformNode from './nodes/TransformNode';
import MergeNode from './nodes/MergeNode';
import SplitNode from './nodes/SplitNode';
import FilterNode from './nodes/FilterNode';
// AI 增强节点
import PromptTemplateNode from './nodes/PromptTemplateNode';
import EmbeddingNode from './nodes/EmbeddingNode';
import MemoryNode from './nodes/MemoryNode';
import RAGNode from './nodes/RAGNode';
// 外部集成节点
import DatabaseNode from './nodes/DatabaseNode';
import WebhookNode from './nodes/WebhookNode';
import FileSystemNode from './nodes/FileSystemNode';
import EmailNode from './nodes/EmailNode';
// 控制流节点
import SwitchNode from './nodes/SwitchNode';
import ParallelNode from './nodes/ParallelNode';
import DelayNode from './nodes/DelayNode';
import RetryNode from './nodes/RetryNode';
// 验证与调试节点
import ValidatorNode from './nodes/ValidatorNode';
import LoggerNode from './nodes/LoggerNode';
import ErrorHandlerNode from './nodes/ErrorHandlerNode';

const nodeTypes: NodeTypes = {
  // 核心节点
  llm: LLMNode,
  tool: ToolNode,
  conditional: ConditionalNode,
  userInput: InputNode,
  userOutput: OutputNode,
  loop: LoopNode,
  api: APINode,
  workflow: WorkflowChildNode,
  // 数据处理节点
  transform: TransformNode,
  merge: MergeNode,
  split: SplitNode,
  filter: FilterNode,
  // AI 增强节点
  promptTemplate: PromptTemplateNode,
  embedding: EmbeddingNode,
  memory: MemoryNode,
  rag: RAGNode,
  // 外部集成节点
  database: DatabaseNode,
  webhook: WebhookNode,
  fileSystem: FileSystemNode,
  email: EmailNode,
  // 控制流节点
  switch: SwitchNode,
  parallel: ParallelNode,
  delay: DelayNode,
  retry: RetryNode,
  // 验证与调试节点
  validator: ValidatorNode,
  logger: LoggerNode,
  errorHandler: ErrorHandlerNode,
};

interface WorkflowCanvasProps {
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
  onNodesChangeInternal: (changes: NodeChange[]) => void;
  onEdgesChangeInternal: (changes: EdgeChange[]) => void;
  onAddNode?: (node: WorkflowNode) => void;
  onNodeSelect?: (node: WorkflowNode | null) => void;
}

export default function WorkflowCanvas({
  nodes = [],
  edges = [],
  setNodes,
  setEdges,
  onNodesChangeInternal,
  onEdgesChangeInternal,
  onAddNode,
  onNodeSelect,
}: WorkflowCanvasProps) {

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
    },
    [edges, setEdges]
  );

  const onNodesChangeCallback = useCallback(
    (changes: any) => {
      onNodesChangeInternal(changes);
    },
    [onNodesChangeInternal]
  );

  const onEdgesChangeCallback = useCallback(
    (changes: any) => {
      onEdgesChangeInternal(changes);
    },
    [onEdgesChangeInternal]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      // 使用 React Flow 的坐标转换函数，考虑缩放和滚动
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      try {
        const nodeData = JSON.parse(type);
        const newNode: WorkflowNode = {
          id: uuidv4(),
          type: nodeData.type,
          position,
          data: nodeData.data,
        };
        setNodes((nds) => [...nds, newNode]);
        onAddNode?.(newNode);
      } catch (error) {
        console.error('Error parsing node data:', error);
      }
    },
    [screenToFlowPosition, setNodes, onAddNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onNodeSelect?.(node as WorkflowNode);
  }, [onNodeSelect]);

  const onPaneClick = useCallback(() => {
    onNodeSelect?.(null);
  }, [onNodeSelect]);

  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeCallback}
        onEdgesChange={onEdgesChangeCallback}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}