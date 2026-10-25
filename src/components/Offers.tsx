'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, Check, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';

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
    description: 'Valid on HDFC Infinia & Diners Black. Max ₹1,000 discount per bill at partner luxury restaurants.',
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

  const handleCopy = (offer: OfferItem) => {
    navigator.clipboard.writeText(offer.code);
    playHapticFeedback('success');
    setCopiedId(offer.id);
    onCopyCode?.(offer.code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="offers" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium tracking-wide mb-4"
        >
          <Tag className="w-3.5 h-3.5" />
          <span>REAL-TIME VERIFIED MERCHANT CODES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4"
        >
          Exclusive Cardholder Perks.{' '}
          <span className="bg-gradient-to-r from-credvert-gold via-amber-300 to-yellow-200 bg-clip-text text-transparent">
            No expired vouchers.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-400 font-sans"
        >
          Credvert curates and verifies card-linked merchant promotions daily so you never miss
          instant restaurant discounts or miles multiplier accelerators.
        </motion.p>
      </div>

      {/* Grid of 4 Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OFFERS.map((offer, index) => {
          const isCopied = copiedId === offer.id;

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-white/20 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Meta line */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
                    <Sparkles className="w-3 h-3 text-credvert-gold" />
                    {offer.merchant}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {offer.expires}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  {offer.description}
                </p>
                <div className="text-xs font-mono text-credvert-goldLight mb-6">
                  Eligible: <span className="text-white font-medium">{offer.cardName}</span>
                </div>
              </div>

              {/* Coupon Action Box */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                <div className="font-mono text-sm tracking-wider font-bold text-white px-2">
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopy(offer)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-neutral-200'
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
