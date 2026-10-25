'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  CreditCard as CardIcon,
  Search,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { playHapticFeedback } from '@/lib/sound';

interface CardCatalogProps {
  selectedCardIds: string[];
  onToggleCompare: (slug: string) => void;
  onSelectForAdvisor?: (slug: string) => void;
}

type FilterCategory = 'all' | 'metal' | 'cashback' | 'travel' | 'low-fee';

export default function CardCatalog({
  selectedCardIds,
  onToggleCompare,
  onSelectForAdvisor,
}: CardCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardSlug, setExpandedCardSlug] = useState<string | null>(null);

  const filteredCards = useMemo(() => {
    return CREDVERT_CARDS.filter((card) => {
      // 1. Category Filter
      if (activeFilter === 'metal' && !card.metal) return false;
      if (activeFilter === 'cashback' && !card.slug.includes('cashback')) return false;
      if (
        activeFilter === 'travel' &&
        !card.overview.toLowerCase().includes('travel') &&
        !card.overview.toLowerCase().includes('flight')
      )
        return false;
      if (activeFilter === 'low-fee' && card.renewalFee > 1000) return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(query);
        const matchesBank = card.bank.toLowerCase().includes(query);
        const matchesOverview = card.overview.toLowerCase().includes(query);
        const matchesMilestones = card.milestones.some((p) => p.toLowerCase().includes(query));
        return matchesName || matchesBank || matchesOverview || matchesMilestones;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="cards" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-credvert-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-credvert-gold/10 border border-credvert-gold/20 text-credvert-gold text-xs font-mono font-medium tracking-wide mb-4"
        >
          <CardIcon className="w-3.5 h-3.5" />
          <span>CURATED INDIAN CREDIT CARD REPOSITORY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4"
        >
          Every fee audited.{' '}
          <span className="bg-gradient-to-r from-credvert-gold via-credvert-goldLight to-amber-200 bg-clip-text text-transparent">
            Every perk decoded.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-400 font-sans"
        >
          Compare milestone rules, GST-inclusive forex markups, airport lounge passes, and true cashback yields
          across top-tier metal and everyday value cards.
        </motion.p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Cards (7)' },
            { id: 'metal', label: 'Metal Tier' },
            { id: 'travel', label: 'Travel & Lounges' },
            { id: 'cashback', label: 'Cashback' },
            { id: 'low-fee', label: 'Zero / Low Fee' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playHapticFeedback('light');
                setActiveFilter(tab.id as FilterCategory);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-credvert-gold text-neutral-950 font-semibold shadow-lg shadow-credvert-gold/20'
                  : 'bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cards, banks, lounges..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-credvert-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const isSelected = selectedCardIds.includes(card.slug);
          const isExpanded = expandedCardSlug === card.slug;
          const perks = card.features && card.features.length > 0 ? card.features : card.milestones;

          return (
            <motion.div
              key={card.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl ${
                isSelected
                  ? 'bg-neutral-900/90 border-credvert-gold/60 shadow-xl shadow-credvert-gold/10'
                  : 'bg-neutral-900/50 border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Card Header & Brand */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center shrink-0">
                      <Image
                        src={card.bankLogo}
                        alt={card.bank}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-neutral-400 block">
                        {card.bank}
                      </span>
                      <h3 className="text-base font-bold font-display text-white line-clamp-1">
                        {card.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tier Pill */}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-neutral-300 border border-white/10">
                    {card.metal ? 'Metal' : 'Standard'}
                  </span>
                </div>

                {/* Return rate badge */}
                <div className="flex items-baseline justify-between py-3 my-2 border-y border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Effective Return
                    </span>
                    <span className="text-2xl font-extrabold font-display text-emerald-400">
                      {card.returnMax}%{' '}
                      <span className="text-xs font-normal text-neutral-400 font-sans">max</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Annual Fee
                    </span>
                    <span className="text-sm font-bold font-mono text-white">
                      {card.renewalFee === 0 ? (
                        <span className="text-emerald-400">₹0 Free</span>
                      ) : (
                        `₹${card.renewalFee.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs my-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono text-neutral-400 block">Forex Fee</span>
                    <span className="font-semibold text-neutral-200">
                      {card.forexMarkup === 0 ? '0% Zero Forex' : `${card.forexMarkup}% + GST`}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono text-neutral-400 block">Lounges</span>
                    <span className="font-semibold text-neutral-200 line-clamp-1">
                      {card.lounges.domestic.includes('Unlimited') ? 'Unlimited' : card.lounges.domestic}
                    </span>
                  </div>
                </div>

                {/* Primary perks list */}
                <div className="space-y-1.5 my-3">
                  {perks.slice(0, 2).map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-credvert-gold shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable perks */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-3 border-t border-white/[0.06] space-y-2 text-xs"
                    >
                      {perks.slice(2).map((perk, i) => (
                        <div key={i} className="flex items-start gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-credvert-gold shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}

                      {card.waiverSpend && (
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                          Spend ₹{(card.waiverSpend / 100000).toFixed(1)}L annually to waive ₹
                          {card.renewalFee.toLocaleString('en-IN')} renewal fee.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    playHapticFeedback('light');
                    setExpandedCardSlug(isExpanded ? null : card.slug);
                  }}
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Less' : 'All Perks'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playHapticFeedback('light');
                      onToggleCompare(card.slug);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-credvert-gold text-neutral-950'
                        : 'bg-white/10 hover:bg-white/20 text-neutral-200'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isSelected ? 'Compared' : 'Compare'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
