
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-kumru-gray-800/80 backdrop-blur-sm p-4 border-t border-kumru-gray-700"
    >
      <div className="relative max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Kumru'ya bir mesaj gönder..."
          rows={1}
          className="w-full bg-kumru-gray-700 text-kumru-gray-200 rounded-lg py-3 pl-4 pr-12 resize-none border border-transparent focus:outline-none focus:ring-2 focus:ring-kumru-purple transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-kumru-purple enabled:hover:bg-kumru-purple-dark text-white"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
