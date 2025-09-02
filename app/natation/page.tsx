'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Activity, Heart, Waves, Wind, Brain, Users, Calendar } from 'lucide-react';

const SwimmingServicePage = () => {
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
    { icon: Activity, text: "Sollicite l'ensemble du corps sans traumatisme articulaire" },
    { icon: Heart, text: "Améliore l'endurance" },
    { icon: Activity, text: 'Renforce les muscles en profondeur' },
    { icon: Wind, text: 'Développe la capacité respiratoire' },
    { icon: Brain, text: 'A un effet apaisant naturel : aide à libérer le stress, calmer le mental, retrouver un bien-être intérieur' },
    { icon: Users, text: 'Accessible à tous' },
  ];

  return (
    <div className="min-h-screen relative">
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
            Cours de Natation
          </h1>
          <p
            className="text-xl text-center text-gray-600 max-w-3xl mx-auto animate-fade-in"
            style={{
              animation: 'fadeIn 1s ease-out 0.3s both',
            }}
          >
            {"Apprentissage et confiance dans l'eau"}
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
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Waves className="w-32 h-32 text-blue-400 opacity-50" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">Un Accompagnement Personnalisé</h2>
              <div className="space-y-4 text-gray-600">
                <p>Mes cours de natation sont conçus pour s&apos;adapter à tous les âges et niveaux, que vous soyez débutant(e), en reprise ou à la recherche de perfectionnement.</p>
                <p>Chaque séance se déroule dans un cadre sécurisé, bienveillant et progressif, favorisant la confiance en soi et le plaisir dans l&apos;eau.</p>
                <p>Les séances sont personnalisées, en individuel ou à deux, pour un accompagnement sur mesure.</p>
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
              <div className="relative h-96 bg-gradient-to-br from-sky-100 to-blue-200 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-32 h-32 text-sky-400 opacity-50" />
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:w-1/2 w-2/2">
              <h2 className="text-3xl font-semibold text-gray-800">Informations Pratiques</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">Durée : 30 minutes (possibilité 1h pour adultes)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">Lieu à définir ensemble</span>
                </div>
              </div>

              <button className="mt-6 btn-blue-base font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-103 flex items-center gap-2">
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
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">La natation, un sport complet pour le corps et l&apos;esprit</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300"
                      style={{
                        animation: isVisible.benefits ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none',
                      }}
                    >
                      <Icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
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

export default SwimmingServicePage;
