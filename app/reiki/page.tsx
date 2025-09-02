'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Shirt, Sparkles, Heart, Brain, Battery, Moon, Shield, Zap, Calendar } from 'lucide-react';

const ReikiServicePage = () => {
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
    { icon: Heart, text: 'Soulager les tensions musculaires et douleurs légères' },
    { icon: Moon, text: 'Favoriser un meilleur sommeil' },
    { icon: Zap, text: 'Accélérer les processus naturels de guérison' },
    { icon: Battery, text: 'Réduire la fatigue chronique' },
    { icon: Shield, text: "Apaiser le stress, l'anxiété et les angoisses" },
    { icon: Brain, text: 'Aider à mieux gérer les émotions (colère, tristesse, peur…)' },
    { icon: Heart, text: 'Aider à libérer les blocages émotionnels' },
    { icon: Sparkles, text: "Rééquilibrer les centres d'énergie (chakras)" },
    { icon: Zap, text: "Favoriser une meilleure circulation de l'énergie vitale" },
  ];

  return (
    <div>
      {/* Hero Section with Fade In */}
      <div className="container mx-auto px-4 py-16">
        <h1
          className="text-5xl md:text-7xl font-bold text-center text-gray-800 mb-4 animate-fade-in"
          style={{
            animation: 'fadeIn 1s ease-out',
          }}
        >
          Séance de Reiki
        </h1>
        <p
          className="text-xl text-center text-gray-600 max-w-3xl mx-auto animate-fade-in"
          style={{
            animation: 'fadeIn 1s ease-out 0.3s both',
          }}
        >
          Un voyage vers l&apos;équilibre énergétique et le bien-être profond
        </p>
      </div>

      {/* Section 1: Image Left, Text Right */}
      <div className="container mx-auto px-4 py-16">
        <div
          ref={(el) => {
            if (el) sectionRefs.current.section1 = el;
          }}
          className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${isVisible.section1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="lg:w-1/2 w-2/2">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-green-400 opacity-50" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Déroulement de la Séance</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {
                  "Chaque séance débute par un temps d'échange pour cerner vos besoins du moment. Vous êtes ensuite installé(e) en restant habillé(e), sur une table de soin, dans une ambiance calme et apaisante."
                }
              </p>
              <p>
                Le soin consiste en une apposition des mains sur différentes zones du corps (ou juste au-dessus), afin de canaliser l&apos;énergie universelle et favoriser un rééquilibrage énergétique
                global.
              </p>
              <p>
                La séance se déroule dans le silence, dans un profond respect et une bienveillance totale. Elle se termine par un moment de retour à soi et d&apos;échange sur les ressentis, suivi de
                conseils pour accompagner les effets du soin.
              </p>
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
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-32 h-32 text-purple-400 opacity-50" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Informations Pratiques</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-base flex-shrink-0" />
                <span className="text-gray-600">Durée : environ 1h à 1h15</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-green-base flex-shrink-0" />
                <span className="text-gray-600">Disponible en présentiel, à domicile ou à distance</span>
              </div>
              <div className="flex items-center gap-3">
                <Shirt className="w-6 h-6 text-green-base flex-shrink-0" />
                <span className="text-gray-600">Tenue confortable recommandée</span>
              </div>
            </div>

            <button className="mt-6 btn-green-base font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-103 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Prendre Rendez-vous
            </button>
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
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Bienfaits du Reiki</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-300"
                    style={{
                      animation: isVisible.benefits ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none',
                    }}
                  >
                    <Icon className="w-6 h-6 text-green-base mt-1 flex-shrink-0" />
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
  );
};

export default ReikiServicePage;
