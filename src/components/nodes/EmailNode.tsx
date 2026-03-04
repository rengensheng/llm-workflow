import { Mail } from 'lucide-react';
import type { NodeProps } from 'reactflow';
import type { EmailNodeData } from '../../types/workflow';
import BaseNode from './BaseNode';

export default function EmailNode(props: NodeProps<EmailNodeData>) {
  const { data } = props;

  const attachmentCount = data.attachments?.length || 0;

  return (
    <BaseNode
      {...props}
      icon={<Mail className="w-5 h-5" />}
      title={data.label}
      subtitle="邮件发送"
      gradient="from-red-500 to-rose-600"
    >
      <div className="text-xs text-gray-600 space-y-2">
        {data.to && (
          <div className="flex justify-between items-center">
            <span>收件人:</span>
            <span className="text-red-600 truncate max-w-[120px]" title={data.to}>
              {data.to}
            </span>
          </div>
        )}

        {data.cc && (
          <div className="flex justify-between items-center">
            <span>抄送:</span>
            <span className="text-gray-500 truncate max-w-[100px]" title={data.cc}>
              {data.cc}
            </span>
          </div>
        )}

        {data.subject && (
          <div className="truncate text-gray-700" title={data.subject}>
            主题: {data.subject}
          </div>
        )}

        {data.body && (
          <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-gray-600 max-h-12 overflow-hidden">
            {data.body.substring(0, 60)}
            {data.body.length > 60 && '...'}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>格式:</span>
          <span className={data.isHtml ? 'text-blue-600' : 'text-gray-600'}>
            {data.isHtml ? 'HTML' : '纯文本'}
          </span>
        </div>

        {attachmentCount > 0 && (
          <div className="flex justify-between items-center">
            <span>附件:</span>
            <span className="text-rose-600">{attachmentCount} 个</span>
          </div>
        )}

        {data.smtpConfig && (
          <div className="text-xs text-gray-400">
            SMTP: {data.smtpConfig.host}:{data.smtpConfig.port}
          </div>
        )}
      </div>
    </BaseNode>
  );
}