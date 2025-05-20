
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-ilovepdf-darkblue to-ilovepdf-blue py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">iLovePDF</h1>
          <span className="ml-2 bg-white text-ilovepdf-blue text-xs px-2 py-1 rounded-full">
            Clone
          </span>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white hover:text-ilovepdf-lightblue transition-colors">Início</a></li>
            <li><a href="#" className="text-white hover:text-ilovepdf-lightblue transition-colors">Ferramentas</a></li>
            <li><a href="#" className="text-white hover:text-ilovepdf-lightblue transition-colors">Sobre</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
