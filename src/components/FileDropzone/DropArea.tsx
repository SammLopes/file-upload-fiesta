
import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface DropAreaProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropArea: React.FC<DropAreaProps> = ({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  handleFileInput
}) => {
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 ${
        isDragging 
          ? 'border-ilovepdf-blue bg-ilovepdf-lightblue' 
          : 'border-gray-300 bg-white hover:bg-gray-50'
      } transition-colors duration-200 cursor-pointer`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <div className="flex flex-col items-center justify-center py-10">
        {isDragging ? (
          <div className="animate-pulse-scale text-ilovepdf-blue">
            <Upload size={64} strokeWidth={1.5} />
          </div>
        ) : (
          <div className="text-gray-400">
            <Upload size={64} strokeWidth={1.5} />
          </div>
        )}
        
        <h3 className="mt-4 text-xl font-medium text-gray-700">
          Arraste seus arquivos aqui
        </h3>
        <p className="mt-2 text-sm text-gray-500 text-center">
          ou clique para selecionar arquivos do seu computador
        </p>
        
        <input 
          id="fileInput" 
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileInput} 
        />
        
        <button
          className="mt-6 px-6 py-2 bg-ilovepdf-blue hover:bg-ilovepdf-darkblue text-white rounded-md transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById('fileInput')?.click();
          }}
        >
          Selecionar arquivos
        </button>
      </div>
    </div>
  );
};

export default DropArea;
