import React from 'react';

export function ImpactStat({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-bold text-green-300">{value}</span>
      <p className="text-lg mt-2">{label}</p>
    </div>
  );
}
