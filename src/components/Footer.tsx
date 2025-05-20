
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-ilovepdf-blue">iLovePDF Clone</h3>
            <p className="mt-2 text-sm text-gray-500">
              Exemplo de interface para upload de arquivos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Ferramentas</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-ilovepdf-blue">Comprimir PDF</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Unir PDF</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Dividir PDF</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Sobre</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-ilovepdf-blue">Empresa</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Contato</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-ilovepdf-blue">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Privacidade</a></li>
                <li><a href="#" className="hover:text-ilovepdf-blue">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2025 iLovePDF Clone. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
