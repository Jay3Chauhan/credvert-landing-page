'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface OfferItem {
  id: string;
  merchant: string;
  title: string;
  description: string;
  cardName: string;
  code: string;
  isAutoCredit?: boolean;
  expires: string;
}

const OFFERS: OfferItem[] = [
  {
    id: 'swiggy-zomato',
    merchant: 'Swiggy / Zomato Dining',
    title: '20% Instant Discount on Gourmet Dining',
    description: 'Valid on HDFC Infinia & Diners Black. Max ₹1,00,000 discount per calendar month across partner luxury restaurants.',
    cardName: 'HDFC Infinia Metal',
    code: 'INFINIADINE',
    expires: 'Verified Today',
  },
  {
    id: 'amazon',
    merchant: 'Amazon India',
    title: 'Flat 5% Direct Statement Cashback',
    description: 'SBI Cashback Card. Auto-credited to statement within 2 days — zero coupon required, no minimum bill.',
    cardName: 'SBI Cashback Card',
    code: 'AUTO-CREDIT',
    isAutoCredit: true,
    expires: 'Always Active',
  },
  {
    id: 'makemytrip',
    merchant: 'MakeMyTrip & Flights',
    title: '5X EDGE Miles + 1:2 KrisFlyer Transfer',
    description: 'Axis Atlas Card. Convert EDGE Miles directly to Singapore Airlines KrisFlyer or Accor ALL at 1:2 ratio.',
    cardName: 'Axis Atlas Card',
    code: 'ATLASTICKETS',
    expires: 'Verified Today',
  },
  {
    id: 'bookmyshow',
    merchant: 'BookMyShow & Cinema',
    title: 'Buy 1 Get 1 Free Ticket up to ₹750',
    description: 'ICICI Emeralde Private Metal. Valid twice per calendar month for IMAX & premium recliners.',
    cardName: 'ICICI Emeralde Metal',
    code: 'EMERALDEBOGO',
    expires: 'Verified Today',
  },
];

export default function Offers({ onCopyCode }: { onCopyCode?: (code: string) => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleCopy = (offer: OfferItem) => {
    if (offer.isAutoCredit) return;
    navigator.clipboard?.writeText(offer.code);
    playHapticFeedback('success');
    setCopiedId(offer.id);
    onCopyCode?.(offer.code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    playHapticFeedback('light');
    const card = el.querySelector<HTMLElement>('[data-offer]');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 20), behavior: 'smooth' });
  };

  return (
    <section id="offers" className="relative py-24 sm:py-32" aria-label="Card offers">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <SectionHeading
          align="left"
          eyebrow="Perks"
          title={['Card-linked offers.', <span key="b" className="text-neutral-400 dark:text-neutral-500">Checked daily.</span>]}
          description="Restaurant discounts, statement cashback and miles accelerators matched to the cards you actually hold."
        />
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Previous offers"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next offers"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-95 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 pb-4 scroll-px-5 lg:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] lg:scroll-px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]"
      >
        {OFFERS.map((offer, index) => {
          const isCopied = copiedId === offer.id;

          return (
            <motion.div
              key={offer.id}
              data-offer
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[420px] rounded-[28px] bg-white dark:bg-[#111217] border border-black/[0.07] dark:border-white/[0.07] hover:border-credvert-gold/40 p-6 sm:p-7 flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Meta line */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                    <Sparkles className="w-3 h-3 text-credvert-gold" />
                    {offer.merchant}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {offer.expires}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 dark:text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 font-sans">
                  {offer.description}
                </p>
                <div className="text-xs font-mono text-credvert-goldDark dark:text-credvert-goldLight mb-6 font-semibold">
                  Eligible:{' '}
                  <span className="text-neutral-900 dark:text-white font-bold">{offer.cardName}</span>
                </div>
              </div>

              {/* Coupon Action Box */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-100 dark:bg-black/40 border border-black/5 dark:border-white/[0.06]">
                <div className="font-mono text-sm tracking-wider font-bold text-neutral-900 dark:text-white px-2">
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopy(offer)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                    isCopied
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-white dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{offer.isAutoCredit ? 'Auto Applied' : 'Copy Code'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
