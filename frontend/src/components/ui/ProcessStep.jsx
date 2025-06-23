import React from 'react';

export function ProcessStep({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <span className="text-5xl font-bold text-green-600 mb-4">{number}</span>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
