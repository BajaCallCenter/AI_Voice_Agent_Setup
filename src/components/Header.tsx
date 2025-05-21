import React from 'react';
import { Mic } from 'lucide-react';
import logo from '../assets/voicemedia-05.png';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="VoiceMedia Logo"
            className="h-11 w-auto mr-10 ml-2 md:ml-0"
          />
          <Mic className="h-8 w-8 text-[#AA01BC]" />
          <h1 className="text-2xl font-semibold text-black">AI Voice Agent Setup</h1>
        </div>
        <p className="text-sm text-black hidden md:block">Complete this form to configure your AI voice agent</p>
      </div>
    </header>
  );
};

export default Header;
