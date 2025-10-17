import React from 'react';
import type { WorkflowVariable } from '../types/workflow';

interface VariableHighlighterProps {
  text: string;
  variables: WorkflowVariable[];
  className?: string;
}

export const VariableHighlighter: React.FC<VariableHighlighterProps> = ({
  text,
  variables,
  className = '',
}) => {
  if (!text) return null;

  // 提取文本中的变量名（格式如 {{variableName}} 或 ${variableName}）
  const variablePattern = /(\{\{[^}]+\}\}|\$\{[^}]+\})/g;
  const parts = text.split(variablePattern);

  return (
    <div className={`text-sm ${className}`}>
      {parts.map((part, index) => {
        // 检查是否是变量格式
        const isVariable = variablePattern.test(part);
        
        if (isVariable) {
          // 提取变量名（去掉 {{ }} 或 ${ }）
          const variableName = part.replace(/[\{\}\$]/g, '');
          const variable = variables.find(v => v.name === variableName);
          
          return (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs font-mono border border-blue-200"
              title={variable ? `类型: ${variable.type}` : '未定义的变量'}
            >
              {part}
            </span>
          );
        }
        
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

// 用于输入框的变量提示组件
interface VariableInputProps {
  value: string;
  onChange: (value: string) => void;
  variables: WorkflowVariable[];
  placeholder?: string;
  className?: string;
}

export const VariableInput: React.FC<VariableInputProps> = ({
  value,
  onChange,
  variables,
  placeholder,
  className = '',
}) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // 检查是否在输入变量
    const lastChar = newValue.slice(-1);
    if (lastChar === '{' || lastChar === '$') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const insertVariable = (variableName: string) => {
    const newValue = value + `{{${variableName}}}`;
    onChange(newValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      {showSuggestions && variables.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 text-xs text-gray-500 border-b border-gray-200">
            可用变量 (输入 {'{'}{'{'} 或 $ 触发提示)
          </div>
          {variables.map((variable) => (
            <button
              key={variable.id}
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm flex justify-between items-center"
              onMouseDown={() => insertVariable(variable.name)}
            >
              <span className="font-mono text-blue-600">{'{'}{'{'}{variable.name}{'}'}{'}'}</span>
              <span className="text-xs text-gray-500 capitalize">{variable.type}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* 预览区域 */}
      {value && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">预览:</div>
          <VariableHighlighter text={value} variables={variables} />
        </div>
      )}
    </div>
  );
};