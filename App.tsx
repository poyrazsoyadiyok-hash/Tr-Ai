
import React, { useState, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import * as geminiService from './services/geminiService';
import { MODELS } from './constants';
import type { ModelType, Message } from './types';

function App() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('KumruPro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeChat = useCallback(() => {
    try {
      const newChat = geminiService.startChat(MODELS[selectedModel]);
      setChat(newChat);
      setMessages([]);
      setError(null);
    } catch (e: any) {
      console.error("Failed to initialize chat:", e);
      setError(`Sohbet başlatılamadı: ${e.message}`);
    }
  }, [selectedModel]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = async (input: string) => {
    if (!chat) return;

    setIsLoading(true);
    setError(null);
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const stream = await geminiService.sendMessageStream(chat, input);
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        modelResponse += text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }
    } catch (e: any) {
      console.error("Error sending message:", e);
      const errorMessage = `Mesaj gönderilirken bir hata oluştu: ${e.message}`;
      setError(errorMessage);
       setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'model' && newMessages[newMessages.length - 1].content === '') {
          newMessages.pop();
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (model: ModelType) => {
    if (model !== selectedModel) {
      setSelectedModel(model);
    }
  };

  const handleNewChat = () => {
    initializeChat();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen antialiased">
      <Sidebar
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        error={error}
      />
    </div>
  );
}

export default App;
