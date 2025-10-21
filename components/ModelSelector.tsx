
import React from 'react';
import type { ModelType } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

const ModelOption: React.FC<{
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, description, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
      isSelected
        ? 'bg-kumru-purple/20 border-kumru-purple'
        : 'bg-kumru-gray-700 border-kumru-gray-600 hover:border-kumru-gray-400'
    }`}
  >
    <p className="font-semibold text-kumru-gray-200">{label}</p>
    <p className="text-sm text-kumru-gray-400">{description}</p>
  </button>
);


export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-kumru-gray-400 uppercase tracking-wider">Model</h3>
      <div className="space-y-2">
        <ModelOption
          label="KumruPro"
          description="Daha iyi kod yazar."
          isSelected={selectedModel === 'KumruPro'}
          onClick={() => onModelChange('KumruPro')}
        />
        <ModelOption
          label="KumruFlash"
          description="Acemi ve hızlı yazar."
          isSelected={selectedModel === 'KumruFlash'}
          onClick={() => onModelChange('KumruFlash')}
        />
      </div>
    </div>
  );
};
