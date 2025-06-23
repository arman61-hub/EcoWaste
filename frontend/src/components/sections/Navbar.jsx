import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="./eco-energy.svg" className='w-15' alt="" />
            <span className="text-5xl font-serif font-extrabold text-green-600 tracking-wide">EcoWaste</span>
          </div>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
