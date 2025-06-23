import React from 'react';
import { ImpactStat } from '../ui/ImpactStat';

export function Impact() {
  return (
    <section className="py-20 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-16">
          Our Environmental Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <ImpactStat 
            value="60%"
            label="Reduction in Landfill Waste"
          />
          <ImpactStat 
            value="40%"
            label="Lower GHG Emissions"
          />
          <ImpactStat 
            value="80%"
            label="Waste-to-Energy Conversion"
          />
        </div>
      </div>
    </section>
  );
}
