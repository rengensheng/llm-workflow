import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderOpen, Trash2, Edit3 } from 'lucide-react';
import type { Workflow } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

export default function WorkflowList() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    // Load workflows from localStorage
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    setWorkflows(savedWorkflows);
  }, []);

  const handleCreateNew = () => {
    const newWorkflow: Workflow = {
      id: uuidv4(),
      name: 'New Workflow',
      description: '',
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedWorkflows = [...workflows, newWorkflow];
    setWorkflows(updatedWorkflows);
    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      const updatedWorkflows = workflows.filter(w => w.id !== workflowId);
      setWorkflows(updatedWorkflows);
      localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">工作流管理</h1>
            <p className="text-gray-600 mt-2">创建和管理您的大模型智能体工作流</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>新建工作流</span>
          </button>
        </div>

        {/* Workflow Grid */}
        {workflows.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无工作流</h3>
            <p className="text-gray-500 mb-4">创建您的第一个工作流来开始构建智能体</p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>创建第一个工作流</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {workflow.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {workflow.nodes.length} 节点
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {workflow.description || '暂无描述'}
                  </p>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>创建: {formatDate(workflow.createdAt)}</div>
                    <div>更新: {formatDate(workflow.updatedAt)}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/workflow/${workflow.id}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>编辑</span>
                    </Link>

                    <button
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>删除</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}