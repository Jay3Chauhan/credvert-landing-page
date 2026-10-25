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

export default function ROICalculator({ onSelectCard }: { onSelectCard?: (slug: string) => void }) {
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
    <section id="calculator" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-credvert-gold/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-credvert-gold/10 border border-credvert-gold/20 text-credvert-gold text-xs font-mono font-medium tracking-wide mb-4"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>REAL-TIME MILESTONE & ROI SIMULATOR</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4"
        >
          Simulate Your Annual Net Yield.{' '}
          <span className="bg-gradient-to-r from-credvert-gold via-credvert-goldLight to-amber-200 bg-clip-text text-transparent">
            No vague point multipliers.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-400 font-sans"
        >
          Adjust your monthly lifestyle expenses across 6 primary categories to see which credit card
          mathematically maximizes reward redemption after subtracting renewal fees and taxes.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-2xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400">Total Monthly Spend</span>
              <div className="text-2xl font-bold font-display text-white mt-0.5">
                ₹{totalMonthlySpend.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal font-sans text-neutral-400">/ month</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono uppercase text-neutral-400">Annual Run-Rate</span>
              <div className="text-sm font-mono font-medium text-credvert-gold mt-0.5">
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
                    <span className="font-medium text-neutral-300">{slider.label}</span>
                    <span className="font-mono font-bold text-white">
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
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-credvert-gold"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>₹0</span>
                    <span>₹{(slider.max / 1000).toFixed(0)}k max</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Calculated Yield & Best Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-4"
        >
          {/* Winner Card */}
          {bestCard && (
            <div className="rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-credvert-gold/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-credvert-gold/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-credvert-gold/20 text-credvert-goldLight text-xs font-mono font-semibold border border-credvert-gold/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  #1 OPTIMAL MATCH FOR YOUR SPEND PROFILE
                </span>
                <span className="text-xs font-mono text-emerald-400 font-medium">
                  {bestCard.roiPercentage}% Net Yield
                </span>
              </div>

              {/* Card Title & Net Benefit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {bestCard.card.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                    <span>{bestCard.card.bank}</span>
                    <span>•</span>
                    <span>{bestCard.card.metal ? 'Metal Edition' : 'Standard Edition'}</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs font-mono uppercase text-neutral-400 block">
                    Estimated Net Annual Value
                  </span>
                  <div className="text-3xl font-extrabold font-display text-emerald-400">
                    +₹{Math.round(bestCard.netAnnualBenefitInr).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Math breakdown */}
              <div className="grid grid-cols-3 gap-3 my-5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Base Rewards
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-200 mt-0.5 block">
                    ₹{Math.round(bestCard.grossRewardsInr).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Milestones
                  </span>
                  <span className="text-sm font-mono font-bold text-credvert-gold mt-0.5 block">
                    +₹{Math.round(bestCard.milestoneBonusInr).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Annual Fee
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-200 mt-0.5 block">
                    {bestCard.feeWaived ? (
                      <span className="text-emerald-400 line-through">
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
                  <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-credvert-gold" />
                    Unlocked Milestones & Fee Exemptions
                  </span>
                  <div className="space-y-1.5">
                    {bestCard.unlockedPerks.map((perk, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-credvert-gold/20"
                >
                  <span>Explore {bestCard.card.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Runner-Ups */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-400 flex items-center justify-between">
              <span>Alternative Card Yields</span>
              <span>Net Annual Benefit</span>
            </div>

            {runnerUps.map((item, idx) => (
              <div
                key={item.card.slug}
                className="p-4 rounded-2xl bg-neutral-900/50 border border-white/[0.08] flex items-center justify-between hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-neutral-400">
                    {idx + 2}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.card.name}</div>
                    <div className="text-xs text-neutral-400">{item.card.bank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-neutral-200">
                    +₹{Math.round(item.netAnnualBenefitInr).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">
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
              className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{expandedAll ? 'Show Fewer Cards' : 'Compare All 7 Monitored Cards'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
