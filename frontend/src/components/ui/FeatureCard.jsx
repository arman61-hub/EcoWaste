import React from 'react';

export function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="mb-4 bg-green-100 p-3 rounded-full">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}