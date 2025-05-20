
import React from 'react';
import { Loader } from 'lucide-react';
import { Progress } from './ui/progress';

interface LoadingIndicatorProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

const LoadingIndicator = ({
  message = "Processando arquivos...",
  showProgress = true,
  progress = 0
}: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="animate-spin text-ilovepdf-blue">
        <Loader size={40} />
      </div>
      <p className="text-gray-700 font-medium text-center">{message}</p>
      
      {showProgress && (
        <div className="w-full max-w-xs">
          <Progress value={progress} className="h-2 bg-gray-200" />
          <p className="text-sm text-gray-500 text-center mt-2">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;
