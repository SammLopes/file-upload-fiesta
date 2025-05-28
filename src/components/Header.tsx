
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import {ChevronDown} from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-ilovepdf-darkblue to-ilovepdf-blue py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">AI Tools</h1>
          <span className="ml-2 bg-white text-ilovepdf-blue text-xs px-2 py-1 rounded-full">
            Beta
          </span>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            <li><a href="#" className="text-white hover:text-ilovepdf-lightblue transition-colors">Início</a></li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-ilovepdf-lightblue transition-colors flex items-center gap-1">
                  Ferramentas
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <DropdownMenuItem>
                    <a href="/" className="w-full text-gray-700 hover:text-ilovepdf-blue">
                      Predição de avc
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </li>
            {/*<li><a href="#" className="text-white hover:text-ilovepdf-lightblue transition-colors">Sobre</a></li>*/}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
