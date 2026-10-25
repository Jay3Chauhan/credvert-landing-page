'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { playHapticFeedback } from '@/lib/sound';
import { FAQ_ITEMS } from '@/lib/faq-data';

const RICH_ANSWERS: Record<string, React.ReactNode> = {
  delete: (
    <>
      Yes, unconditionally. Under the DPDP Act 2023 you have the right to erasure. Use <em>Account → Delete account</em> in
      the app, or the{' '}
      <Link href="/deletion" className="text-credvert-goldDark dark:text-credvert-gold underline underline-offset-4 font-medium">
        online deletion portal
      </Link>
      . All records and fingerprints are purged within 24 hours.
    </>
  ),
};

export default function FAQ() {
  const [open, setOpen] = useState<string[]>(['pick']);
  const allOpen = open.length === FAQ_ITEMS.length;

  const items: AccordionItem[] = FAQ_ITEMS.map((f) => ({
    id: f.id,
    title: f.question,
    content: RICH_ANSWERS[f.id] ?? f.answer,
  }));

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-5" aria-label="Frequently asked questions">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            size="md"
            eyebrow="FAQ"
            title={['Questions,', <span key="b" className="text-neutral-400 dark:text-neutral-500">answered.</span>]}
            description={
              <>
                Can’t find what you need? Write to{' '}
                <a href="mailto:support@credvert.tech" className="text-neutral-900 dark:text-white underline underline-offset-4">
                  support@credvert.tech
                </a>
                .
              </>
            }
          />
          <Reveal delay={0.2} className="mt-8">
            <button
              type="button"
              onClick={() => {
                playHapticFeedback('light');
                setOpen(allOpen ? [] : FAQ_ITEMS.map((f) => f.id));
              }}
              className="h-10 px-4 rounded-full text-sm font-semibold border border-black/10 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] active:scale-[0.97] transition"
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion
            items={items}
            openIds={open}
            onOpenChange={setOpen}
            className="border-t border-black/10 dark:border-white/10"
            itemClassName="border-b border-black/10 dark:border-white/10"
          />
        </Reveal>
      </div>
    </section>
  );
}
