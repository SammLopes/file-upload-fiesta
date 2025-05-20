
import React from 'react';
import Header from '../components/Header';
import FileDropzone from '../components/FileDropzone';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Manipule seus arquivos PDF</h2>
            <p className="mt-3 text-xl text-gray-600">
              Ferramenta online gratuita para trabalhar com arquivos PDF
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <FileDropzone />
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
              Como funciona
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-ilovepdf-lightblue h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-ilovepdf-blue text-xl font-bold">1</span>
                </div>
                <h4 className="mt-4 text-lg font-medium text-gray-700">Selecione arquivos</h4>
                <p className="mt-2 text-gray-600 text-sm">
                  Selecione os arquivos do seu dispositivo ou arraste e solte-os na área de upload.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-ilovepdf-lightblue h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-ilovepdf-blue text-xl font-bold">2</span>
                </div>
                <h4 className="mt-4 text-lg font-medium text-gray-700">Processar arquivos</h4>
                <p className="mt-2 text-gray-600 text-sm">
                  Clique em processar para iniciar a conversão ou manipulação dos seus arquivos PDF.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-ilovepdf-lightblue h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-ilovepdf-blue text-xl font-bold">3</span>
                </div>
                <h4 className="mt-4 text-lg font-medium text-gray-700">Faça download</h4>
                <p className="mt-2 text-gray-600 text-sm">
                  Baixe seus arquivos processados diretamente para o seu dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
