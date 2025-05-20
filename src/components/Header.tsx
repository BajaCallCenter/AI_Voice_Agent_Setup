import React from 'react';
import { Mic } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <div className="flex items-center space-x-2">
          <Mic className="h-8 w-8 text-[#AA01BC]" />
          <h1 className="text-2xl font-semibold text-neutral-800">AI Voice Agent Setup</h1>
        </div>
        <p className="text-sm text-neutral-500 hidden md:block">Complete this form to configure your AI voice agent</p>
      </div>
    </header>
  );
};

export default Header;