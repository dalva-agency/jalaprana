// app/components/AboutMe.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import presentationImage from '@/assets/images/jalaprana-quentin.jpg';

const AboutMe = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Your about text - split into paragraphs for better effect
  const paragraphs = [
    'Ma mission : vous accompagner vers un mieux-être global, à travers le mouvement, l’énergie et la conscience de soi.',
    'Formé en Reiki (Maître Praticien – 3e degré) et titulaire d’un BPJEPS AAN, j’ai travaillé pendant plus de 10 ans en tant que maître-nageur sauveteur dans la fonction publique territoriale. Ces années d’expérience m’ont permis de développer une approche profondément humaine, centrée sur l’écoute, la patience et la bienveillance.',
    'Passionné d’eau et d’exploration intérieure, j’encadre des séances d’apnée au club Plongée des Trois Frontières. Je pratique également l’apnée dynamique à haut niveau. J’ai été membre de l’équipe de France AIDA 2025 et j’ai eu l’honneur de participer aux championnats du monde AIDA Indoor à Wakayama, au Japon.',
    'Aujourd’hui, je rassemble toutes mes compétences et mes passions pour proposer un accompagnement sur-mesure, mêlant pratiques énergétiques, relaxation, travail aquatique et présence à soi. J’ai à cœur d’aider chacun à se reconnecter à son corps, à son souffle et à son équilibre intérieur. ',
    'Jalaprana, c’est un espace pour vous recentrer, respirer, évoluer, vous reconnecter à ce qui compte vraiment : vous.',
  ];

  useEffect(() => {
    if (currentParagraph < paragraphs.length) {
      const paragraph = paragraphs[currentParagraph];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex <= paragraph.length) {
          setDisplayedText(() => {
            if (currentParagraph === 0) {
              return paragraph.slice(0, charIndex);
            } else {
              const previousParagraphs = paragraphs.slice(0, currentParagraph).join('\n\n');
              return previousParagraphs + '\n\n' + paragraph.slice(0, charIndex);
            }
          });
          charIndex++;
        } else {
          clearInterval(typingInterval);
          if (currentParagraph < paragraphs.length - 1) {
            setTimeout(() => {
              setCurrentParagraph((prev) => prev + 1);
            }, 500); // Pause between paragraphs
          } else {
            setIsTypingComplete(true);
          }
        }
      }, 10); // Typing speed (ms per character)

      return () => clearInterval(typingInterval);
    }
  }, [currentParagraph]);

  return (
    <section id="about-me" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
        {/* Image Section */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
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

            {/* Main image - using static height or responsive aspect ratio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl z-10"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={presentationImage} // Replace with your image path
                alt="Sarah Martinez - Jalaprana"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </motion.div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200 z-20"
          >
            <p className="text-sm font-medium text-slate-700">{"10+ ans d'expérience"}</p>
          </motion.div>
        </motion.div>

        {/* Text Section with Typing Effect */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-6 min-h-[800px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <h2 className="text-4xl lg:text-5xl font-bodoni font-bold text-slate-900 mb-2">À Propos</h2>
            <div className="w-20 h-1 bg-emerald-600 rounded-full" />
          </motion.div>

          {/* Typing text container */}
          <div className="min-h-[400px] relative">
            <div className="text-base lg:text-lg leading-relaxed text-slate-700 whitespace-pre-wrap font-roboto">
              {displayedText}
              {!isTypingComplete && <span className="inline-block w-0.5 h-5 bg-slate-900 ml-1 animate-pulse" />}
            </div>
          </div>

          {/* CTA Buttons - appear after typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#contact" className="inline-flex items-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
              Me Contacter
            </a>
            <a href="#services" className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Découvrir mes Services
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 40 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-200"
      >
        {[
          { number: '50+', label: 'Élèves Accompagnés' },
          { number: '10', label: "Années d'Expérience" },
          { number: '98%', label: 'Satisfaction Client' },
          { number: '2', label: 'Certifications' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl lg:text-4xl font-bold text-emerald-700 mb-2">{stat.number}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutMe;
