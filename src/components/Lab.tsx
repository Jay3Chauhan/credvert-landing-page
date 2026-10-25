'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, MessageSquareText, Sparkles, Wand2 } from 'lucide-react';
import { Advisor } from '@/components/Advisor';
import { AICopilot } from '@/components/AICopilot';
import SMSIntelligence from '@/components/SMSIntelligence';
import ROICalculator from '@/components/ROICalculator';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { playHapticFeedback } from '@/lib/sound';
import { easeOutExpo, springSnappy } from '@/lib/motion';

export type LabTab = 'advisor' | 'copilot' | 'sms' | 'roi';

const TABS: Array<{ id: LabTab; hash: string; label: string; icon: React.ElementType; blurb: string }> = [
  {
    id: 'advisor',
    hash: '#advisor',
    label: 'Best card',
    icon: Wand2,
    blurb: 'Pick a category and amount. Every card is ranked by net return after caps, portals and forex.',
  },
  {
    id: 'copilot',
    hash: '#ai-copilot',
    label: 'Copilot',
    icon: Sparkles,
    blurb: 'Ask in plain language. The copilot calls the same reward engine and explains its reasoning.',
  },
  {
    id: 'sms',
    hash: '#sms-intelligence',
    label: 'SMS parser',
    icon: MessageSquareText,
    blurb: 'Paste a real bank alert. It’s parsed and hashed right here in your browser — nothing is sent.',
  },
  {
    id: 'roi',
    hash: '#calculator',
    label: 'Yearly value',
    icon: Calculator,
    blurb: 'Set your monthly spends to see which card returns the most over a year, after fees.',
  },
];

export const LAB_EVENT = 'credvert:lab';

export function openLabTab(tab: LabTab) {
  window.dispatchEvent(new CustomEvent<LabTab>(LAB_EVENT, { detail: tab }));
}

export default function Lab({ onSelectCard }: { onSelectCard: (slug: string) => void }) {
  const [tab, setTab] = useState<LabTab>('advisor');
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<LabTab, HTMLButtonElement | null>>({ advisor: null, copilot: null, sms: null, roi: null });

  const select = useCallback((next: LabTab, scroll = false) => {
    setTab(next);
    if (scroll) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const match = TABS.find((t) => t.hash === window.location.hash);
      if (match) select(match.id, true);
    };
    const fromEvent = (e: Event) => select((e as CustomEvent<LabTab>).detail, true);
    fromHash();
    window.addEventListener('hashchange', fromHash);
    window.addEventListener(LAB_EVENT, fromEvent);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener(LAB_EVENT, fromEvent);
    };
  }, [select]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === tab);
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    const id = TABS[next].id;
    setTab(id);
    tabRefs.current[id]?.focus();
  };

  const current = TABS.find((t) => t.id === tab)!;

  return (
    <section id="lab" ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6" aria-label="Try credVert. live">
      <div aria-hidden className="absolute left-1/2 top-40 -translate-x-1/2 w-[900px] max-w-full h-[420px] rounded-full bg-credvert-gold/[0.07] blur-[120px] pointer-events-none" />
      <SectionHeading
        eyebrow="Try it live"
        title={['Don’t take our word for it.', <span key="b" className="text-gold-gradient">Take it for a spin.</span>]}
        description="The same engine that powers the app, running in your browser. No sign-up, no data leaves this page."
      />

      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Interactive demos"
            onKeyDown={onKeyDown}
            className="relative inline-flex max-w-full overflow-x-auto scrollbar-none p-1 rounded-full glass"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const selected = t.id === tab;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  role="tab"
                  id={`lab-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="lab-panel"
                  tabIndex={selected ? 0 : -1}
                  onPointerDown={() => {
                    if (!selected) {
                      playHapticFeedback('light');
                      setTab(t.id);
                    }
                  }}
                  onClick={() => setTab(t.id)}
                  className={`relative shrink-0 h-10 px-4 sm:px-5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
                    selected ? 'text-neutral-950' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="lab-pill"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FDE38A] to-credvert-gold shadow-[0_6px_20px_-6px_rgba(212,168,83,0.7)]"
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4" />
                  <span className="relative z-10 whitespace-nowrap">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto"
          >
            {current.blurb}
          </motion.p>
        </AnimatePresence>

        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`} className="mt-10 relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              {tab === 'advisor' && <Advisor embedded />}
              {tab === 'copilot' && <AICopilot embedded />}
              {tab === 'sms' && <SMSIntelligence embedded />}
              {tab === 'roi' && <ROICalculator embedded onSelectCard={onSelectCard} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
