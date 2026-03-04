import { PropertyPanelProps, PropertyField, VariableInputField, TextInput, TextArea, SwitchInput } from './types';

export default function EmailProperties({ data, onChange, availableVariables = [] }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="收件人" hint="多个收件人用逗号分隔">
        <VariableInputField
          value={data.to || ''}
          onChange={(v) => onChange('to', v)}
          variables={availableVariables}
          placeholder="user@example.com"
        />
      </PropertyField>

      <PropertyField label="抄送">
        <VariableInputField
          value={data.cc || ''}
          onChange={(v) => onChange('cc', v)}
          variables={availableVariables}
          placeholder="cc@example.com"
        />
      </PropertyField>

      <PropertyField label="密送">
        <VariableInputField
          value={data.bcc || ''}
          onChange={(v) => onChange('bcc', v)}
          variables={availableVariables}
          placeholder="bcc@example.com"
        />
      </PropertyField>

      <PropertyField label="主题">
        <VariableInputField
          value={data.subject || ''}
          onChange={(v) => onChange('subject', v)}
          variables={availableVariables}
          placeholder="邮件主题"
        />
      </PropertyField>

      <PropertyField label="邮件内容">
        <TextArea
          value={data.body || ''}
          onChange={(v) => onChange('body', v)}
          placeholder="邮件正文内容..."
          rows={6}
        />
      </PropertyField>

      <SwitchInput
        checked={data.isHtml || false}
        onChange={(v) => onChange('isHtml', v)}
        label="HTML 格式"
        description="邮件内容是否为 HTML 格式"
      />

      <div>
        <PropertyField label="附件">
          <div className="space-y-2">
            {(data.attachments || []).map((attachment: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <input
                  type="text"
                  value={attachment.filename}
                  onChange={(e) => {
                    const newAttachments = [...(data.attachments || [])];
                    newAttachments[index] = { ...attachment, filename: e.target.value };
                    onChange('attachments', newAttachments);
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="文件名"
                />
                <button
                  onClick={() => {
                    const newAttachments = (data.attachments || []).filter((_: any, i: number) => i !== index);
                    onChange('attachments', newAttachments);
                  }}
                  className="text-red-500 hover:text-red-700 px-1"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newAttachments = [...(data.attachments || []), { filename: '', variable: '' }];
                onChange('attachments', newAttachments);
              }}
              className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50"
            >
              + 添加附件
            </button>
          </div>
        </PropertyField>
      </div>
    </div>
  );
}