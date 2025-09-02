// app/page.js
'use client'; // Add this since you're using useState and useEffect

import Image from 'next/image';
import React from 'react';
import home_image from '../public/assets/images/Jalaprana-home.jpg';
import BenefitsCard from '@/components/cards/benefitsCard';
import Link from 'next/link';
import jalapranaLogo from '@/assets/images/jalaprana-logo.png';
import { useState, useEffect } from 'react';
import TestimonialCarousel from '@/components/testimonial/carrousel';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate overlay opacity based on scroll position
  // Starts at 0.4 opacity and fades to 0 as user scrolls down
  const overlayOpacity = Math.max(0, 0.2 - scrollY / 600);

  return (
    <div className="relative w-full h-[800px] border-2 border-gray-200 rounded-xl overflow-hidden">
      <Image src={home_image} alt="Meditation by the sea" fill className="object-cover object-bottom" priority />

      {/* Dynamic black overlay that fades with scroll */}
      <div className="absolute inset-0 bg-black transition-opacity duration-300 ease-out" style={{ opacity: overlayOpacity }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col top-20 items-center text-center px-6">
        <div className="font-bodoni font-bold text-3xl sm:text-4xl lg:text-5xl max-w-[800px] space-y-6 mb-4">
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/70"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
              textShadow: `
                inset 0 2px 4px rgba(255, 255, 255, 0.8),
                inset 0 4px 8px rgba(255, 255, 255, 0.6),
                0 2px 4px rgba(0, 0, 0, 0.3),
                0 4px 8px rgba(0, 0, 0, 0.2)
              `,
              filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.4))',
            }}
          >
            Reiki, méditation, et cours de natation
          </h1>
        </div>
        <button
          className="font-medium font-roboto mt-5 py-3 px-8 text-sm rounded-full cursor-pointer transition-all duration-200 
             bg-white/20 backdrop-blur-sm border border-white/30 text-white
             hover:bg-white/30 hover:border-white/50 hover:shadow-lg
             shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
        >
          Prendre rendez-vous
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  const items = [
    { label: 'Reiki', id: 'about', href: '/reiki' },
    { label: 'Méditation', id: 'bien-etre', href: '/meditation' },
    { label: 'Cours de natation', id: 'cours', href: '/natation' },
    { label: 'Présentation', id: 'presentation', href: '/presentation' },
  ];

  return (
    <>
      <div className="flex justify-center">
        <Image src={jalapranaLogo} alt="jalaprana logo" className="h-60 w-60" />
      </div>

      {/* Add the HeroSection here */}
      <section className="relative px-6 mb-8">
        <HeroSection />

        {/* Hero nav: fixed width, visible md+, hidden mobile */}
        <nav className="hidden md:flex absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg py-3 px-6 justify-center space-x-6">
          {items.map((item) => (
            <Link key={item.id} href={item.href} className="text-gray-700 font-bodoni hover:text-green-base font-medium transition whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="py-20">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Offres & Activités</h1>
          <p className="mt-2 text-slate-600">{`Choisissez l'accompagnement qui vous convient.`}</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8 lg:px-20">
          {/* 1) Reiki */}
          <BenefitsCard
            index={0}
            number={1}
            title="Reiki"
            description={`Méthode de soin énergétique visant à rétablir l’équilibre global du corps et de l’esprit. Disponible en présentiel ou à distance.`}
            href="/reiki"
            cta="En savoir plus"
            imageSrc="https://images.unsplash.com/photo-1485808269728-77bb07c059a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVpa2l8ZW58MHx8MHx8fDI%3D"
            imageAlt="Séance de Reiki"
            accent="emerald"
            prices={[{ title: 'Soin complet', amount: 60, duration: '1h - 1h15' }]}
          />

          {/* 2) Méditation */}
          <BenefitsCard
            index={1}
            number={2}
            title="Méditation"
            description={`Pratique mentale qui consiste à porter son attention sur l’instant présent, afin de favoriser la clarté mentale, la détente et la stabilité émotionnelle.`}
            href="/meditation"
            cta="En savoir plus"
            imageSrc="https://images.unsplash.com/photo-1444312645910-ffa973656eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8Mg%3D%3D"
            imageAlt="Séance de méditation"
            accent="amber"
            prices={[{ title: '1 élève', amount: 30, duration: '30min - 45min' }]}
          />

          {/* 3) Activités aquatiques */}
          <BenefitsCard
            index={3}
            number={3}
            title="Cours de natation"
            description={`Apprentissage & perfectionnement : pour évoluer dans l’eau à son rythme selon ses propres objectifs. Les cours s’adressent aux enfants comme aux adultes, du niveau débutant au perfectionnement. `}
            href="/natation"
            cta="En savoir plus"
            imageSrc="https://images.unsplash.com/photo-1562205932-623cd8f3867c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXF1YXRpYyUyMGFjdGl2aXR5JTIwcG9vbHxlbnwwfHwwfHx8Mg%3D%3D"
            imageAlt="Cours en piscine"
            accent="teal"
            prices={[
              { title: '1 élève', amount: 20, duration: '30 min' },
              { title: '2 élèves', amount: 30, duration: '30 min' },
            ]}
          />
        </section>
      </section>

      <section>
        <TestimonialCarousel />
      </section>
    </>
  );
}
