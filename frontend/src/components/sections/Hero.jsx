import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80" alt="Sustainable city" className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-green-900/70"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Smart Waste Management for a Sustainable Future
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Transform waste into energy while building net-zero communities through innovative technology and sustainable solutions
        </p>
        <button  onClick={scrollToFeatures} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto">
          Learn More <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}