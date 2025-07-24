'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
          </div>

          {/* Name in the center */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <span className="text-xl font-semibold">jalapran</span>
          </div>

          {/* Language switcher on the right */}
          <div className="hidden md:flex md:items-center">
            <select className="border border-gray-300 rounded-md py-1 px-2 transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>EN</option>
              <option>FR</option>
              <option>ES</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              {isOpen ? <X className="h-6 w-6 transition-transform duration-200" /> : <Menu className="h-6 w-6 transition-transform duration-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {/* Centered name for mobile */}
          <div className="flex justify-center pb-4">
            <span className="text-xl font-semibold">jalapran</span>
          </div>

          {/* Language switcher */}
          <div className="flex justify-center pb-4">
            <select className="border border-gray-300 rounded-md py-1 px-2 transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>EN</option>
              <option>FR</option>
              <option>ES</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
