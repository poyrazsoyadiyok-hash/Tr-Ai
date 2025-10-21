import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { KumruIcon } from './icons/KumruIcon';
import type { Message } from '../types';

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-kumru-gray-600 flex items-center justify-center font-bold text-kumru-gray-200">
      S
    </div>
);

const CodeBlock: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline ? (
    <div className="bg-kumru-gray-900 my-4 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-kumru-gray-800 px-4 py-2 text-xs text-kumru-gray-400">
        <span>{match ? match[1] : 'code'}</span>
        <button
          onClick={() => navigator.clipboard.writeText(String(children))}
          className="hover:text-white transition-colors"
        >
          Kopyala
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`text-sm ${className}`} {...props}>
          {String(children).replace(/\n$/, '')}
        </code>
      </pre>
    </div>
  ) : (
    <code className="bg-kumru-gray-700 text-kumru-purple-light rounded px-1.5 py-1 text-sm" {...props}>
      {children}
    </code>
  );
};


export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 py-6 ${!isModel ? 'bg-kumru-gray-900' : 'bg-kumru-gray-800/50'}`}>
        <div className="w-8 h-8 flex-shrink-0">
            {isModel ? <KumruIcon className="w-full h-full" /> : <UserIcon />}
        </div>
        <div className="flex-grow pt-1.5 overflow-hidden">
            <div className="prose prose-invert prose-p:text-kumru-gray-200 prose-li:text-kumru-gray-200 max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ code: CodeBlock }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    </div>
  );
};