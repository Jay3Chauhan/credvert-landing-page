'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, Check, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { playHapticFeedback } from '@/lib/sound';
import { SectionHeading } from '@/components/ui/SectionHeading';

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
    <section id="cards" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Card catalogue">
      <SectionHeading
        eyebrow="Card catalogue"
        title={['Every fee audited.', <span key="b" className="text-gold-gradient">Every perk decoded.</span>]}
        description="Milestones, GST-inclusive forex, lounge access and true cashback across premium metal and everyday cards. Add up to three to compare side by side."
        className="mb-14"
      />

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
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-credvert-gold text-neutral-950 font-bold shadow-md shadow-credvert-gold/20'
                  : 'bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cards, banks, lounges..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-neutral-900/80 border border-black/10 dark:border-white/10 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-credvert-gold/60 transition-colors shadow-sm"
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
                  ? 'bg-white dark:bg-neutral-900/90 border-credvert-gold/80 shadow-xl shadow-credvert-gold/15'
                  : 'bg-white dark:bg-neutral-900/50 border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 shadow-md'
              }`}
            >
              {/* Card Header & Brand */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                      <Image
                        src={card.bankLogo}
                        alt={card.bank}
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                        {card.bank}
                      </span>
                      <h3 className="text-base font-bold font-display text-neutral-900 dark:text-white line-clamp-1">
                        {card.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tier Pill */}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/10">
                    {card.metal ? 'Metal' : 'Standard'}
                  </span>
                </div>

                {/* Return rate badge */}
                <div className="flex items-baseline justify-between py-3 my-2 border-y border-black/5 dark:border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                      Effective Return
                    </span>
                    <span className="text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                      {card.returnMax}%{' '}
                      <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400 font-sans">max</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                      Annual Fee
                    </span>
                    <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                      {card.renewalFee === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">₹0 Free</span>
                      ) : (
                        `₹${card.renewalFee.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs my-4">
                  <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.04]">
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block font-semibold">
                      Forex Fee
                    </span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {card.forexMarkup === 0 ? '0% Zero Forex' : `${card.forexMarkup}% + GST`}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.04]">
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block font-semibold">
                      Lounges
                    </span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                      {card.lounges.domestic.includes('Unlimited') ? 'Unlimited' : card.lounges.domestic}
                    </span>
                  </div>
                </div>

                {/* Primary perks list */}
                <div className="space-y-1.5 my-3">
                  {perks.slice(0, 2).map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
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
                      className="overflow-hidden pt-3 border-t border-black/5 dark:border-white/[0.06] space-y-2 text-xs"
                    >
                      {perks.slice(2).map((perk, i) => (
                        <div key={i} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-credvert-gold shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}

                      {card.waiverSpend && (
                        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                          Spend ₹{(card.waiverSpend / 100000).toFixed(1)}L annually to waive ₹
                          {card.renewalFee.toLocaleString('en-IN')} renewal fee.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-neutral-50 dark:bg-white/[0.02] border-t border-black/5 dark:border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    playHapticFeedback('light');
                    setExpandedCardSlug(isExpanded ? null : card.slug);
                  }}
                  className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-credvert-gold text-neutral-950 shadow-sm'
                        : 'bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200'
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
