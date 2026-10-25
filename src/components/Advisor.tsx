'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Plane,
  Building,
  ShoppingBag,
  ShoppingCart,
  Fuel,
  Zap,
  Globe,
  Home,
  ChevronDown,
  Award,
  Sparkles,
} from 'lucide-react';
import { evaluateSpend } from '@/lib/advisor-engine';
import { SpendCategory } from '@/types';
import { playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal } from '@/components/ui/AppleText';

const CATEGORIES: Array<{ id: SpendCategory; label: string; icon: React.ReactNode }> = [
  { id: 'dining', label: 'Dining Out', icon: <Utensils className="w-4 h-4" /> },
  { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
  { id: 'hotels', label: 'Hotels', icon: <Building className="w-4 h-4" /> },
  { id: 'online_shopping', label: 'Shopping', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'groceries', label: 'Groceries', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'fuel', label: 'Fuel & EV', icon: <Fuel className="w-4 h-4" /> },
  { id: 'utilities', label: 'Bills & Util', icon: <Zap className="w-4 h-4" /> },
  { id: 'travel', label: 'Cabs & Rides', icon: <Globe className="w-4 h-4" /> },
  { id: 'rent', label: 'Rent Pay', icon: <Home className="w-4 h-4" /> },
];

const PRESETS = [3500, 15000, 45000, 120000, 250000];

export function Advisor() {
  const [category, setCategory] = useState<SpendCategory>('dining');
  const [amount, setAmount] = useState<number>(15000);
  const [isIntl, setIsIntl] = useState<boolean>(false);
  const [showMath, setShowMath] = useState<boolean>(false);

  const result = evaluateSpend(category, amount, isIntl);
  const { winner, ranked } = result;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
    playHapticFeedback('light');
  };

  return (
    <section id="advisor" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-credvert-gold/15 border border-credvert-gold/30 text-xs font-mono font-semibold text-credvert-goldDark dark:text-credvert-goldLight mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME SPEND OPTIMIZER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-900 dark:text-white tracking-tight mb-4">
            <AppleWordReveal text="Which Card Should You Swipe Right Now?" />
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
            Select your spend category, set the amount, and watch the algorithm rank every card by exact net
            financial return — deducting portal multipliers, calendar spend caps, and foreign exchange taxes.
          </p>
        </div>

        {/* Advisor Card Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#111217]/90 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Category Chips */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 mb-3 font-mono">
                <span className="text-credvert-gold mr-1">1.</span> Choose Spend Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playHapticFeedback('light');
                      setCategory(c.id);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                      category === c.id
                        ? 'bg-credvert-gold/20 text-neutral-900 dark:text-white border-credvert-gold shadow-sm font-bold'
                        : 'bg-neutral-50 dark:bg-white/[0.04] hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border-black/5 dark:border-white/5'
                    }`}
                  >
                    <span className="text-credvert-gold">{c.icon}</span>
                    <span className="truncate">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Spend Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                  <span className="text-credvert-gold mr-1">2.</span> Transaction Amount
                </label>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold font-display text-neutral-900 dark:text-white [font-variant-numeric:tabular-nums]">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase tracking-wider font-mono">
                    Per checkout
                  </span>
                </div>
              </div>

              {/* Range Input */}
              <input
                type="range"
                min="500"
                max="250000"
                step="500"
                value={amount}
                onChange={handleSliderChange}
                className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-credvert-gold mb-4"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      playHapticFeedback('light');
                      setAmount(p);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      amount === p
                        ? 'bg-credvert-gold text-neutral-950 border-credvert-gold font-bold shadow-sm'
                        : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border-black/5 dark:border-white/5'
                    }`}
                  >
                    {p >= 100000 ? `₹${(p / 100000).toFixed(1)}L` : `₹${(p / 1000).toFixed(0)}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: International Toggle */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Paying Abroad / Foreign Currency?
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Deducts bank forex markup + 18% GST from your net return
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  playHapticFeedback('light');
                  setIsIntl(!isIntl);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isIntl ? 'bg-credvert-gold' : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isIntl ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Winner & Results Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Winner Card */}
            <div className="rounded-3xl bg-neutral-50 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.02] border border-credvert-gold/50 p-6 relative shadow-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-credvert-gold/20 text-credvert-goldDark dark:text-credvert-goldLight border border-credvert-gold/40 text-[10px] font-extrabold uppercase tracking-widest mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>Best Card To Swipe</span>
              </div>

              {/* Winner Identity */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={winner.card.bankLogo}
                  alt={winner.card.bank}
                  width={42}
                  height={42}
                  className="w-10 h-10 object-contain rounded-xl p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex-shrink-0 shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-display leading-snug">
                    {winner.card.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    {winner.card.bank} · {winner.card.network}
                  </p>
                </div>
              </div>

              {/* Earnings Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 mb-4 shadow-sm">
                <div>
                  <span className="block text-2xl font-black font-display text-neutral-900 dark:text-white [font-variant-numeric:tabular-nums]">
                    ₹{Math.round(winner.netValueInr).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider font-mono">
                    Net Reward Value
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-black font-display text-credvert-gold [font-variant-numeric:tabular-nums]">
                    {winner.netReturnPercent.toFixed(1)}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider font-mono">
                    Effective Return
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic bg-white dark:bg-white/[0.02] p-3 rounded-xl border border-black/5 dark:border-white/5">
                &ldquo;{winner.whyItWins}&rdquo;
              </p>

              {/* Collapsible Math Toggle */}
              <button
                onClick={() => {
                  playHapticFeedback('light');
                  setShowMath(!showMath);
                }}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-white dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 text-xs font-semibold flex items-center justify-between transition-colors border border-black/10 dark:border-white/5 shadow-sm"
              >
                <span>View Reward Math & Rule Breakdown</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMath ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showMath && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3 text-xs font-mono text-neutral-700 dark:text-neutral-300 space-y-1.5 p-3 rounded-xl bg-white dark:bg-black/50 border border-black/10 dark:border-white/5"
                  >
                    <div>• Base Spend: ₹{amount.toLocaleString('en-IN')}</div>
                    <div>• Reward Rate: {winner.effectiveEarnRatePercent.toFixed(2)}%</div>
                    <div>• Points Generated: ~{winner.pointsEarned.toLocaleString('en-IN')} RPs</div>
                    {isIntl && (
                      <div className="text-red-500 dark:text-rose-400">
                        • Forex Penalty: -{winner.forexCostPercent.toFixed(2)}% (Markup + 18% GST)
                      </div>
                    )}
                    <div className="text-credvert-goldDark dark:text-credvert-goldLight pt-1 border-t border-black/10 dark:border-white/10 font-bold">
                      • Net Return: {winner.netReturnPercent.toFixed(2)}% = ₹{Math.round(winner.netValueInr)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ranked Alternatives */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 font-mono">
                Alternatives Ranked in Wallet
              </h4>
              <div className="space-y-2">
                {ranked.slice(0, 3).map((r, i) => (
                  <div
                    key={r.card.slug}
                    className="p-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between text-xs hover:border-black/20 dark:hover:border-white/15 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 flex items-center justify-center font-mono font-bold text-[10px]">
                        {i + 2}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{r.card.displayName}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-neutral-500 dark:text-neutral-400">
                        ₹{Math.round(r.netValueInr).toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`font-bold ${
                          r.netReturnPercent > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-red-500 dark:text-rose-400'
                        }`}
                      >
                        {r.netReturnPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
