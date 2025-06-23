import React from 'react';
import { Recycle, Factory, Leaf, BarChart3, Users, Building2 } from 'lucide-react';
import { FeatureCard } from '../ui/FeatureCard';

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Comprehensive Waste Management Solutions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Recycle className="w-10 h-10 text-green-600" />}
            title="Smart Recycling"
            description="Digital tracking system for efficient waste collection and recycling monitoring."
          />
          <FeatureCard 
            icon={<Factory className="w-10 h-10 text-green-600" />}
            title="Waste-to-Energy"
            description="Convert municipal solid waste into bioenergy pellets through torrefaction."
          />
          <FeatureCard 
            icon={<Leaf className="w-10 h-10 text-green-600" />}
            title="Renewable Energy"
            description="Landfill gas collection and conversion into clean, renewable energy."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-10 h-10 text-green-600" />}
            title="Real-time Analytics"
            description="Monitor waste flow and track recycling metrics in real-time."
          />
          <FeatureCard 
            icon={<Users className="w-10 h-10 text-green-600" />}
            title="Community Engagement"
            description="Foster community participation in sustainable waste management."
          />
          <FeatureCard 
            icon={<Building2 className="w-10 h-10 text-green-600" />}
            title="Municipal Integration"
            description="Seamless integration with existing municipal waste management systems."
          />
        </div>
      </div>
    </section>
  );
}