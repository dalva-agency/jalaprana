// app/components/Navigation.js
'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const items = ['Bien-être', 'Cours de natation', 'Bienfaits', 'Présentation', 'Contact'];

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderNavLinks = (linkClass = 'block px-3 py-2 rounded-md text-base font-bodoni text-gray-700 hover:text-green-base font-medium') =>
    items.map((item) => (
      <a key={item} href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className={linkClass}>
        {item}
      </a>
    ));

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-gray-200 p-2">Logo</div>
        </div>
        <div className="text-2xl font-bodoni font-semibold">jalaprana</div>

        {/* Desktop nav links removed */}

        {/* Language switcher */}
        <div className="hidden md:flex md:items-center">
          <select className="border-gray-300 rounded-md py-1 px-2 focus:outline-none ">
            <option>EN</option>
            <option>FR</option>
            <option>ES</option>
          </select>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden ">
          <button onClick={toggleMenu} className="p-2 rounded-md cursor-pointer focus:outline-none focus:ring-inset ">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: links + language */}
      <div className={`md:hidden bg-white overflow-hidden cursor-pointer transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {renderNavLinks()}
          <div className="flex justify-center pt-4">
            <select className="border-gray-300 rounded-md py-1 px-2 focus:outline-none ">
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
