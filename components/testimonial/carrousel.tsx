'use client';
import React, { useState, useEffect } from 'react';
import { Quote, X } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  fullText: string;
  author: string;
  location: string;
  avatar: string;
}

const TestimonialCarousel = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      text: "Quentin a donné des cours de natation à nos 2 enfants : À notre fille âgée de 5 ans, qui n'était initialement pas à l'aise dans l'eau et craignait de se mouiller la tête. Il lui a donné confiance et l'a rassurée, elle a progressivement pris plaisir à aller sous l'eau et nager brasse / crawl, et se déplacer avec agilité en apnée. À notre fils âgé de 8 ans, qui a pu se perfectionner dans les différentes nages, affinant ses mouvements et gagnant en vitesse et en technique.",
      fullText:
        "Quentin a donné des cours de natation à nos 2 enfants :\n\nÀ notre fille âgée de 5 ans, qui n'était initialement pas à l'aise dans l'eau et craignait de se mouiller la tête. Il lui a donné confiance et l'a rassurée, elle a progressivement pris plaisir à aller sous l'eau et nager brasse / crawl, et se déplacer avec agilité en apnée.\n\nÀ notre fils âgé de 8 ans, qui a pu se perfectionner dans les différentes nages, affinant ses mouvements et gagnant en vitesse et en technique.\n\nQuentin sait s'adapter à chaque élève, avec bienveillance, patience et gentillesse. Il trouve toujours les bons mots pour encourager les enfants et son attitude est positive et très motivante. Il a un excellent sens de la pédagogie.\n\nQuentin maîtrise aussi les techniques de l'apnée sous toutes ses formes. Ce qui est un vrai plus pour proposer un enseignement différent qui va au-delà de la nage en piscine. Cela rend l'apprentissage plus ludique et complémentaire à la natation pure.\n\nSon intervention auprès de nos enfants fut très précieuse, nous l'en remercions ! Les enfants étaient ravis !",
      author: 'Stephan et Céline',
      location: 'Village Neuf',
      avatar: 'SC',
    },
    {
      id: 2,
      text: "Quentin sait s'adapter à chaque élève, avec bienveillance, patience et gentillesse. Il trouve toujours les bons mots pour encourager les enfants et son attitude est positive et très motivante. Il a un excellent sens de la pédagogie.",
      fullText:
        "Quentin sait s'adapter à chaque élève, avec bienveillance, patience et gentillesse. Il trouve toujours les bons mots pour encourager les enfants et son attitude est positive et très motivante. Il a un excellent sens de la pédagogie.\n\nMa fille a fait des progrès remarquables en seulement quelques séances. Elle qui avait peur de l'eau est maintenant capable de nager sur plusieurs mètres sans aide. C'est un véritable accomplissement!\n\nJe recommande vivement Quentin pour son professionnalisme et sa capacité à mettre les enfants en confiance.",
      author: 'Marie L.',
      location: 'Mulhouse',
      avatar: 'ML',
    },
    {
      id: 3,
      text: "Quentin maîtrise aussi les techniques de l'apnée sous toutes ses formes. Ce qui est un vrai plus pour proposer un enseignement différent qui va au-delà de la nage en piscine. Cela rend l'apprentissage plus ludique et complémentaire à la natation pure.",
      fullText:
        "Quentin maîtrise aussi les techniques de l'apnée sous toutes ses formes. Ce qui est un vrai plus pour proposer un enseignement différent qui va au-delà de la nage en piscine. Cela rend l'apprentissage plus ludique et complémentaire à la natation pure.\n\nSon intervention auprès de nos enfants fut très précieuse, nous l'en remercions ! Les enfants étaient ravis et attendent avec impatience leur prochaine leçon.\n\nL'approche pédagogique de Quentin est vraiment unique et adaptée à chaque enfant.",
      author: 'Jean-Pierre',
      location: 'Saint-Louis',
      avatar: 'JP',
    },
    {
      id: 4,
      text: "Les séances de Reiki avec Quentin m'ont apporté un apaisement profond. Son approche bienveillante et son écoute attentive créent un espace de confiance où l'on peut vraiment lâcher prise.",
      fullText:
        "Les séances de Reiki avec Quentin m'ont apporté un apaisement profond. Son approche bienveillante et son écoute attentive créent un espace de confiance où l'on peut vraiment lâcher prise.\n\nJ'ai ressenti des effets bénéfiques dès la première séance : moins de stress, un meilleur sommeil et une sensation générale de bien-être.\n\nQuentin prend le temps d'expliquer sa pratique et reste à l'écoute des besoins de chacun. Je recommande vivement ses soins à toute personne cherchant à retrouver un équilibre intérieur.",
      author: 'Sophie R.',
      location: 'Huningue',
      avatar: 'SR',
    },
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTestimonial(null);
    }, 300);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <section className="py-40 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl lg:text-4xl font-bodoni font-bold text-center text-gray-900 mb-4">Témoignages</h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex space-x-6 animate-scroll">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              onClick={() => openModal(testimonial)}
              className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg p-8 transform transition-all hover:scale-105 cursor-pointer hover:shadow-xl"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-green-base mb-4 opacity-50" />

              {/* Testimonial Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-6">{testimonial.text}</p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-green-base to-white rounded-full flex items-center justify-center text-white font-semibold">{testimonial.avatar}</div>

                {/* Name and Location */}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={closeModal}>
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Close modal">
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Modal Body */}
            {selectedTestimonial && (
              <div className="p-8 md:p-12">
                {/* Large Quote Icon */}
                <Quote className="w-12 h-12 text-green-base mb-6 opacity-50" />

                {/* Full Testimonial Text */}
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{selectedTestimonial.fullText}</p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-green-base to-white rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {selectedTestimonial.avatar}
                  </div>

                  {/* Name and Location */}
                  <div>
                    <p className="font-semibold text-xl text-gray-900">{selectedTestimonial.author}</p>
                    <p className="text-gray-500">{selectedTestimonial.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
