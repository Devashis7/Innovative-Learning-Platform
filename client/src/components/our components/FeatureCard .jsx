import React from 'react'

const FeatureCard = ({ number, title, description }) => (
  <div className="bg-[#1e2a44] p-6 rounded-lg shadow-lg text-center text-white">
    <h2 className="text-rose-500 text-4xl font-bold mb-4">{number}</h2>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export default FeatureCard 
