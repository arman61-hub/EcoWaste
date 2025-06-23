import React from 'react';
import { ProcessStep } from '../ui/ProcessStep';

export function Process() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-16 text-gray-800">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <ProcessStep 
            number="01"
            title="Collection"
            description="Smart bins and IoT sensors optimize waste collection routes."
          />
          <ProcessStep 
            number="02"
            title="Processing"
            description="Advanced sorting and conversion of waste into energy pellets."
          />
          <ProcessStep 
            number="03"
            title="Generation"
            description="Clean energy production from processed waste materials."
          />
        </div>
      </div>
    </section>
  );
}
