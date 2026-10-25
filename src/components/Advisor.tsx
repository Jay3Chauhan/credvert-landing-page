'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Plane, Hotel, ShoppingBag, ShoppingCart, Fuel, Zap, Tv, Home, Globe, ChevronDown, Award } from 'lucide-react';
import { evaluateSpend } from '@/lib/advisor-engine';
import { SpendCategory } from '@/types';
import { soundManager } from '@/lib/sound';

const CATEGORIES: Array<{ id: SpendCategory; label: string; icon: React.ReactNode }> = [
  { id: 'dining', label: 'Dining', icon: <Utensils className="w-4 h-4" /> },
  { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
  { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
  { id: 'online_shopping', label: 'Shopping', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'groceries', label: 'Groceries', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'fuel', label: 'Fuel', icon: <Fuel className="w-4 h-4" /> },
  { id: 'utilities', label: 'Utilities', icon: <Zap className="w-4 h-4" /> },
  { id: 'subscriptions', label: 'Streaming', icon: <Tv className="w-4 h-4" /> },
  { id: 'rent', label: 'Rent', icon: <Home className="w-4 h-4" /> },
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
    soundManager.playClick();
  };

  return (
    <section id="advisor" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold-light mb-4">
            Instant Optimization
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            Which Card Should You Swipe Right Now?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your spend category, set the amount, and watch the advisor rank every card in your wallet by exact
            net reward rate — accounting for portal multipliers, caps, and foreign exchange taxes.
          </p>
        </div>

        {/* Advisor Card Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#111217]/90 border border-white/10 shadow-2xl backdrop-blur-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Category Chips */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-zinc-400 mb-3">
                <span className="text-gold-light mr-1">1.</span> Choose Spend Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundManager.playClick();
                      setCategory(c.id);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                      category === c.id
                        ? 'bg-gradient-to-r from-gold-light/20 via-gold/20 to-gold-deep/20 text-white border-gold shadow-sm font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border-white/5'
                    }`}
                  >
                    {c.icon}
                    <span className="truncate">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Spend Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                  <span className="text-gold-light mr-1">2.</span> Transaction Amount
                </label>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-display text-white [font-variant-numeric:tabular-nums]">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Per checkout</span>
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
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold mb-4"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      soundManager.playClick();
                      setAmount(p);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      amount === p
                        ? 'bg-gold text-obsidian border-gold font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white border-white/5'
                    }`}
                  >
                    {p >= 100000 ? `₹${(p / 100000).toFixed(1)}L` : `₹${(p / 1000).toFixed(0)}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: International Toggle */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sapphire/10 border border-sapphire/30 flex items-center justify-center text-sapphire-light">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Paying Abroad / Foreign Currency?</h4>
                  <p className="text-[11px] text-zinc-400">Deducts bank forex markup + 18% GST from your return</p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsIntl(!isIntl);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isIntl ? 'bg-gold' : 'bg-zinc-700'
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
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-gold/40 p-6 relative shadow-card">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-[10px] font-extrabold uppercase tracking-widest mb-4">
                <Award className="w-3.5 h-3.5" />
                Best Card To Swipe
              </div>

              {/* Winner Identity */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={winner.card.bankLogo}
                  alt={winner.card.bank}
                  width={42}
                  height={42}
                  className="w-10 h-10 object-contain rounded-xl p-1 bg-white/10 border border-white/10 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-display leading-snug">{winner.card.name}</h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {winner.card.bank} · {winner.card.network}
                  </p>
                </div>
              </div>

              {/* Earnings Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 mb-4">
                <div>
                  <span className="block text-2xl font-black font-display text-white [font-variant-numeric:tabular-nums]">
                    ₹{Math.round(winner.netValueInr).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Net Reward Value</span>
                </div>
                <div>
                  <span className="block text-2xl font-black font-display text-gold-light [font-variant-numeric:tabular-nums]">
                    {winner.netReturnPercent.toFixed(1)}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Effective Return</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic bg-white/[0.02] p-3 rounded-lg border border-white/5">
                &ldquo;{winner.whyItWins}&rdquo;
              </p>

              {/* Collapsible Math Toggle */}
              <button
                onClick={() => setShowMath(!showMath)}
                className="mt-4 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors border border-white/5"
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
                    className="overflow-hidden mt-3 text-xs font-mono text-zinc-400 space-y-1.5 p-3 rounded-lg bg-black/50 border border-white/5"
                  >
                    <div>• Base Spend: ₹{amount.toLocaleString('en-IN')}</div>
                    <div>• Reward Rate: {winner.effectiveEarnRatePercent.toFixed(2)}%</div>
                    <div>• Points Generated: ~{winner.pointsEarned.toLocaleString('en-IN')} RPs</div>
                    {isIntl && (
                      <div className="text-rose-400">
                        • Forex Penalty: -{winner.forexCostPercent.toFixed(2)}% (Markup + 18% GST)
                      </div>
                    )}
                    <div className="text-gold-light pt-1 border-t border-white/10">
                      • Net Rate: {winner.netReturnPercent.toFixed(2)}% = ₹{Math.round(winner.netValueInr)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ranked Alternatives */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Alternatives Ranked in Wallet
              </h4>
              <div className="space-y-2">
                {ranked.slice(0, 3).map((r, i) => (
                  <div
                    key={r.card.id}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/5 text-zinc-400 flex items-center justify-center font-mono font-bold text-[10px]">
                        {i + 2}
                      </span>
                      <span className="font-semibold text-white">{r.card.displayName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400">₹{Math.round(r.netValueInr).toLocaleString('en-IN')}</span>
                      <span
                        className={`font-mono font-bold ${
                          r.netReturnPercent > 0 ? 'text-emerald' : 'text-rose-400'
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
