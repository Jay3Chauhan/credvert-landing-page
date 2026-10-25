'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { calculateAnnualROI } from '@/lib/calculator-engine';
import { CalculatorSpendState } from '@/types';
import { playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal } from '@/components/ui/AppleText';

const DEFAULT_SPENDS: CalculatorSpendState = {
  shopping: 35000,
  dining: 15000,
  flights: 25000,
  groceries: 12000,
  fuel: 6000,
  utilities: 8000,
};

interface SliderConfig {
  id: keyof CalculatorSpendState;
  label: string;
  min: number;
  max: number;
  step: number;
  hint: string;
}

const SLIDERS: SliderConfig[] = [
  { id: 'shopping', label: 'Online Shopping (Amazon, Flipkart, Tech)', min: 0, max: 200000, step: 5000, hint: 'Amazon, Flipkart, Apple' },
  { id: 'flights', label: 'Flights, Hotels & Vacations', min: 0, max: 150000, step: 5000, hint: 'MakeMyTrip, Vistara, Marriott' },
  { id: 'dining', label: 'Dining Out & Food Delivery', min: 0, max: 60000, step: 2000, hint: 'Zomato, Swiggy, Fine Dining' },
  { id: 'groceries', label: 'Groceries & Quick Commerce', min: 0, max: 50000, step: 2000, hint: 'Blinkit, Zepto, Nature Basket' },
  { id: 'fuel', label: 'Fuel & EV Charging', min: 0, max: 30000, step: 1000, hint: 'IndianOil, HPCL, Shell' },
  { id: 'utilities', label: 'Utilities, Bills & Insurance', min: 0, max: 40000, step: 1000, hint: 'Electricity, Broadband, Recharges' },
];

