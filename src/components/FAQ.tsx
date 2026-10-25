'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { playHapticFeedback } from '@/lib/sound';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Credvert pick the best card for my purchase?',
    answer:
      'Credvert maintains a real-time catalog of reward multiplier rules including SmartBuy portals (5X–10X), category exclusions (fuel, rent), monthly spend caps, and point redemption values. When you enter a spend, the algorithm calculates precise net financial return — including 18% GST deduction on foreign exchange markup if you are paying abroad.',
  },
  {
    id: 'faq-2',
    question: 'Is granting SMS permission safe?',
    answer:
      'Yes — Credvert runs an isolated regex parser directly inside your phone’s RAM. Full 16-digit card numbers, OTPs, and raw SMS text bodies are strictly discarded by design. Only anonymized spend metadata (amount, merchant, card suffix) is used to compute analytics. No SMS content ever reaches any remote server.',
  },
  {
    id: 'faq-3',
    question: 'How does foreign exchange markup calculation work?',
    answer:
      'Most Indian banks charge between 2.0% and 3.5% forex markup, plus 18% GST on that fee (e.g., 3.5% × 1.18 = 4.13% effective total). Credvert deducts this exact amount from your reward rate, so you see true net return. For cards with 0% markup like IDFC FIRST Wealth or 1.5% on ICICI Emeralde Metal, international spending remains lucrative.',
  },
  {
    id: 'faq-4',
    question: "What about iOS? Apple doesn't allow SMS reading.",
    answer:
      'On iOS, Credvert provides a one-tap clipboard paste parser. Copy a bank alert and tap "Parse Clipboard" — the parsing still happens 100% on your device with the same zero-knowledge guarantees. You can also log spends manually with instant category intelligence.',
  },
  {
    id: 'faq-5',
    question: 'Can I delete my account and all data permanently?',
    answer: (
      <span>
        Yes, unconditionally. Under the DPDP Act 2023, GDPR and CCPA you have an absolute Right to
        Erasure. Go to <em>Account → Delete Account</em> in-app, or use our{' '}
        <Link href="/deletion" className="text-credvert-gold hover:underline">
          online deletion portal
        </Link>
        . All records, cards, and anonymized hashes are permanently purged within 24 hours.
      </span>
    ),
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    playHapticFeedback('light');
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono font-medium tracking-wide mb-4"
        >
          <HelpCircle className="w-3.5 h-3.5 text-credvert-gold" />
          <span>HELP CENTER & PROTOCOL SPECIFICATIONS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-400 font-sans"
        >
          Everything you need to know about Credvert’s mathematical optimization, privacy model, and card coverage.
        </motion.p>
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border bg-neutral-900/40 border-white/[0.08] hover:border-white/15 transition-all overflow-hidden backdrop-blur-xl"
            >
              <button
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-base sm:text-lg font-display font-semibold text-white">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-credvert-gold/15 border-credvert-gold/30 text-credvert-gold' : 'text-neutral-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed font-sans border-t border-white/[0.04] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
