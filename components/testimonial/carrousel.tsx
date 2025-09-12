'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    {
      id: 5,
      text: "Grâce aux cours d'apnée avec Quentin, j'ai découvert une nouvelle dimension de la plongée. Sa méthode progressive et rassurante m'a permis de dépasser mes limites en toute sécurité.",
      fullText:
        "Grâce aux cours d'apnée avec Quentin, j'ai découvert une nouvelle dimension de la plongée. Sa méthode progressive et rassurante m'a permis de dépasser mes limites en toute sécurité.\n\nJ'ai appris les techniques de respiration, la relaxation et la gestion du stress sous l'eau. Quentin est un instructeur passionné qui transmet son savoir avec enthousiasme.\n\nAujourd'hui, je peux descendre à plus de 15 mètres en apnée et j'ai gagné une confiance incroyable dans l'eau. Une expérience transformatrice!",
      author: 'Alexandre M.',
      location: 'Bâle',
      avatar: 'AM',
    },
    {
      id: 6,
      text: "Mon fils de 7 ans avait une peur panique de l'eau. Après quelques séances avec Quentin, il nage maintenant avec joie et demande même à aller à la piscine!",
      fullText:
        "Mon fils de 7 ans avait une peur panique de l'eau. Après quelques séances avec Quentin, il nage maintenant avec joie et demande même à aller à la piscine!\n\nLa patience et la douceur de Quentin ont fait des miracles. Il a su gagner la confiance de mon fils et le faire progresser à son rythme, sans jamais le brusquer.\n\nC'est un véritable pédagogue qui comprend les enfants et sait adapter son approche à chaque personnalité. Je le recommande à tous les parents!",
      author: 'Nathalie B.',
      location: 'Altkirch',
      avatar: 'NB',
    },
  ];

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

  // Handle scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Check scroll position on mount and scroll
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  // Handle escape key for modal
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
    <section className="py-20 md:py-40 ">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl lg:text-4xl font-bodoni font-bold text-center text-gray-900 mb-4">Témoignages</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">Découvrez les expériences de ceux qui ont fait confiance à Jalaprana</p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            canScrollLeft ? 'opacity-100 hover:scale-110 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={scrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            canScrollRight ? 'opacity-100 hover:scale-110 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Scrollable Container */}
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => openModal(testimonial)}
              className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-md p-8 transform transition-all hover:scale-105 cursor-pointer hover:shadow-xl"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-green-base mb-4" />

              {/* Testimonial Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-6">{testimonial.text}</p>

              {/* Read More Link */}
              <button className="text-green-base text-sm font-medium mb-6 hover:underline">Lire la suite →</button>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-green-base to-green-light rounded-full flex items-center justify-center text-white font-semibold">{testimonial.avatar}</div>

                {/* Name and Location */}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollPosition = (340 + 24) * index; // card width + gap
                  scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-green-base' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Fermer">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-green-base to-green-light rounded-full flex items-center justify-center text-white font-semibold text-xl">
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

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
