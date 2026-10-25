'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Layers } from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { playHapticFeedback } from '@/lib/sound';

interface ComparisonDockProps {
  selectedCardIds: string[];
  onRemoveCard: (slug: string) => void;
  onClearAll: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function ComparisonDock({
  selectedCardIds,
  onRemoveCard,
  onClearAll,
  isModalOpen,
  setIsModalOpen,
}: ComparisonDockProps) {
  const selectedCards = CREDVERT_CARDS.filter((c) => selectedCardIds.includes(c.slug));

  if (selectedCardIds.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Dock */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-auto"
        >
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-neutral-900/90 border border-black/15 dark:border-credvert-gold/30 shadow-2xl backdrop-blur-2xl">
            {/* Thumbnails of selected cards */}
            <div className="flex items-center gap-2">
              {selectedCards.map((card) => (
                <div
                  key={card.slug}
                  className="relative group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-black/5 dark:border-white/10"
                >
                  <div className="w-3.5 h-3.5 rounded-full shrink-0 bg-credvert-gold" />
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 max-w-[90px] sm:max-w-[120px] truncate">
                    {card.name}
                  </span>
                  <button
                    onClick={() => {
                      playHapticFeedback('light');
                      onRemoveCard(card.slug);
                    }}
                    className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {Array.from({ length: 3 - selectedCards.length }).map((_, i) => (
                <div
                  key={i}
                  className="hidden sm:flex items-center justify-center px-3 py-1.5 rounded-xl border border-dashed border-black/20 dark:border-white/10 text-[11px] font-mono text-neutral-500"
                >
                  + Add Card
                </div>
              ))}
            </div>

            <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1 hidden sm:block" />

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  playHapticFeedback('light');
                  onClearAll();
                }}
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-neutral-200 px-2 py-1.5 transition-colors hidden sm:block"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  playHapticFeedback('medium');
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 text-xs font-bold hover:brightness-110 shadow-md transition-all"
              >
                <span>Compare ({selectedCards.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 25 }}
              className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-credvert-gold/15 border border-credvert-gold/30 flex items-center justify-center text-credvert-gold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
                      Side-by-Side Card Comparison
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Comparing {selectedCards.length} premium Indian credit cards
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Matrix Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10">
                      <th className="py-4 px-3 text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider w-1/4">
                        Attributes
                      </th>
                      {selectedCards.map((c) => (
                        <th key={c.slug} className="py-4 px-3 text-neutral-900 dark:text-white font-bold w-1/4">
                          <div className="text-sm font-bold">{c.name}</div>
                          <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400">{c.bank}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/[0.06] text-neutral-700 dark:text-neutral-300">
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Joining / Annual Fee
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">
                          ₹{c.joiningFee.toLocaleString('en-IN')}{' '}
                          <span className="text-neutral-500 dark:text-neutral-400 font-normal">/ yr</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Waiver Spend Requirement
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3">
                          {c.waiverSpend ? `₹${(c.waiverSpend / 100000).toFixed(1)} Lakhs / yr` : 'No Waiver'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Base Reward Rate
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          {c.returnMin}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Max Accelerated Rate
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3 font-mono text-credvert-goldDark dark:text-credvert-gold font-bold text-sm">
                          {c.returnMax}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Forex Markup Fee
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3 font-mono font-medium">
                          {c.forexMarkup === 0 ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">0% (Zero Forex)</span>
                          ) : (
                            `${c.forexMarkup}% + GST`
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Domestic Lounge Access
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3">
                          {c.lounges.domestic}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        International Lounge Access
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3">
                          {c.lounges.international}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Card Material
                      </td>
                      {selectedCards.map((c) => (
                        <td key={c.slug} className="py-3 px-3">
                          {c.metal ? 'Engraved Metal' : 'PVC Plastic'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                        Key Milestones & Perks
                      </td>
                      {selectedCards.map((c) => {
                        const perks = c.features || c.milestones;
                        return (
                          <td key={c.slug} className="py-3 px-3 space-y-1">
                            {perks.slice(0, 3).map((p, idx) => (
                              <div key={idx} className="flex items-start gap-1 text-[11px] text-neutral-700 dark:text-neutral-300">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{p}</span>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Close footer */}
              <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-900 dark:text-white text-xs font-semibold transition-colors"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
