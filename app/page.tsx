// app/page.js
import Image from 'next/image';
import React from 'react';
import home_image from '../public/assets/images/home_image.jpg';
import BenefitsCard from '@/components/cards/benefitsCard';

export default function Page() {
  const items = ['Bien-être', 'Cours de natation', 'Bienfaits', 'Présentation', 'Contact'];

  return (
    <>
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
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
              className="text-gray-700 font-bodoni hover:text-green-base font-medium transition whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </nav>
      </section>

      <section className="mt-20">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Offres & Activités</h1>
          <p className="mt-2 text-slate-600">Choisissez l'accompagnement qui vous convient.</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1) Reiki */}
          <BenefitsCard
            index={0}
            number={1}
            title="Reiki"
            description={`Méthode de soin énergétique visant à rétablir l’équilibre global du corps et de l’esprit. Par l’apposition des mains, le praticien canalise une énergie naturelle pour favoriser la relaxation profonde, réduire le stress et accompagner les mécanismes d’autorégulation de l’organisme.`}
            href="#reiki"
            cta="Réserver"
            imageSrc="https://images.unsplash.com/photo-1485808269728-77bb07c059a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVpa2l8ZW58MHx8MHx8fDI%3D"
            imageAlt="Séance de Reiki"
            accent="emerald"
            prices={[
              { title: 'Soin complet', amount: 60, duration: '1h' },
              { title: 'Centres énergétiques', amount: 35, duration: '30 min' },
            ]}
          />

          {/* 2) Méditation */}
          <BenefitsCard
            index={1}
            number={2}
            title="Méditation"
            additionalInfo="(théorie + pratique guidée)"
            description={`Pratique mentale qui consiste à porter son attention sur l’instant présent, afin de favoriser la clarté mentale, la détente et la stabilité émotionnelle.`}
            href="#meditation"
            cta="S'inscrire"
            imageSrc="https://images.unsplash.com/photo-1444312645910-ffa973656eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8Mg%3D%3D"
            imageAlt="Séance de méditation"
            accent="amber"
            prices={[{ title: 'Initiation', amount: 25, duration: '~30 min ' }]}
          />

          {/* 3) Activités aquatiques */}
          <BenefitsCard
            index={3}
            number={3}
            title="Activités aquatiques"
            description={`Apprentissage & perfectionnement : pour évoluer dans l’eau à votre rythme selon vos objectifs. Cours pour enfants et adultes, du niveau débutant au perfectionnement.

Aquaphobie : (re)trouver confiance et sérénité dans l’eau grâce à une approche progressive, bienveillante et individualisée. Tarif : idem natation.`}
            href="#aqua"
            cta="Prendre rendez-vous"
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
    </>
  );
}
