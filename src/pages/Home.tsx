import { Link } from 'react-router-dom';
import { Brain, Workflow, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          LLM 智能体工作流构建器
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          像 Dify 一样，使用可视化拖拽界面构建和编排大模型智能体工作流
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/workflows"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Workflow className="w-5 h-5 mr-2" />
            开始构建
          </Link>
          <a
            href="#features"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            了解更多
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          核心功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">多模型支持</h3>
            <p className="text-gray-600">
              支持多种大语言模型，包括 GPT、Claude 等，灵活配置模型参数
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Workflow className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">可视化编排</h3>
            <p className="text-gray-600">
              拖拽式界面，直观构建复杂的工作流，支持条件分支和循环逻辑
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">实时执行</h3>
            <p className="text-gray-600">
              实时监控工作流执行状态，调试和优化智能体行为
            </p>
          </div>
        </div>
      </div>

      {/* Demo Preview */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
          工作流示例
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">输入</div>
            <div className="text-gray-400">→</div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">LLM处理</div>
            <div className="text-gray-400">→</div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full">工具调用</div>
            <div className="text-gray-400">→</div>
            <div className="px-4 py-2 bg-red-100 text-red-800 rounded-full">输出</div>
          </div>
        </div>
      </div>
    </div>
  );
}