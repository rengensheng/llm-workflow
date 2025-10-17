import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { WorkflowNode, WorkflowEdge } from '../types/workflow';
import type { Node, Edge, Connection, NodeTypes } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import LLMNode from './nodes/LLMNode';
import ToolNode from './nodes/ToolNode';
import ConditionalNode from './nodes/ConditionalNode';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LoopNode from './nodes/LoopNode';

const nodeTypes: NodeTypes = {
  llm: LLMNode,
  tool: ToolNode,
  conditional: ConditionalNode,
  userInput: InputNode,
  userOutput: OutputNode,
  loop: LoopNode,
};

interface WorkflowCanvasProps {
  initialNodes?: WorkflowNode[];
  initialEdges?: WorkflowEdge[];
  onNodesChange?: (nodes: WorkflowNode[]) => void;
  onEdgesChange?: (edges: WorkflowEdge[]) => void;
  onAddNode?: (node: WorkflowNode) => void;
  onNodeSelect?: (node: WorkflowNode | null) => void;
}

export default function WorkflowCanvas({
  initialNodes = [],
  initialEdges = [],
  onNodesChange,
  onEdgesChange,
  onAddNode,
  onNodeSelect,
}: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes as Node[]);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges as Edge[]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      onEdgesChange?.(newEdges as WorkflowEdge[]);
    },
    [edges, setEdges, onEdgesChange]
  );

  const onNodesChangeCallback = useCallback(
    (changes: any) => {
      onNodesChangeInternal(changes);
      onNodesChange?.(nodes as WorkflowNode[]);
    },
    [onNodesChangeInternal, onNodesChange, nodes]
  );

  const onEdgesChangeCallback = useCallback(
    (changes: any) => {
      onEdgesChangeInternal(changes);
      onEdgesChange?.(edges as WorkflowEdge[]);
    },
    [onEdgesChangeInternal, onEdgesChange, edges]
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