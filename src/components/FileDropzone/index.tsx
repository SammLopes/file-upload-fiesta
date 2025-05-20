
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import LoadingIndicator from '../LoadingIndicator';
import DropArea from './DropArea';
import FileList from './FileList';
import ImagePreview from './ImagePreview';
import { Button } from '../ui/button';

interface FileWithPreview extends File {
  preview?: string;
}

const FileDropzone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
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

  const resetProcess = () => {
    setProcessedImage(null);
    setFiles([]);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    // Criar um link de download para a imagem
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'documento-processado.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: "O download da imagem foi iniciado com sucesso."
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
    setProcessedImage(null);
    
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
          
          // Simulação de imagem processada (usando uma imagem placeholder)
          setProcessedImage('https://via.placeholder.com/600x800.png?text=PDF+Processado');
          
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

  // Renderização para imagem processada
  if (processedImage) {
    return (
      <ImagePreview
        imageUrl={processedImage}
        downloadImage={downloadImage}
        resetProcess={resetProcess}
      />
    );
  }

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
      <DropArea
        isDragging={isDragging}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        handleFileInput={handleFileInput}
      />
      
      <FileList
        files={files}
        removeFile={removeFile}
      />
      
      {files.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              processFiles();
            }}
            className="px-8 py-3 bg-ilovepdf-blue hover:bg-ilovepdf-darkblue text-white"
          >
            Processar arquivos
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
