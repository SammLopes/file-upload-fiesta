
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingIndicator from './LoadingIndicator';

interface FileWithPreview extends File {
  preview?: string;
}

const FileDropzone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files) as FileWithPreview[];
      handleFiles(newFiles);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as FileWithPreview[];
      handleFiles(newFiles);
    }
  };

  const handleFiles = (newFiles: FileWithPreview[]) => {
    // Adicionar novos arquivos à lista
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...newFiles];
      toast({
        title: "Arquivos adicionados",
        description: `${newFiles.length} arquivo(s) adicionado(s) com sucesso.`,
      });
      return updatedFiles;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido da lista.",
    });
  };

  const processFiles = () => {
    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo",
        description: "Por favor, adicione pelo menos um arquivo para processar.",
        variant: "destructive"
      });
      return;
    }

    // Mostrar o indicador de carregamento
    setIsProcessing(true);
    setProgress(0);
    
    toast({
      title: "Processando arquivos",
      description: `Processando ${files.length} arquivo(s)...`,
    });
    
    // Simulação de processamento com progresso
    const totalFiles = files.length;
    let processedFiles = 0;
    
    // Simulação de processamento de arquivos com intervalos
    const processInterval = setInterval(() => {
      processedFiles += 1;
      const newProgress = Math.round((processedFiles / totalFiles) * 100);
      setProgress(newProgress);
      
      // Quando todos os arquivos forem processados
      if (processedFiles >= totalFiles) {
        clearInterval(processInterval);
        
        // Adicionar um pequeno atraso antes de concluir para mostrar 100%
        setTimeout(() => {
          setIsProcessing(false);
          setProgress(0);
          setFiles([]);
          
          toast({
            title: "Processamento concluído",
            description: `${totalFiles} arquivo(s) processado(s) com sucesso.`
          });
        }, 500);
      }
    }, 1000); // Processa um arquivo a cada segundo (simulação)
    
    // Em um cenário real, aqui seria implementada a lógica real de processamento
    console.log("Arquivos para processar:", files);
  };

  // Renderização condicional baseada no estado de processamento
  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="border rounded-lg p-8 bg-white shadow-sm">
          <LoadingIndicator 
            message={`Processando ${files.length} arquivo(s)...`} 
            progress={progress} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
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

      {files.length > 0 && (
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
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                processFiles();
              }}
              className="px-8 py-3 bg-ilovepdf-blue hover:bg-ilovepdf-darkblue text-white rounded-md font-medium transition-colors duration-200"
            >
              Processar arquivos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
