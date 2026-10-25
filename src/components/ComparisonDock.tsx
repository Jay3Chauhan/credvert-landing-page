'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import type { CreditCard } from '@/types';
import { playHapticFeedback } from '@/lib/sound';
import { Sheet } from '@/components/ui/Sheet';
import { springSettle } from '@/lib/motion';

interface ComparisonDockProps {
  selectedCardIds: string[];
  onRemoveCard: (slug: string) => void;
  onClearAll: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ROWS: Array<{ label: string; render: (c: CreditCard) => React.ReactNode }> = [
  {
    label: 'Annual fee',
    render: (c) => (
      <span className="font-semibold text-neutral-900 dark:text-white tabular">
        ₹{c.joiningFee.toLocaleString('en-IN')}
        <span className="font-normal text-neutral-500"> / yr</span>
      </span>
    ),
  },
  {
    label: 'Fee waiver',
    render: (c) => (c.waiverSpend ? `₹${(c.waiverSpend / 100000).toFixed(1)} L spend / yr` : 'No waiver'),
  },
  {
    label: 'Base rate',
    render: (c) => <span className="tabular font-semibold text-emerald-600 dark:text-emerald-400">{c.returnMin}%</span>,
  },
  {
    label: 'Best rate',
    render: (c) => (
      <span className="tabular text-base font-semibold text-credvert-goldDark dark:text-credvert-gold">{c.returnMax}%</span>
    ),
  },
  {
    label: 'Forex markup',
    render: (c) =>
      c.forexMarkup === 0 ? (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Zero forex</span>
      ) : (
        <span className="tabular">{c.forexMarkup}% + GST</span>
      ),
  },
  { label: 'Domestic lounges', render: (c) => c.lounges.domestic },
  { label: 'International lounges', render: (c) => c.lounges.international },
  { label: 'Material', render: (c) => (c.metal ? 'Metal' : 'Plastic') },
  {
    label: 'Highlights',
    render: (c) => (
      <ul className="space-y-1.5">
        {(c.features || c.milestones).slice(0, 3).map((p, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function ComparisonDock({
  selectedCardIds,
  onRemoveCard,
  onClearAll,
  isModalOpen,
  setIsModalOpen,
}: ComparisonDockProps) {
  const selectedCards = CREDVERT_CARDS.filter((c) => selectedCardIds.includes(c.slug));
  const visible = selectedCards.length > 0;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="dock"
            initial={{ y: 96, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 96, opacity: 0, x: '-50%' }}
            transition={springSettle}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[calc(100%-1.5rem)] sm:w-auto max-w-2xl"
            role="region"
            aria-label="Card comparison"
          >
            <motion.div
              layout
              transition={springSettle}
              className="flex items-center gap-2 p-2 rounded-[22px] glass shadow-glass"
            >
              <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto scrollbar-none">
                <AnimatePresence initial={false} mode="popLayout">
                  {selectedCards.map((card) => (
                    <motion.div
                      key={card.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={springSettle}
                      className="flex items-center gap-1.5 pl-3 pr-1.5 h-9 rounded-full bg-black/[0.05] dark:bg-white/[0.07] shrink-0"
                    >
                      <span className="w-2 h-2 rounded-full bg-credvert-gold" />
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 max-w-[88px] sm:max-w-[130px] truncate">
                        {card.name}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${card.name}`}
                        onClick={() => {
                          playHapticFeedback('light');
                          onRemoveCard(card.slug);
                        }}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {selectedCards.length < 3 && (
                  <a
                    href="#cards"
                    className="hidden sm:flex items-center h-9 px-3 rounded-full border border-dashed border-black/20 dark:border-white/15 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white shrink-0"
                  >
                    + Add card
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  playHapticFeedback('light');
                  onClearAll();
                }}
                className="hidden sm:block text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2 shrink-0"
              >
                Clear
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playHapticFeedback('medium');
                  setIsModalOpen(true);
                }}
                className="shrink-0 h-9 pl-4 pr-3 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                Compare <span className="tabular opacity-60">{selectedCards.length}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet
        open={isModalOpen && visible}
        onClose={() => setIsModalOpen(false)}
        title="Side by side"
        description={`Comparing ${selectedCards.length} card${selectedCards.length === 1 ? '' : 's'}`}
        maxWidth="max-w-4xl"
      >
        <div className="-mx-6 px-6 overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-sm border-collapse min-w-[560px]">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white dark:bg-obsidian-100 py-3 pr-4 w-40" />
                {selectedCards.map((c) => (
                  <th key={c.slug} scope="col" className="py-3 px-3 align-bottom">
                    <div className="text-[15px] font-semibold text-neutral-900 dark:text-white leading-tight">{c.name}</div>
                    <div className="text-xs font-normal text-neutral-500 mt-0.5">{c.bank}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-neutral-700 dark:text-neutral-300">
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-black/[0.06] dark:border-white/[0.07]">
                  <th
                    scope="row"
                    className="sticky left-0 bg-white dark:bg-obsidian-100 py-3.5 pr-4 text-xs font-medium text-neutral-500 align-top"
                  >
                    {row.label}
                  </th>
                  {selectedCards.map((c) => (
                    <td key={c.slug} className="py-3.5 px-3 align-top">
                      {row.render(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sheet>
    </>
  );
}
