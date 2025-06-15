
import React, {useState, useCallback, useEffect} from 'react';
import { useToast } from '@/hooks/use-toast';
import LoadingIndicator from '../LoadingIndicator';
import DropArea from './DropArea';
import FileList from './FileList';
import { Button } from '../ui/button';
import axios from 'axios';
import {enviroments} from "@/enviroments.ts";
import ProcessedFileList from "@/components/FileDropzone/ProcessedFileList.tsx";
import {ImageProcessedList} from "@/components/FileDropzone/ProcessedFileList.tsx";
interface FileWithPreview extends File {
  preview?: string;
}

const FileDropzone = () => {

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImages, setProcessedImage] = useState<string[]>([]);
  const { toast } = useToast();
  const [imageList, setImageList] = useState<ImageProcessedList[]>([]);
  const urlPredict = `${enviroments.urlApiLocal}/predict`;
  const urlStatus = `${enviroments.urlApiLocal}/status`;
  const urlCleanup = `${enviroments.urlApiLocal}/cleanup`;

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
      if( ( files.length + newFiles.length ) > 5 || newFiles.length > 5 ) {
        return toast({
            title: "Atenção",
            description: "Você está enviando mais de 5 arquivos, o que não é permitido.",
            variant: "destructive"
        })
      }
      handleFiles(newFiles);
    }
  };

  const handleFiles = (newFiles: FileWithPreview[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    toast({
      title: "Arquivos adicionados",
      description: `${newFiles.length} arquivo(s) adicionado(s) com sucesso.`,
    });
  };

  const removeFile = (index: number, isProcessed: boolean) => {
    if (isProcessed) {
      setImageList(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    }
    if (!isProcessed) {
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    }
    
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido da lista.",
    });
  };

  const resetProcess = () => {
    setProcessedImage(null);
    setFiles([]);
  };

  const downloadImage = async (imageUrl: string, filename: string) => {

    const response = await fetch(imageUrl, {mode: 'cors'});
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast({
      title: "Download iniciado",
      description: "O download da imagem foi iniciado com sucesso."
    });
  };

  const cleanup = async () => {
    try {
      await axios.post(urlCleanup);
      console.log("Limpeza de arquivos temporários concluída.");
    } catch (error) {
      console.error("Erro ao limpar arquivos temporários:", error);
    }
  };

  const status = async () => {
    try {
      const response = await axios.get(urlStatus);
      console.log("Status dos arquivos:", response.data);
      const quantityFiles = response.data.total_arquivos
      return quantityFiles > 10;
    } catch (error) {
      console.error("Erro ao obter status dos arquivos:", error);
      return false;
    }
  }

  const processFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo",
        description: "Por favor, adicione pelo menos um arquivo para processar.",
        variant: "destructive"
      });
      return;
    }

    if ( files.length > 5 ){
      toast({
        title:"Atenção",
        description: "Você está enviando mais de 5 arquivos, o que não é premitido.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessedImage(null);

    toast({
      title: "Processando arquivos",
      description: `Processando ${files.length} arquivo(s)...`,
    });

    const formData = new FormData();
    files.forEach(file => {
      formData.append("file", file);
    });

    try {
      const cleaningFiles = await status();
      if( cleaningFiles ) {
        await cleanup();
      }

      const response = await axios.post(urlPredict, formData, {
        headers: {
          'Content-Type':'multipart/form-data',
        },
        onUploadProgress: ( progressEvent ) => {
          const percent = Math.round( (progressEvent.loaded * 100) / ( progressEvent.total|| 1) )
          setProgress(percent);
        }
      }).then(response => {
          const data =  response.data;

          const urls = data.map( item => `${enviroments.urlApiLocal}${item.img_bytes}`);
          setProcessedImage( urls );
          const listImages: ImageProcessedList[] = data.map( item => {
              return {
                filename: item.filename,
                img_bytes: item.img_bytes,
                image_url: `${enviroments.urlApiLocal}${item.img_bytes}`,
                bytes: item.size_bytes,
              }
          });
          console.log("Resposta ", response);
          setImageList(listImages);

          toast({
            title: "Processamento concluído",
            description: `${files.length} arquivo(s) processado(s) com sucesso.`,
          });

      }).catch(error => {
        console.log(error);
      });

    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message,
        variant: 'destructive'
      })
    } finally {
      setIsProcessing(false);
      setProgress(100)
    }
  }

  const verImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  }

  useEffect(()=>{
    if(imageList.length === 0){
      resetProcess()
    }
  }, [imageList]);

  if (( processedImages ?? []).length > 0 ) {
    return (
        <div className="container mx-auto px-4 py-6">
            <ProcessedFileList
              files={imageList}
              resetProcess={resetProcess}
              downloadImage={downloadImage}
              removeFile={removeFile}
              verImage={verImage}
            />
            <div className=" flex justify-end mt-3">
              <Button onClick={resetProcess} variant="outline">
                Processar novos arquivos
              </Button>
            </div>

        </div>
    );
  }

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
