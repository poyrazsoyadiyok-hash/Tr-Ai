
import React from 'react';
import { ModelSelector } from './ModelSelector';
import { KumruIcon } from './icons/KumruIcon';
import { APP_NAME } from '../constants';
import type { ModelType } from '../types';

interface SidebarProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedModel, onModelChange, onNewChat }) => {
  return (
    <div className="bg-kumru-gray-800 w-full md:w-80 p-4 flex flex-col h-full border-r border-kumru-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <KumruIcon className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-kumru-gray-200">{APP_NAME}</h1>
      </div>
      
      <div className="flex-grow">
        <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
      </div>

      <div>
        <button
          onClick={onNewChat}
          className="w-full bg-kumru-purple hover:bg-kumru-purple-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Yeni Sohbet
        </button>
      </div>
    </div>
  );
};
