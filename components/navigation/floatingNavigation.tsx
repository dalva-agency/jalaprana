'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import jalapranaLogo from '@/assets/images/jalaprana-logo.png';

export default function FloatingNavigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const items = [
    { label: 'Reiki', id: 'reiki', href: '/reiki' },
    { label: 'Méditation', id: 'meditation', href: '/meditation' },
    { label: 'Cours de natation', id: 'natation', href: '/natation' },
    { label: 'Présentation', id: 'presentation', href: '/presentation' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mounted]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 ${mounted ? (isVisible ? 'translate-y-0' : '-translate-y-full') : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src={jalapranaLogo} alt="jalaprana logo" className="h-24 w-24" width={60} height={60} />
              {/* <span className="text-xl font-bodoni font-semibold">jalaprana</span> */}
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => (
              <Link key={item.id} href={item.href} className="px-4 py-2 rounded-md text-sm font-bodoni text-gray-700 hover:text-green-base hover:bg-gray-50 transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language switcher - Desktop */}
          <div className="hidden md:flex items-center">
            <select className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-base">
              <option>FR</option>
              <option>EN</option>
              <option>ES</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md cursor-pointer focus:outline-none focus:ring-inset">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {items.map((item) => (
            <Link key={item.id} href={item.href} className="block px-3 py-2 rounded-md text-base font-bodoni text-gray-700 hover:text-green-base font-medium" onClick={handleLinkClick}>
              {item.label}
            </Link>
          ))}
          <div className="flex justify-center pt-4">
            <select className="border-gray-300 rounded-md py-1 px-2 focus:outline-none">
              <option>FR</option>
              <option>EN</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
