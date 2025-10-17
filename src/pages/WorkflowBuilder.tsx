import { useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import type { Workflow, WorkflowNode, WorkflowEdge } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

import WorkflowCanvas from '../components/WorkflowCanvas';
import NodePalette from '../components/NodePalette';
import WorkflowToolbar from '../components/WorkflowToolbar';
import NodePropertiesPanel from '../components/NodePropertiesPanel';

export default function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<Workflow>({
    id: uuidv4(),
    name: 'New Workflow',
    description: '',
    nodes: [],
    edges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const handleNodesChange = useCallback((nodes: WorkflowNode[]) => {
    setWorkflow(prev => ({
      ...prev,
      nodes,
      updatedAt: new Date().toISOString(),
    }));
    
    // 如果选中的节点被更新了，更新选中节点的状态
    if (selectedNode) {
      const updatedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedNode) {
        setSelectedNode(updatedNode);
      }
    }
  }, [selectedNode]);

  const handleNodeSelect = useCallback((node: WorkflowNode | null) => {
    setSelectedNode(node);
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<WorkflowNode>) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, ...updates } : node
      ),
      updatedAt: new Date().toISOString(),
    }));
    
    // 更新选中的节点
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedNode]);

  const handleEdgesChange = useCallback((edges: WorkflowEdge[]) => {
    setWorkflow(prev => ({
      ...prev,
      edges,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleAddNode = useCallback((node: WorkflowNode) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, node],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleSaveWorkflow = useCallback(() => {
    // Save workflow to localStorage for demo purposes
    const workflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const existingIndex = workflows.findIndex((w: Workflow) => w.id === workflow.id);
    
    if (existingIndex >= 0) {
      workflows[existingIndex] = workflow;
    } else {
      workflows.push(workflow);
    }
    
    localStorage.setItem('workflows', JSON.stringify(workflows));
    alert('Workflow saved successfully!');
  }, [workflow]);

  const handleRunWorkflow = useCallback(() => {
    // Basic validation
    if (workflow.nodes.length === 0) {
      alert('Please add at least one node to the workflow');
      return;
    }

    // Check if there's at least one input and output node
    const hasInput = workflow.nodes.some(node => node.type === 'input');
    const hasOutput = workflow.nodes.some(node => node.type === 'output');

    if (!hasInput) {
      alert('Please add an input node to start the workflow');
      return;
    }

    if (!hasOutput) {
      alert('Please add an output node to complete the workflow');
      return;
    }

    alert('Workflow execution started! (This is a demo - real execution would connect to backend)');
  }, [workflow]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{workflow.name}</h1>
            <p className="text-gray-500 text-sm">
              {workflow.description || 'No description'}
            </p>
          </div>
          <WorkflowToolbar
            onSave={handleSaveWorkflow}
            onRun={handleRunWorkflow}
            workflow={workflow}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Node Palette */}
        <NodePalette onAddNode={handleAddNode} />
        
        {/* Workflow Canvas */}
        <div className="flex-1">
          <ReactFlowProvider>
            <WorkflowCanvas
              initialNodes={workflow.nodes}
              initialEdges={workflow.edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onAddNode={handleAddNode}
              onNodeSelect={handleNodeSelect}
            />
          </ReactFlowProvider>
        </div>

        {/* Node Properties Panel */}
        <NodePropertiesPanel
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}