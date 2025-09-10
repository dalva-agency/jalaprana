// app/components/Navigation.js
'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import jalapranaLogo from '@/assets/images/jalaprana-logo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Alternative: If you want some items to be separate pages
  const items = [
    { label: 'Reiki', id: 'about', href: '/reiki' },
    { label: 'Méditation', id: 'bien-etre', href: '/meditation' },
    { label: 'Cours de natation', id: 'cours', href: '/natation' },
    { label: 'Présentation', id: 'presentation', href: '/presentation' },
    { label: 'Contact', id: 'contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const renderNavLinks = (linkClass = 'block px-3 py-2 rounded-md text-base font-bodoni text-gray-700 hover:text-green-base font-medium') =>
    items.map((item) => (
      <Link key={item.id} href={item.href} className={linkClass} onClick={handleLinkClick}>
        {item.label}
      </Link>
    ));

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={jalapranaLogo} alt="jalaprana logo" className="h-25 w-25" />
            </Link>
          </div>
        </div>
        <div className="text-2xl font-bodoni font-semibold pr-10">
          <Link href="/">jalaprana</Link>
        </div>

        {/* Desktop nav links */}

        {/* Language switcher */}
        <div className="hidden md:flex md:items-center">
          <select className="border-gray-300 rounded-md py-1 px-2 focus:outline-none">
            <option>EN</option>
            <option>FR</option>
            <option>ES</option>
          </select>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="p-2 rounded-md cursor-pointer focus:outline-none focus:ring-inset">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: links + language */}
      <div className={`md:hidden bg-white overflow-hidden cursor-pointer transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {renderNavLinks()}
          <div className="flex justify-center pt-4">
            <select className="border-gray-300 rounded-md py-1 px-2 focus:outline-none">
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
