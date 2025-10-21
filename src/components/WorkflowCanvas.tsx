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

const nodeTypes: NodeTypes = {
  llm: LLMNode,
  tool: ToolNode,
  conditional: ConditionalNode,
  userInput: InputNode,
  userOutput: OutputNode,
  loop: LoopNode,
  api: APINode,
  workflow: WorkflowChildNode,
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