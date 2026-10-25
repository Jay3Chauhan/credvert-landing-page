'use client';

import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';
import { springSettle } from '@/lib/motion';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  /** Controlled mode */
  openIds?: string[];
  onOpenChange?: (ids: string[]) => void;
}

export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  className = '',
  itemClassName = '',
  openIds,
  onOpenChange,
}: AccordionProps) {
  const [internal, setInternal] = useState<string[]>(defaultOpen);
  const open = openIds ?? internal;
  const baseId = useId();

  const toggle = (id: string) => {
    playHapticFeedback('light');
    const isOpen = open.includes(id);
    const next = isOpen ? open.filter((x) => x !== id) : allowMultiple ? [...open, id] : [id];
    if (onOpenChange) onOpenChange(next);
    else setInternal(next);
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className={itemClassName} data-open={isOpen}>
            <h3>
              <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group w-full flex items-center gap-4 py-5 text-left active:opacity-70 transition-opacity"
              >
                {item.icon}
                <span className="flex-1 text-base sm:text-lg font-display font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {item.title}
                </span>
                {item.meta}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={springSettle}
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
                    isOpen
                      ? 'bg-credvert-gold text-neutral-950 border-credvert-gold'
                      : 'border-black/10 dark:border-white/15 text-neutral-600 dark:text-neutral-300 group-hover:border-credvert-gold/60'
                  }`}
                  aria-hidden
                >
                  <Plus className="w-4 h-4" strokeWidth={2.25} />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={springSettle}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    exit={{ y: -8 }}
                    transition={springSettle}
                    className="pb-6 text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty"
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
