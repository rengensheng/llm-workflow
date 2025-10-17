import { Save, Play, Settings, Download, Upload } from 'lucide-react';
import type { Workflow } from '../types/workflow';

interface WorkflowToolbarProps {
  onSave: () => void;
  onRun: () => void;
  workflow: Workflow;
}

export default function WorkflowToolbar({ onSave, onRun, workflow }: WorkflowToolbarProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${workflow.name.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedWorkflow = JSON.parse(e.target?.result as string);
        // Validate imported workflow structure here
        console.log('Imported workflow:', importedWorkflow);
        alert('Workflow imported successfully! (This would update the current workflow in a real app)');
      } catch (error) {
        alert('Error importing workflow: Invalid JSON format');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Import Button */}
      <label className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
        <Upload className="w-4 h-4" />
        <span>Import</span>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>

      {/* Save Button */}
      <button
        onClick={onSave}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
      >
        <Save className="w-4 h-4" />
        <span>Save</span>
      </button>

      {/* Run Button */}
      <button
        onClick={onRun}
        className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
      >
        <Play className="w-4 h-4" />
        <span>Run</span>
      </button>

      {/* Settings Button */}
      <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </button>
    </div>
  );
}