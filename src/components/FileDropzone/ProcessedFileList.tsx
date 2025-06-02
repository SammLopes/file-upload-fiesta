import React from 'react';
import { FileText, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ImageProcessedList from "./index.tsx";
import { Eye } from 'lucide-react';

interface ProcessedFile {
    name: string;
    size: number;
    url: string;
}

export interface ImageProcessedList {
    filename: string;
    img_bytes: string;
    image_url: string;
    bytes: number;
}

interface ProcessedFileListProps {
    files: ImageProcessedList[];
    resetProcess: () => void;
    downloadImage: (imageUrl: string, filename?: string) => void;
    removeFile: (index: number, isProcessed: boolean) => void;
    verImage: (imageUrl:string) => void;
}

const ProcessedFileList: React.FC<ProcessedFileListProps> = ({
    files,
    resetProcess,
    downloadImage,
    removeFile,
    verImage
}) => {
    const teste = (file: ImageProcessedList) => {
        console.log(file.image_url);
        console.log(file.filename);
        console.log(file.bytes);
        console.log( file);
    }
    if (files.length === 0) return null;
    console.log(" Lista de arquivos ",files);
    return (
        <div className="mt-8">
            <h3 className="text-lg text-center font-medium text-gray-700 mb-4">Imagens processadas</h3>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {files.map((file, index) => (

                        <li key={index} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">

                            <div className="flex items-center">
                                <FileText className="h-6 w-6 text-ilovepdf-blue mr-3"/>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{file.filename}</p>
                                    <p className="text-xs text-gray-500">{(file.bytes / 1024 / 1024).toFixed(2)} MB</p>
                                </div>

                            </div>

                            <div>
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        teste(file);
                                        downloadImage(file.image_url, file.filename);
                                    }}
                                    className="bg-ilovepdf-blue hover:bg-ilovepdf-darkblue">
                                    <Download size={18}/>
                                </Button>
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        verImage(file.image_url);
                                    }}
                                    className="bg-gray-500 hover:bg-gray-700 ml-2">
                                    <Eye size={18}/>
                                </Button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index, true);
                                    }}
                                    className="text-gray-400 hover:text-ilovepdf-red p-1 ml-1 rounded-full hover:bg-gray-100"
                                >
                                    <X size={18}/>
                                </button>

                            </div>

                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProcessedFileList;
