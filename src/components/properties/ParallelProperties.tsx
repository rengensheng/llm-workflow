import { PropertyPanelProps, PropertyField, TextInput, NumberInput, SwitchInput } from './types';

export default function ParallelProperties({ data, onChange }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <PropertyField label="分支配置">
          <div className="space-y-2">
            {(data.branches || []).map((branch: any, index: number) => (
              <div key={branch.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getBranchColor(index) }}
                />
                <input
                  type="text"
                  value={branch.label}
                  onChange={(e) => {
                    const newBranches = [...(data.branches || [])];
                    newBranches[index] = { ...branch, label: e.target.value };
                    onChange('branches', newBranches);
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="分支名称"
                />
                <button
                  onClick={() => {
                    const newBranches = (data.branches || []).filter((_: any, i: number) => i !== index);
                    if (newBranches.length >= 2) {
                      onChange('branches', newBranches);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 px-1"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newId = `branch-${Date.now()}`;
                const newBranches = [...(data.branches || []), { id: newId, label: `Branch ${(data.branches || []).length + 1}` }];
                onChange('branches', newBranches);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加分支
            </button>
          </div>
        </PropertyField>
      </div>

      <SwitchInput
        checked={data.waitForAll ?? true}
        onChange={(v) => onChange('waitForAll', v)}
        label="等待所有分支完成"
        description="开启则等待所有分支完成，关闭则在任一分支完成后继续"
      />

      <PropertyField label="超时时间 (毫秒)" hint="所有分支的最大执行时间">
        <NumberInput
          value={data.timeout || 30000}
          onChange={(v) => onChange('timeout', v)}
          min={1000}
        />
      </PropertyField>
    </div>
  );
}

function getBranchColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  return colors[index % colors.length];
}