export default function ROICalculator({
  onSelectCard,
  embedded = false,
}: {
  onSelectCard?: (slug: string) => void;
  embedded?: boolean;
}) {
  const [spends, setSpends] = useState<CalculatorSpendState>(DEFAULT_SPENDS);
  const [expandedAll, setExpandedAll] = useState(false);

  const handleSliderChange = (id: keyof CalculatorSpendState, val: number) => {
    setSpends((prev) => ({ ...prev, [id]: val }));
    playHapticFeedback('light');
  };

  const calculatedCards = useMemo(() => {
    return calculateAnnualROI(spends);
  }, [spends]);

  const bestCard = calculatedCards[0];
  const runnerUps = calculatedCards.slice(1, expandedAll ? undefined : 3);

  const totalMonthlySpend = Object.values(spends).reduce((a, b) => a + b, 0);
  const totalAnnualSpend = totalMonthlySpend * 12;

  return (
    <section
      id={embedded ? undefined : 'calculator'}
      className={embedded ? 'relative' : 'relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}
    >
      {/* Header */}
      <div className={embedded ? 'hidden' : 'text-center max-w-3xl mx-auto mb-16'}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-credvert-gold/15 border border-credvert-gold/30 text-credvert-goldDark dark:text-credvert-gold text-xs font-mono font-medium tracking-wide mb-4 shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>REAL-TIME MILESTONE & ROI SIMULATOR</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
          <AppleWordReveal text="Simulate Your Annual Net Yield." />{' '}
          <span className="bg-gradient-to-r from-credvert-gold via-amber-500 to-amber-600 dark:from-credvert-gold dark:via-credvert-goldLight dark:to-amber-200 bg-clip-text text-transparent">
            No vague point multipliers.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
          Adjust your monthly lifestyle expenses across 6 primary categories to see which credit card
          mathematically maximizes reward redemption after subtracting renewal fees and taxes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 space-y-6 rounded-3xl bg-white dark:bg-neutral-900/60 border border-black/10 dark:border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                Total Monthly Spend
              </span>
              <div className="text-2xl font-bold font-display text-neutral-900 dark:text-white mt-0.5">
                ₹{totalMonthlySpend.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal font-sans text-neutral-500 dark:text-neutral-400">/ month</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                Annual Run-Rate
              </span>
              <div className="text-sm font-mono font-medium text-credvert-goldDark dark:text-credvert-gold mt-0.5">
                ₹{totalAnnualSpend.toLocaleString('en-IN')} / yr
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {SLIDERS.map((slider) => {
              const val = spends[slider.id];
              return (
                <div key={slider.id} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-300">{slider.label}</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-white">
                      ₹{val.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={val}
                    onChange={(e) => handleSliderChange(slider.id, Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-credvert-gold"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-medium">
                    <span>₹0</span>
                    <span>₹{(slider.max / 1000).toFixed(0)}k max</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Calculated Yield & Best Card */}
        <div className="lg:col-span-6 space-y-4">
          {/* Winner Card */}
          {bestCard && (
            <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-neutral-900/90 dark:to-neutral-950/90 border border-credvert-gold/50 p-6 sm:p-8 backdrop-blur-2xl shadow-xl dark:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-credvert-gold/15 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-credvert-gold/20 text-credvert-goldDark dark:text-credvert-goldLight text-xs font-mono font-semibold border border-credvert-gold/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  #1 OPTIMAL MATCH FOR YOUR SPEND PROFILE
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {bestCard.roiPercentage}% Net Yield
                </span>
              </div>

              {/* Card Title & Net Benefit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/[0.08]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
                    {bestCard.card.name}
                  </h3>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2">
                    <span>{bestCard.card.bank}</span>
                    <span>•</span>
                    <span>{bestCard.card.metal ? 'Metal Edition' : 'Standard Edition'}</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                    Estimated Net Annual Value
                  </span>
                  <div className="text-3xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                    +₹{Math.round(bestCard.netAnnualBenefitInr).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Math breakdown */}
              <div className="grid grid-cols-3 gap-3 my-5">
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] text-center shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                    Base Rewards
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-900 dark:text-neutral-200 mt-0.5 block">
                    ₹{Math.round(bestCard.grossRewardsInr).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] text-center shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                    Milestones
                  </span>
                  <span className="text-sm font-mono font-bold text-credvert-goldDark dark:text-credvert-gold mt-0.5 block">
                    +₹{Math.round(bestCard.milestoneBonusInr).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] text-center shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block font-semibold">
                    Annual Fee
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-900 dark:text-neutral-200 mt-0.5 block">
                    {bestCard.feeWaived ? (
                      <span className="text-emerald-600 dark:text-emerald-400 line-through">
                        ₹{bestCard.card.renewalFee.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      `-₹${bestCard.card.renewalFee.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
              </div>

              {/* Unlocked Perks List */}
              {bestCard.unlockedPerks.length > 0 && (
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-semibold">
                    <Gift className="w-3.5 h-3.5 text-credvert-gold" />
                    Unlocked Milestones & Fee Exemptions
                  </span>
                  <div className="space-y-1.5">
                    {bestCard.unlockedPerks.map((perk, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-white/[0.02] p-2.5 rounded-xl border border-black/5 dark:border-white/[0.04]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex gap-3">
                <button
                  onClick={() => onSelectCard?.(bestCard.card.slug)}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 text-sm font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-credvert-gold/20"
                >
                  <span>Explore {bestCard.card.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Runner-Ups */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 flex items-center justify-between font-semibold">
              <span>Alternative Card Yields</span>
              <span>Net Annual Benefit</span>
            </div>

            {runnerUps.map((item, idx) => (
              <div
                key={item.card.slug}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900/50 border border-black/10 dark:border-white/[0.08] flex items-center justify-between hover:border-black/20 dark:hover:border-white/20 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-mono text-neutral-600 dark:text-neutral-400 font-bold">
                    {idx + 2}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">{item.card.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.card.bank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-neutral-900 dark:text-neutral-200">
                    +₹{Math.round(item.netAnnualBenefitInr).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.roiPercentage}% yield
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                playHapticFeedback('light');
                setExpandedAll(!expandedAll);
              }}
              className="w-full py-2.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-transparent text-xs font-semibold text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{expandedAll ? 'Show Fewer Cards' : 'Compare All 7 Monitored Cards'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
