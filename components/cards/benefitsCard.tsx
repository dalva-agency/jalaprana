// app/components/BenefitsCard.tsx
// Cleaner, more compact card component - reduced sizing and spacing
'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaEuroSign } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export type PriceItem = {
  title?: string;
  amount: number | string;
  duration?: string;
};

export type BenefitsCardProps = {
  number: number | string;
  title: string;
  additionalInfo?: string;
  description?: string;
  descriptionItems?: string[];
  href?: string;
  cta?: string;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  accent?: 'green' | 'amber' | 'teal' | 'sky' | 'rose' | 'emerald' | 'indigo';
  prices?: PriceItem[];
  time?: string;
  price?: number | string;
  infoItems?: string[]; // New prop for additional info badges
  className?: string;
  index?: number; // for staggered delay
};

const BenefitsCard: React.FC<BenefitsCardProps> = ({
  title,
  additionalInfo,
  description,
  descriptionItems = [],
  href = '#',
  cta = 'En savoir plus',
  imageSrc,
  imageAlt = '',
  prices,
  time,
  price,
  infoItems = [],
  className = '',
  index = 0,
}) => {
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 1.5, delay: index * 0.1 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transform-gpu will-change-transform transition-shadow hover:shadow-md ${className}`}
    >
      {/* Reduced image height */}
      <div className="relative h-40 w-full sm:h-44 lg:h-48">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>

      {/* Reduced padding and gaps */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold leading-tight tracking-tight">{title}</h3>

        {additionalInfo && <p className="-mt-2 text-sm text-slate-500">{additionalInfo}</p>}

        {description && <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{description}</p>}

        {descriptionItems?.length > 0 && (
          <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-slate-600">
            {descriptionItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {prices && prices.length > 0 ? (
          <div>
            <ul className="grid gap-2">
              {prices.map((p, i) => (
                <li key={i} className="grid grid-cols-1 items-start gap-1.5 rounded-lg bg-slate-50/50 py-2 px-2 sm:grid-cols-[1fr_auto]">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-sm text-slate-700">
                    <FaEuroSign className="h-3 w-3 flex-none" />
                    <span className="break-words">{p.title ?? 'Option'}</span>
                    {p.duration && (
                      <span className="inline-flex items-center gap-0.5 rounded-md bg-white px-1.5 py-0.5 text-[12px] leading-3 text-slate-600 whitespace-normal break-words">
                        <FiClock className="h-3 w-3 flex-none" /> {p.duration}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 sm:text-right sm:justify-self-end">{typeof p.amount === 'number' ? `${p.amount.toFixed(2)}€` : p.amount}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          (time || formattedPrice) && (
            <div className="flex flex-wrap gap-1.5">
              {time && (
                <div className="inline-flex max-w-full items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-sm text-slate-600">
                  <FiClock className="h-3 w-3 flex-none" />
                  <span className="break-words whitespace-normal">{time}</span>
                </div>
              )}
              {formattedPrice && (
                <div className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-sm text-slate-600">
                  <FaEuroSign className="h-3 w-3 flex-none" />
                  <span>{formattedPrice}</span>
                </div>
              )}
            </div>
          )
        )}

        {/* Additional info items */}
        {infoItems && infoItems.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
            {infoItems.map((item, idx) => (
              <div key={idx} className="text-xs text-slate-600 py-1 flex items-start">
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link href={href} className="inline-flex gap-4 w-full items-center btn-green-base justify-between rounded-lg text-sm font-semibold duration-300 transition-colors ">
            {cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitsCard;
