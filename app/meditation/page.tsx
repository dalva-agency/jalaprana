'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Shirt, Brain, Heart, Shield, Sparkles, Focus, Lightbulb, Smile, Calendar } from 'lucide-react';
import PriceDisplay from '@/components/price/priceCta';

const MeditationServicePage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observers: { [key: string]: IntersectionObserver } = {};

    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);
  const benefits = [
    { icon: Brain, text: 'Calmer le flot des pensées' },
    { icon: Focus, text: "Améliorer la concentration et la clarté d'esprit" },
    { icon: Lightbulb, text: 'Renforcer la mémoire et la créativité' },
    { icon: Shield, text: "Diminuer le stress chronique et l'agitation mentale" },
    { icon: Heart, text: 'Aider à prendre du recul face aux situations difficiles' },
    { icon: Smile, text: "Renforcer l'estime de soi et la résilience" },
    { icon: Sparkles, text: 'Apporter une détente profonde du système nerveux' },
  ];

  return (
    <div className="min-h-screen  relative">
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section with Fade In */}
        <div className="container mx-auto px-4 py-16">
          <h1
            className="text-5xl md:text-7xl font-bold text-center text-gray-800 mb-4 animate-fade-in"
            style={{
              animation: 'fadeIn 1s ease-out',
            }}
          >
            Méditation
          </h1>
          <p
            className="text-xl text-center text-gray-600 max-w-3xl mx-auto animate-fade-in"
            style={{
              animation: 'fadeIn 1s ease-out 0.3s both',
            }}
          >
            Un voyage intérieur vers la paix et la clarté mentale
          </p>
        </div>

        {/* Section 1: Image Left, Text Right */}
        <div className="container mx-auto px-4 py-16">
          <div
            ref={(el) => {
              sectionRefs.current.section1 = el;
            }}
            className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${isVisible.section1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="lg:w-1/2 w-2/2">
              <div className="relative h-96 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-32 h-32 text-amber-400 opacity-50" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">Déroulement de la séance</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Chaque séance débute par un moment d&apos;accueil pour poser l&apos;intention et vous installer dans l&apos;instant présent. Vous êtes ensuite guidé(e) pas à pas, par la voix, à
                  travers une méditation adaptée à vos besoins.
                </p>
                <p>La séance se déroule dans un cadre bienveillant et sécurisé, accessible à tous, que vous soyez débutant(e) ou pratiquant régulier.</p>
                <p>Un temps d&apos;échange est proposé à la fin pour partager vos ressentis si vous le souhaitez.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Text Left, Image Right */}
        <div className="container mx-auto px-4 py-16">
          <div
            ref={(el) => {
              sectionRefs.current.section2 = el;
            }}
            className={`flex flex-col lg:flex-row-reverse items-center gap-12 transition-all duration-1000 ${isVisible.section2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="lg:w-1/2 w-2/2">
              <div className="relative h-96 bg-gradient-to-br from-orange-100 to-yellow-200 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-orange-400 opacity-50" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">Informations pratiques</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-600">Durée : 30min à 45min</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-600">Disponible en présentiel ou en ligne</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shirt className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-600">Prévoir une tenue confortable et un espace calme</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="btn-orange-base font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-103 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Prendre Rendez-vous
                </button>

                <div>
                  <PriceDisplay amount={30} currency="EUR" size="small" variant="warning" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-16">
          <div
            ref={(el) => {
              sectionRefs.current.benefits = el;
            }}
            className={`transition-all duration-1000 ${isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Bienfaits de la Méditation</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-yellow-50 transition-colors duration-300"
                      style={{
                        animation: isVisible.benefits ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none',
                      }}
                    >
                      <Icon className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{benefit.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default MeditationServicePage;
