import { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider, useNodesState, useEdgesState } from 'reactflow';
import type { Workflow, WorkflowNode, WorkflowEdge, WorkflowVariable } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

import WorkflowCanvas from '../components/WorkflowCanvas';
import NodePalette from '../components/NodePalette';
import WorkflowToolbar from '../components/WorkflowToolbar';
import NodePropertiesPanel from '../components/NodePropertiesPanel';
import VariablePanel from '../components/VariablePanel';

export default function WorkflowBuilder() {

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState([]);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState([]);
  const [workflow, setWorkflow] = useState<Workflow>({
    id: uuidv4(),
    name: 'New Workflow',
    description: '',
    variables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [showVariablePanel, setShowVariablePanel] = useState(false);

  // 同步 nodes 到 workflow.nodes
  useEffect(() => {
    setWorkflow(prev => ({
      ...prev,
      nodes: nodes as WorkflowNode[],
      updatedAt: new Date().toISOString(),
    }));

    // 如果选中的节点被更新了，更新选中节点的状态
    if (selectedNode) {
      const updatedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedNode) {
        setSelectedNode(updatedNode as WorkflowNode);
      }
    }
  }, [nodes, selectedNode]);

  // 同步 edges 到 workflow.edges
  useEffect(() => {
    setWorkflow(prev => ({
      ...prev,
      edges: edges as WorkflowEdge[],
      updatedAt: new Date().toISOString(),
    }));
  }, [edges]);

  const handleNodeSelect = useCallback((node: WorkflowNode | null) => {
    setSelectedNode(node);
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<WorkflowNode>) => {
    const oldNode = nodes.find(node => node.id === nodeId);

    setWorkflow(prev => ({
      ...prev,
      updatedAt: new Date().toISOString(),
    }));
    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    ))
    // 更新选中的节点
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, ...updates } : null);
    }

    // 处理变量更新
    if (oldNode && updates.data) {
      const oldVariableName = oldNode.data.outputVariable;
      const newVariableName = updates.data.outputVariable;

      // 如果变量名发生变化
      if (oldVariableName !== newVariableName) {
        setWorkflow(prev => {
          let updatedVariables = [...prev.variables];
          // 删除旧的变量
          if (oldVariableName) {
            updatedVariables = updatedVariables.filter(v => !(v.name === oldVariableName && v.nodeId === nodeId));
          }
          // 创建新的变量
          if (newVariableName) {
            const newVariable: WorkflowVariable = {
              id: uuidv4(),
              name: newVariableName,
              type: 'string', // 默认类型
              nodeId: nodeId,
              description: `由 ${updates.data?.label || oldNode.data.label} 节点创建`,
            };
            updatedVariables.push(newVariable);
          }

          return {
            ...prev,
            variables: updatedVariables,
            updatedAt: new Date().toISOString(),
          };
        });
      }
    }
  }, [selectedNode, nodes, workflow.variables]);

  const handleAddNode = useCallback((node: WorkflowNode) => {
    setWorkflow(prev => ({
      ...prev,
      updatedAt: new Date().toISOString(),
    }));

    // 如果节点有输出变量名，自动创建变量
    if (node.data.outputVariable) {
      const newVariable: WorkflowVariable = {
        id: uuidv4(),
        name: node.data.outputVariable,
        type: 'string', // 默认类型
        nodeId: node.id,
        description: `由 ${node.data.label} 节点创建`,
      };

      setWorkflow(prev => ({
        ...prev,
        variables: [...prev.variables, newVariable],
        updatedAt: new Date().toISOString(),
      }));
    }
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

  // 变量管理方法
  const handleCreateVariable = useCallback((variable: Omit<WorkflowVariable, 'id'>) => {
    const newVariable: WorkflowVariable = {
      ...variable,
      id: uuidv4(),
    };

    setWorkflow(prev => ({
      ...prev,
      variables: [...prev.variables, newVariable],
      updatedAt: new Date().toISOString(),
    }));

    return newVariable.id;
  }, []);

  const handleUpdateVariable = useCallback((variableId: string, updates: Partial<WorkflowVariable>) => {
    setWorkflow(prev => ({
      ...prev,
      variables: prev.variables.map(variable =>
        variable.id === variableId ? { ...variable, ...updates } : variable
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleDeleteVariable = useCallback((variableId: string) => {
    setWorkflow(prev => ({
      ...prev,
      variables: prev.variables.filter(variable => variable.id !== variableId),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 获取节点可用的变量
  const getAvailableVariables = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return [];

    // 获取该节点之前的所有节点输出的变量
    const previousNodes = getPreviousNodes(nodeId);
    const availableVariables: WorkflowVariable[] = [];

    previousNodes.forEach(prevNode => {
      const nodeVariables = workflow.variables.filter(v => v.nodeId === prevNode.id);
      availableVariables.push(...nodeVariables);
    });

    return availableVariables;
  }, [nodes, workflow.variables]);

  // 获取节点的前驱节点
  const getPreviousNodes = useCallback((nodeId: string) => {
    const edgesToNode = edges.filter(edge => edge.target === nodeId);
    const previousNodes = edgesToNode.map(edge =>
      nodes.find(node => node.id === edge.source)
    ).filter(Boolean) as WorkflowNode[];

    return previousNodes;
  }, [nodes, edges]);

  const handleRunWorkflow = useCallback(() => {
    // Basic validation
    if (nodes.length === 0) {
      alert('Please add at least one node to the workflow');
      return;
    }

    // Check if there's at least one input and output node
    const hasInput = nodes.some(node => node.type === 'userInput');
    const hasOutput = nodes.some(node => node.type === 'userOutput');

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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
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
            onToggleVariables={() => setShowVariablePanel(!showVariablePanel)}
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
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              onNodesChangeInternal={onNodesChangeInternal}
              onEdgesChangeInternal={onEdgesChangeInternal}
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
          availableVariables={selectedNode ? getAvailableVariables(selectedNode.id) : []}
          onCreateVariable={handleCreateVariable}
        />

        {/* Variable Panel */}
        <VariablePanel
          variables={workflow.variables}
          isOpen={showVariablePanel}
          onClose={() => setShowVariablePanel(false)}
          onCreateVariable={handleCreateVariable}
          onUpdateVariable={handleUpdateVariable}
          onDeleteVariable={handleDeleteVariable}
        />
      </div>
    </div>
  );
}