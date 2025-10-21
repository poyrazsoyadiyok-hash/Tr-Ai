
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { KumruIcon } from './icons/KumruIcon';
import type { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  error: string | null;
}

const WelcomeScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <KumruIcon className="w-24 h-24 mb-4 text-kumru-purple" />
        <h2 className="text-4xl font-bold text-white">kumru.com</h2>
        <p className="mt-2 text-lg text-kumru-gray-400">Sohbete başlamak için bir model seçin ve mesaj gönderin.</p>
    </div>
);

const LoadingIndicator: React.FC = () => (
    <div className="flex items-start gap-4 py-6 bg-kumru-gray-800/50">
        <div className="w-8 h-8 flex-shrink-0">
            <KumruIcon className="w-full h-full animate-pulse" />
        </div>
        <div className="flex items-center pt-1.5 space-x-1">
           <span className="w-2 h-2 bg-kumru-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           <span className="w-2 h-2 bg-kumru-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
           <span className="w-2 h-2 bg-kumru-gray-400 rounded-full animate-bounce"></span>
        </div>
    </div>
);


export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage, error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col bg-kumru-gray-900 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4">
          {messages.length === 0 && !isLoading ? (
            <WelcomeScreen />
          ) : (
            <>
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              {isLoading && <LoadingIndicator />}
               <div ref={scrollRef} />
            </>
          )}
        </div>
         {error && (
            <div className="max-w-4xl mx-auto px-4 my-4">
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
                <strong>Hata:</strong> {error}
              </div>
            </div>
          )}
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
