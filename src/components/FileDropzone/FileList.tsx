
import React from 'react';
import { FileText, X } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileListProps {
  files: FileWithPreview[];
  removeFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, removeFile }) => {
  if (files.length === 0) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Arquivos selecionados</h3>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-ilovepdf-blue mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-gray-400 hover:text-ilovepdf-red p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
