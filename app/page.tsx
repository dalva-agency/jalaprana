// app/page.js
import Image from 'next/image';
import React from 'react';
import home_image from '../public/assets/images/home_image.jpg';

export default function Page() {
  const items = ['Bien-être', 'Cours de natation', 'Bienfaits', 'Présentation', 'Contact'];

  return (
    <section className="relative w-full flex justify-center py-6">
      <div className="relative w-full max-w-7xl h-[800px] border-2 border-gray-200 rounded-xl overflow-hidden">
        <Image src={home_image} alt="Meditation by the sea" fill className="object-cover object-bottom" priority />

        {/* Dark overlay + text */}
        <div className="absolute inset-0 flex flex-col top-20 items-center text-center px-6">
          <div className="font-bodoni text-black font-bold text-3xl sm:text-4xl lg:text-5xl max-w-[800px] space-y-6 mb-4">
            <h1>
              Prenez soin <span className="italic font-normal"> de votre corps</span>
            </h1>
            <p>apaisez votre esprit et domptez l’eau avec sérénité</p>
          </div>
          <p className="text-md text-black font-roboto font-normal mb-6 max-w-xl pt-4">Reiki, méditation, et cours de natation</p>
          <button className="btn-base font-medium font-roboto py-2 px-6 text-sm rounded-full transition-all duration-200">Prendre rendez-vous</button>
        </div>
      </div>

      {/* Hero nav: fixed width, visible md+, hidden mobile */}
      <nav className="hidden md:flex absolute bottom-0 left-1/2 transform -translate-x-1/2  bg-white rounded-full shadow-lg py-3 px-6 justify-center space-x-6">
        {items.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="text-gray-700 font-bodoni hover:text-green-base font-medium transition whitespace-nowrap">
            {item}
          </a>
        ))}
      </nav>
    </section>
  );
}
