'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import presentationImage from '@/assets/images/Jalaprana-presentation.jpg';

const AboutMe = () => {
  const paragraphs = [
    "Ma mission : vous accompagner vers un mieux-être global, à travers le mouvement, l'énergie et la conscience de soi.",
    "Formé en Reiki (Maître Praticien – 3e degré) et titulaire d'un BPJEPS AAN, j'ai travaillé pendant plus de 10 ans en tant que maître-nageur sauveteur dans la fonction publique territoriale. Ces années d'expérience m'ont permis de développer une approche profondément humaine, centrée sur l'écoute, la patience et la bienveillance.",
    "Passionné d'eau et d'exploration intérieure, j'encadre des séances d'apnée au club Plongée des Trois Frontières. Je pratique également l'apnée dynamique à haut niveau. J'ai été membre de l'équipe de France AIDA 2025 et j'ai eu l'honneur de participer aux championnats du monde AIDA Indoor à Wakayama, au Japon.",
    "Aujourd'hui, je rassemble toutes mes compétences et mes passions pour proposer un accompagnement sur-mesure, mêlant pratiques énergétiques, relaxation, travail aquatique et présence à soi. J'ai à cœur d'aider chacun à se reconnecter à son corps, à son souffle et à son équilibre intérieur.",
    "Jalaprana, c'est un espace pour vous recentrer, respirer, évoluer, vous reconnecter à ce qui compte vraiment : vous.",
  ];

  return (
    <section id="about-me" className=" py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
        {/* Text Section with Fade Up Animation */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-6 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h2 className="text-4xl lg:text-5xl font-bodoni font-bold text-slate-900 mb-2">Présentation</h2>
            <div className="w-20 h-1 bg-emerald-600 rounded-full" />
          </motion.div>

          {/* Paragraphs with staggered fade up */}
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
                className="text-base lg:text-lg leading-relaxed text-slate-700 font-roboto"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="flex flex-wrap gap-4 pt-4">
            <a href="#contact" className="inline-flex items-center btn-green-base font-medium rounded-lg transition-colors">
              Me Contacter
            </a>
          </motion.div>
        </motion.div>

        {/* Image Section - Now on the right */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative order-1 lg:order-2">
          <div className="relative w-full max-w-md mx-auto">
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-60 blur-xl z-0"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-sky-100 rounded-full opacity-60 blur-xl z-0"
            />

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl z-10"
              style={{ aspectRatio: '3/4' }}
            >
              <Image src={presentationImage} alt="Quentin Cliff-Maillot - Jalaprana" fill className="object-cover object-right" sizes="(min-width: 1024px) 50vw, 100vw" priority />
            </motion.div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white md:px-6 md:py-3 px-4 py-2 rounded-full shadow-lg border border-slate-200 z-20 whitespace-nowrap"
          >
            <p className="text-sm font-medium text-slate-700">{"10+ ans d'expérience"}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
