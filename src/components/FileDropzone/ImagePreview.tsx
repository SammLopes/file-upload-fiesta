
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface ImagePreviewProps {
  imageUrl: string;
  downloadImage: () => void;
  resetProcess: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  downloadImage, 
  resetProcess 
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="border rounded-lg p-8 bg-white shadow-sm">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Documento processado</h3>
          
          <div className="mb-6 border shadow-sm rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt="PDF processado" 
              className="max-w-full h-auto" 
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={downloadImage}
              className="bg-ilovepdf-blue hover:bg-ilovepdf-darkblue"
            >
              <Download size={18} className="mr-2" />
              Baixar imagem
            </Button>
            
            <Button 
              onClick={resetProcess}
              variant="outline"
            >
              Processar novos arquivos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
