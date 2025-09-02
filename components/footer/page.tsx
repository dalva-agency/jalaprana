'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Instagram, MapPin, Phone } from 'lucide-react';
import jalapranaLogo from '@/assets/images/jalaprana-logo.png';

const Footer = () => {
  return (
    <footer className="bg-green-base text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Logo and Tagline Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-full  mb-4">
                <Image src={jalapranaLogo} alt="Jalaprana" width={300} height={300} className="w-40 h-40" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Contact</h4>
              <div className="space-y-3">
                <a href="mailto:hello@jalaprana.io" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">hello@jalaprana.io</span>
                </a>

                <a href="tel:+33651000000" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+33 6 51 00 00 00</span>
                </a>

                <a href="https://instagram.com/jalaprana" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">@jalaprana</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Adresse</h4>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-center md:text-left">
                  <p>123 Rue de la Paix</p>
                  <p>68100 Mulhouse</p>
                  <p>France</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center md:items-start h-full ">
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Prêt à commencer?</h4>
              <Link
                href="/contact"
                className="inline-block btn-green-base border-1 hover:bg-green-base hover:border-white hover:text-white bg-white text-green-base rounded-full transition-all duration-300 text-sm"
              >
                Prendre Rendez-vous
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center sm:text-left">© 2025 Jalaprana. Tous droits réservés.</p>

            <div className="flex gap-6">
              <Link href="/mentions-legales" className="text-xs text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-xs text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
