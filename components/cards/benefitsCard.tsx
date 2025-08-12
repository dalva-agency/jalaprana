// app/components/BenefitsCard.tsx
// Reusable Card component using TailwindCSS + Framer Motion animation
// Smooth bottom-to-top fade, no end "jump". Key fixes:
// - Use tween easing [0.16, 1, 0.3, 1] (standard "easeOutQuint"-like curve)
// - Remove generic `transition` (which also targets `transform`) → use `transition-shadow`
// - Add `transform-gpu` + `will-change-transform` for smoother compositing
// - Keep stagger via `index` prop

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEuroSign } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

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
  imageSrc: string;
  imageAlt?: string;
  accent?: 'green' | 'amber' | 'teal' | 'sky' | 'rose' | 'emerald' | 'indigo';
  prices?: PriceItem[];
  time?: string;
  price?: number | string;
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
  className = '',
  index = 0,
}) => {
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} // small vertical offset only
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 2, delay: index * 0.12 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transform-gpu will-change-transform transition-shadow hover:shadow-lg ${className}`}
    >
      <div className="relative h-56 w-full sm:h-64 lg:h-72">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold leading-snug tracking-tight">{title}</h3>

        {additionalInfo && <p className="-mt-2 text-sm text-slate-500">{additionalInfo}</p>}

        {description && <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-700">{description}</p>}

        {descriptionItems?.length > 0 && (
          <ul className="mt-1 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-slate-700">
            {descriptionItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {prices && prices.length > 0 ? (
          <div className="mt-1 ">
            <ul className="grid gap-2.5">
              {prices.map((p, i) => (
                <li key={i} className="grid grid-cols-1 items-start gap-2 rounded-lg bg-white/60 py-2.5 sm:grid-cols-[1fr_auto]">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-sm text-slate-700">
                    <FaEuroSign className="h-4 w-4 flex-none" />
                    <span className="break-words">{p.title ?? 'Option'}</span>
                    {p.duration && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] leading-4 text-slate-700 whitespace-normal break-words">
                        <FiClock className="h-3.5 w-3.5 flex-none" /> {p.duration}
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
            <div className="mt-1 flex flex-wrap gap-2 pt-1">
              {time && (
                <div className="inline-flex max-w-full items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  <FiClock className="h-4 w-4 flex-none" />
                  <span className="break-words whitespace-normal">{time}</span>
                </div>
              )}
              {formattedPrice && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  <FaEuroSign className="h-4 w-4 flex-none" />
                  <span>{formattedPrice}</span>
                </div>
              )}
            </div>
          )
        )}

        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-900/10 bg-emerald-900/90 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-shadow hover:shadow-lg"
          >
            {cta}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitsCard;
